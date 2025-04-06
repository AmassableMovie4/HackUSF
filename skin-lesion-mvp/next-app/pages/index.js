// pages/index.js
import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';

export default function Home() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    
    if (!selectedFile) return;
    
    // Validate file type
    if (!selectedFile.type.startsWith('image/')) {
      setError('Please upload an image file');
      return;
    }
    
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
    setError(null);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file) {
      setError('Please select an image first');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await fetch('/api/classify', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Failed to classify image');
      }
      
      const data = await response.json();
      setResults(data);
      
      // Scroll to results
      setTimeout(() => {
        document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      
    } catch (err) {
      console.error('Error:', err);
      setError(err.message || 'An error occurred during classification');
    } finally {
      setLoading(false);
    }
  };

  // Reset the form
  const handleReset = () => {
    setFile(null);
    setPreview(null);
    setResults(null);
    setError(null);
  };

  // Risk level badge color
  const getRiskColor = (risk) => {
    switch (risk) {
      case 'Very High':
        return 'bg-red-600';
      case 'High':
        return 'bg-orange-500';
      case 'Medium':
        return 'bg-yellow-500';
      case 'Low':
        return 'bg-green-500';
      default:
        return 'bg-blue-500';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Skin Lesion Classifier</title>
        <meta name="description" content="AI-powered skin lesion classification" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Skin Lesion Classifier
          </h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Upload Section */}
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Upload Skin Lesion Image</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex justify-center">
              <label className="w-full max-w-md flex flex-col items-center px-4 py-6 bg-gray-50 text-gray-500 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer hover:bg-gray-100">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                </svg>
                <span className="mt-2 text-sm">Select an image file</span>
                <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
              </label>
            </div>
            
            {preview && (
              <div className="flex justify-center mt-4">
                <div className="relative w-64 h-64 border rounded-lg overflow-hidden">
                  <Image 
                    src={preview} 
                    alt="Image preview" 
                    layout="fill" 
                    objectFit="contain" 
                  />
                </div>
              </div>
            )}
            
            {error && (
              <div className="text-red-500 text-center">{error}</div>
            )}
            
            <div className="flex justify-center space-x-4">
              {file && (
                <button 
                  type="button" 
                  onClick={handleReset}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded"
                >
                  Reset
                </button>
              )}
              
              <button 
                type="submit" 
                disabled={!file || loading}
                className={`py-2 px-4 rounded text-white ${
                  !file || loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {loading ? 'Analyzing...' : 'Analyze Image'}
              </button>
            </div>
          </form>
        </div>
        
        {/* Results Section */}
        {results && (
          <div id="results" className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Classification Results</h2>
            
            <div className="mb-6 flex justify-center">
              <span className={`px-3 py-1 rounded-full text-white text-sm ${getRiskColor(results.prediction.risk)}`}>
                {results.prediction.risk} Risk
              </span>
            </div>
            
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">
                {results.prediction.display_name}
              </h3>
              <div className="mt-2 text-gray-500">
                Confidence: {(results.prediction.confidence * 100).toFixed(1)}%
              </div>
            </div>
            
            <div className="border-t border-b py-4 my-6">
              <h4 className="font-semibold mb-2">Description</h4>
              <p className="text-gray-700">{results.prediction.description}</p>
              
              <h4 className="font-semibold mt-4 mb-2">Recommendation</h4>
              <p className="text-gray-700">{results.prediction.recommendation}</p>
            </div>
            
            <div className="text-sm text-gray-500 mt-6 text-center">
              <p>This is not a medical diagnosis. Please consult a healthcare professional.</p>
            </div>
          </div>
        )}
        
        {/* About Section */}
        <div className="mt-12 bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">About This Tool</h2>
          <p className="text-gray-700 mb-4">
            This skin lesion classifier uses an ensemble of three deep learning models (MobileNetV3, DenseNet121, and ResNet50) 
            to analyze skin lesion images and classify them into seven categories.
          </p>
          <p className="text-gray-700 mb-4">
            The tool can detect these types of skin lesions:
          </p>
          <ul className="list-disc pl-5 text-gray-700">
            <li>Actinic Keratosis / Intraepithelial Carcinoma</li>
            <li>Basal Cell Carcinoma</li>
            <li>Benign Keratosis</li>
            <li>Dermatofibroma</li>
            <li>Melanoma</li>
            <li>Melanocytic Nevus (Mole)</li>
            <li>Vascular Lesion</li>
          </ul>
          <p className="text-gray-700 mt-4">
            Always consult with a qualified healthcare provider for proper diagnosis and treatment.
          </p>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto py-6 px-4 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Skin Lesion Classifier | For educational purposes only
        </div>
      </footer>
    </div>
  );
}