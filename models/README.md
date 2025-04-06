# Skin Lesion Classification: Ensemble Deep Learning Approach

## Project Overview
This repository contains an ensemble deep learning approach for automated classification of dermatological skin lesions across 7 categories. The project implements and compares three state-of-the-art CNN architectures (MobileNetV3, DenseNet121, and ResNet50) and combines them using a majority voting ensemble method to achieve high accuracy in skin lesion classification.

## Hardware Used
- **TPU**: v2-8 TPU
- **Memory**: Up to a maximum of 120GB of system RAM

## Dataset Information

### Classes
The dataset contains 7 different skin lesion categories:
- **akiec**: Actinic Keratoses and Intraepithelial Carcinoma
- **bcc**: Basal Cell Carcinoma
- **bkl**: Benign Keratosis-like Lesions
- **df**: Dermatofibroma
- **mel**: Melanoma
- **nv**: Melanocytic Nevi
- **vasc**: Vascular Lesions

### Class Distribution (Before Augmentation)
- nv: 6705
- mel: 1113
- bkl: 1099
- bcc: 514
- akiec: 327
- vasc: 142
- df: 115

### Dataset Preparation
- **Original images processed**: 10,015
- **Class balancing**: Used data augmentation to balance all classes to 6,705 samples each
- **Final dataset size**: 46,935 images
- **Train/Validation/Test split**: 32,853 / 7,041 / 7,041 (70% / 15% / 15%)

## Model Architectures
Three CNN architectures were trained and evaluated:

1. **MobileNetV3**
   - Lightweight model optimized for mobile devices
   - Input shape: [128, 3, 224, 224]

2. **DenseNet121**
   - Dense Convolutional Network with 121 layers
   - Input shape: [128, 3, 224, 224]

3. **ResNet50**
   - Residual Network with 50 layers
   - Input shape: [128, 3, 224, 224]

4. **Ensemble Model**
   - Combines predictions from all three models using majority voting

## Training Results

### Training Parameters
- **Batch size**: 128
- **Epochs**: 5
- **Device**: CPU

### MobileNetV3
- **Training time**: 783.75 seconds (13.06 minutes)
- **Final accuracy**: 
  - Train: 84.29%
  - Validation: 85.12%
  - Test: 84.79%
- **Time per epoch**: ~155 seconds

### DenseNet121
- **Training time**: 2396.77 seconds (39.95 minutes)
- **Final accuracy**: 
  - Train: 98.45%
  - Validation: 95.51%
  - Test: 94.62%
- **Time per epoch**: ~475 seconds

### ResNet50
- **Training time**: 2168.93 seconds (36.15 minutes)
- **Final accuracy**: 
  - Train: 98.13%
  - Validation: 95.33%
  - Test: 95.20%
- **Time per epoch**: ~430 seconds

### Ensemble Model (Majority Voting)
- **Test accuracy**: 95.46%
- **Evaluation time**: 183.57 seconds

## Performance Metrics

### Ensemble Model Performance
| Class | Precision | Recall | F1-Score | Support |
|-------|-----------|--------|----------|---------|
| akiec | 0.955     | 0.976  | 0.966    | 1006    |
| bcc   | 0.959     | 0.981  | 0.970    | 1005    |
| bkl   | 0.925     | 0.898  | 0.911    | 1006    |
| df    | 0.994     | 1.000  | 0.997    | 1006    |
| mel   | 0.952     | 0.870  | 0.909    | 1006    |
| nv    | 0.903     | 0.957  | 0.930    | 1006    |
| vasc  | 0.994     | 1.000  | 0.997    | 1006    |
| **Macro avg** | **0.955** | **0.955** | **0.954** | **7041** |
| **Weighted avg** | **0.955** | **0.955** | **0.954** | **7041** |

### Individual Model Performance Comparison

#### MobileNetV3
| Class | Precision | Recall | F1-Score |
|-------|-----------|--------|----------|
| akiec | 0.854     | 0.811  | 0.832    |
| bcc   | 0.799     | 0.871  | 0.833    |
| bkl   | 0.752     | 0.722  | 0.736    |
| df    | 0.944     | 0.970  | 0.957    |
| mel   | 0.825     | 0.626  | 0.712    |
| nv    | 0.801     | 0.940  | 0.865    |
| vasc  | 0.957     | 0.995  | 0.976    |
| **Test Accuracy** | | | **84.79%** |

#### DenseNet121
| Class | Precision | Recall | F1-Score |
|-------|-----------|--------|----------|
| akiec | 0.945     | 0.964  | 0.955    |
| bcc   | 0.956     | 0.980  | 0.968    |
| bkl   | 0.908     | 0.888  | 0.897    |
| df    | 0.987     | 1.000  | 0.994    |
| mel   | 0.913     | 0.886  | 0.899    |
| nv    | 0.911     | 0.908  | 0.909    |
| vasc  | 1.000     | 0.998  | 0.999    |
| **Test Accuracy** | | | **94.62%** |

#### ResNet50
| Class | Precision | Recall | F1-Score |
|-------|-----------|--------|----------|
| akiec | 0.978     | 0.957  | 0.967    |
| bcc   | 0.982     | 0.968  | 0.975    |
| bkl   | 0.894     | 0.928  | 0.911    |
| df    | 0.996     | 0.999  | 0.998    |
| mel   | 0.905     | 0.885  | 0.895    |
| nv    | 0.915     | 0.926  | 0.920    |
| vasc  | 0.997     | 1.000  | 0.999    |
| **Test Accuracy** | | | **95.20%** |

## Key Findings
1. The ensemble model (95.46%) outperforms individual models in overall accuracy
2. ResNet50 (95.20%) and DenseNet121 (94.62%) perform significantly better than MobileNetV3 (84.79%)
3. All models struggle the most with the "mel" (melanoma) and "bkl" (benign keratosis) classes
4. The "df" (dermatofibroma) and "vasc" (vascular lesions) classes are the easiest to identify with near-perfect classification
5. Despite being 3x faster to train, MobileNetV3 has notably lower accuracy than the other models

## Implementation Pipeline
1. **Data preparation**: Processing original images and balancing classes through augmentation
2. **Data preprocessing**: Applying appropriate transforms for each model architecture
3. **Dataset splitting**: Creating train, validation, and test sets
4. **Model training**: Training three CNN architectures independently
5. **Ensemble creation**: Combining model predictions using majority voting
6. **Evaluation**: Assessing performance using accuracy, precision, recall, and F1-score

## Future Work
- Implement more sophisticated ensemble techniques beyond majority voting
- Explore additional pre-trained architectures and custom models
- Test different augmentation strategies for improved generalization
- Develop explainability methods for visualizing model decisions
- Optimize models for deployment on resource-constrained environments

## Conclusion
The ensemble approach demonstrates superior performance in skin lesion classification compared to individual models. DenseNet121 and ResNet50 provide excellent standalone performance, while the lightweight MobileNetV3, despite lower accuracy, could be valuable for deployment in resource-constrained environments where processing speed is critical.