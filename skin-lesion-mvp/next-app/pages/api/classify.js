// pages/api/classify.js
import nextConnect from 'next-connect';
import multer from 'multer';

// Setup in-memory storage for multer
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

// Configure middleware
const apiRoute = nextConnect({
  onError(error, req, res) {
    console.error('API error:', error);
    res.status(500).json({ error: 'Server error', message: error.message });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: 'Method not allowed' });
  },
});

// Add multer middleware to handle file uploads
apiRoute.use(upload.single('file'));

// Handle POST request for image classification
apiRoute.post(async (req, res) => {
  try {
    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Validate file MIME type
    if (!req.file.mimetype.startsWith('image/')) {
      return res.status(400).json({ error: 'Uploaded file must be an image' });
    }

    // Get ML service URL from environment variables
    const mlServiceUrl = process.env.ML_SERVICE_URL || 'http://localhost:8000';

    // Create form data for the ML service request
    const formData = new FormData();
    
    // Convert buffer to blob with the correct MIME type
    const imageBlob = new Blob([req.file.buffer], { type: req.file.mimetype });
    formData.append('file', imageBlob, req.file.originalname);

    // Send request to ML service
    const mlResponse = await fetch(`${mlServiceUrl}/predict`, {
      method: 'POST',
      body: formData,
    });

    // Check for errors from ML service
    if (!mlResponse.ok) {
      const errorData = await mlResponse.text();
      console.error('ML service error:', errorData);
      return res.status(mlResponse.status).json({ 
        error: 'ML service error', 
        message: `Service returned ${mlResponse.status}`
      });
    }

    // Get prediction results
    const prediction = await mlResponse.json();

    // Return prediction to client
    return res.status(200).json(prediction);
  } catch (error) {
    console.error('Error in classification endpoint:', error);
    return res.status(500).json({ 
      error: 'Error processing image',
      message: error.message
    });
  }
});

// Disable body parser since we're using multer
export const config = {
  api: {
    bodyParser: false,
  },
};

export default apiRoute;