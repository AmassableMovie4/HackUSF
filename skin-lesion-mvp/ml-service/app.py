import os
import io
import torch
import torch.nn.functional as F
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import torchvision.transforms as transforms
from collections import Counter

# Initialize FastAPI app
app = FastAPI(title="Skin Lesion Classifier API")

# Add CORS middleware - update with your Next.js app URL in production
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace with your Next.js app URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define class names and info
CLASS_NAMES = {
    0: 'akiec',  # Actinic Keratoses and Intraepithelial Carcinoma
    1: 'bcc',    # Basal Cell Carcinoma
    2: 'bkl',    # Benign Keratosis-like Lesions
    3: 'df',     # Dermatofibroma
    4: 'mel',    # Melanoma
    5: 'nv',     # Melanocytic Nevi
    6: 'vasc'    # Vascular Lesions
}

CLASS_INFO = {
    'akiec': {
        'display': 'Actinic Keratosis / Intraepithelial Carcinoma',
        'risk': 'High',
        'description': 'A pre-cancerous growth or early form of skin cancer.',
        'recommendation': 'Consult a dermatologist promptly for evaluation.'
    },
    'bcc': {
        'display': 'Basal Cell Carcinoma',
        'risk': 'High',
        'description': 'The most common type of skin cancer, usually slow-growing.',
        'recommendation': 'Consult a dermatologist for proper treatment options.'
    },
    'bkl': {
        'display': 'Benign Keratosis',
        'risk': 'Low',
        'description': 'A non-cancerous skin growth that appears as a waxy, scaly patch.',
        'recommendation': 'Generally no treatment needed, but monitor for changes.'
    },
    'df': {
        'display': 'Dermatofibroma',
        'risk': 'Low',
        'description': 'A common benign skin growth or nodule that is usually harmless.',
        'recommendation': 'No treatment needed unless causing discomfort.'
    },
    'mel': {
        'display': 'Melanoma',
        'risk': 'Very High',
        'description': 'A serious form of skin cancer that can spread if not treated early.',
        'recommendation': 'Seek immediate medical attention.'
    },
    'nv': {
        'display': 'Melanocytic Nevus (Mole)',
        'risk': 'Low',
        'description': 'A benign growth of melanocytes, usually harmless but should be monitored.',
        'recommendation': 'Monitor for changes in size, shape, or color.'
    },
    'vasc': {
        'display': 'Vascular Lesion',
        'risk': 'Low',
        'description': 'Abnormalities of blood vessels that appear on the skin surface.',
        'recommendation': 'Typically harmless but consult a doctor if concerned.'
    }
}

# Global variables
models = {}
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print(f"Using device: {device}")

# Define image transformations
image_transforms = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
])

@app.on_event("startup")
async def startup_event():
    """Load all models when the API starts"""
    # Get models directory from environment or use default
    models_dir = os.environ.get("MODELS_DIR", "./models")
    
    # Model file paths
    model_files = {
        "mobilenetv3": os.path.join(models_dir, "mobilenetv3.pt"),
        "densenet121": os.path.join(models_dir, "densenet121.pt"),
        "resnet50": os.path.join(models_dir, "resnet50.pt")
    }
    
    # Load each model
    for model_name, model_path in model_files.items():
        if os.path.exists(model_path):
            print(f"Loading {model_name} model from {model_path}")
            
            try:
                # Load model to the appropriate device
                model = torch.load(model_path, map_location=device)
                model.eval()  # Set model to evaluation mode
                models[model_name] = model
                print(f"Successfully loaded {model_name}")
            except Exception as e:
                print(f"Error loading {model_name}: {e}")
        else:
            print(f"Warning: Model file {model_path} not found!")
    
    # Check if any models were loaded
    if not models:
        print("No models could be loaded! Service will not function correctly.")
    else:
        print(f"Loaded {len(models)} models successfully")

def preprocess_image(image_bytes):
    """Process image for model input"""
    try:
        # Open image from bytes
        image = Image.open(io.BytesIO(image_bytes)).convert('RGB')
        
        # Apply transformations and prepare tensor
        tensor = image_transforms(image).unsqueeze(0).to(device)
        return tensor
    except Exception as e:
        print(f"Error preprocessing image: {e}")
        raise HTTPException(status_code=400, detail=f"Could not process image: {str(e)}")

@app.get("/")
def health_check():
    """Health check endpoint"""
    return {
        "status": "ok",
        "models_loaded": list(models.keys()),
        "device": str(device)
    }

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    """Predict skin lesion from uploaded image"""
    # Check if models are loaded
    if not models:
        raise HTTPException(status_code=500, detail="No models are loaded")
    
    # Validate file
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image")
    
    # Read image file
    contents = await file.read()
    
    try:
        # Preprocess image
        image_tensor = preprocess_image(contents)
        
        # Get predictions from each model
        predictions = {}
        overall_probs = {i: 0.0 for i in range(7)}
        
        with torch.no_grad():  # No need to track gradients
            for model_name, model in models.items():
                # Get model output
                output = model(image_tensor)
                probs = F.softmax(output, dim=1)[0].cpu().numpy()
                
                # Get predicted class
                pred_class = int(probs.argmax())
                pred_confidence = float(probs[pred_class])
                
                # Store prediction
                predictions[model_name] = {
                    "class_id": pred_class,
                    "class_name": CLASS_NAMES[pred_class],
                    "confidence": pred_confidence
                }
                
                # Add to overall probabilities
                for i, prob in enumerate(probs):
                    overall_probs[i] += float(prob) / len(models)
        
        # Ensemble prediction using majority voting
        pred_classes = [pred["class_id"] for pred in predictions.values()]
        counter = Counter(pred_classes)
        ensemble_class = counter.most_common(1)[0][0]
        ensemble_class_name = CLASS_NAMES[ensemble_class]
        
        # Format result
        result = {
            "prediction": {
                "class_id": ensemble_class,
                "class_name": ensemble_class_name,
                "display_name": CLASS_INFO[ensemble_class_name]["display"],
                "risk": CLASS_INFO[ensemble_class_name]["risk"],
                "description": CLASS_INFO[ensemble_class_name]["description"],
                "recommendation": CLASS_INFO[ensemble_class_name]["recommendation"],
                "confidence": counter[ensemble_class] / len(models)  # Percentage of models that voted for this class
            },
            "model_predictions": predictions,
            "class_probabilities": {CLASS_NAMES[i]: prob for i, prob in overall_probs.items()}
        }
        
        return result
        
    except Exception as e:
        print(f"Error during prediction: {e}")
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)