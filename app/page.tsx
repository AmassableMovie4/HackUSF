"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Camera, Upload, Check, AlertCircle } from "lucide-react"

export default function HealthAwareApp() {
  const [currentScreen, setCurrentScreen] = useState(0)
  const [formData, setFormData] = useState({
    name: "",
    weight: "",
    age: "",
    ethnicity: "",
    sex: "",
    city: "",
  })

  // Validation errors state
  const [errors, setErrors] = useState({
    name: "",
    weight: "",
    age: "",
    ethnicity: "",
    sex: "",
    city: "",
  })

  // Placeholders for form fields
  const placeholders = {
    name: "Alfredo",
    weight: "162 lb",
    age: "18",
    ethnicity: "Hispanic",
    sex: "Male or Female",
    city: "Toronto",
  }

  // Validation functions
  const validateName = (value) => {
    if (!/^[A-Za-z\s]+$/.test(value)) {
      return "Name should contain only letters and spaces"
    }
    return ""
  }

  const validateWeight = (value) => {
    if (!/^\d+(\.\d+)?\s*(lb|kg|pounds|kilograms)$/.test(value.toLowerCase())) {
      return "Weight should be a number followed by units (e.g., 162 lb or 73.5 kg)"
    }
    return ""
  }

  const validateAge = (value) => {
    if (!/^\d+$/.test(value)) {
      return "Age should be a whole number"
    }
    return ""
  }

  const validateEthnicity = (value) => {
    if (!/^[A-Za-z\s]+$/.test(value)) {
      return "Ethnicity should contain only letters and spaces"
    }
    return ""
  }

  const validateSex = (value) => {
    if (!/^[A-Za-z\s]+$/.test(value)) {
      return "Sex should contain only letters and spaces"
    }
    return ""
  }

  const validateCity = (value) => {
    if (!/^[A-Za-z\s]+$/.test(value)) {
      return "City should contain only letters and spaces"
    }
    return ""
  }

  // Handle input change with validation
  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    })

    // Validate the field
    let error = ""
    switch (field) {
      case "name":
        error = validateName(value)
        break
      case "weight":
        error = validateWeight(value)
        break
      case "age":
        error = validateAge(value)
        break
      case "ethnicity":
        error = validateEthnicity(value)
        break
      case "sex":
        error = validateSex(value)
        break
      case "city":
        error = validateCity(value)
        break
      default:
        break
    }

    setErrors({
      ...errors,
      [field]: error,
    })
  }

  // Check if all form fields are filled and valid
  const isFormComplete = () => {
    const allFilled = Object.values(formData).every((value) => value.trim() !== "")
    const allValid = Object.values(errors).every((error) => error === "")
    return allFilled && allValid
  }

  useEffect(() => {
    // Auto-transition from Welcome to Begin screen after 5 seconds
    if (currentScreen === 0) {
      const timer = setTimeout(() => {
        setCurrentScreen(1)
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [currentScreen])

  const totalScreens = 7

  const goToNextScreen = () => {
    if (currentScreen < totalScreens - 1) {
      setCurrentScreen(currentScreen + 1)
    }
  }

  const goToPrevScreen = () => {
    if (currentScreen > 0) {
      setCurrentScreen(currentScreen - 1)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#f6f1eb]">
      <div className="relative w-full max-w-md h-[640px] overflow-hidden bg-white rounded-3xl shadow-lg">
        {/* Status Bar */}
        {currentScreen === 1 && (
          <div className="absolute top-0 left-0 right-0 flex justify-between items-center p-3 text-xs">
            <span>9:41</span>
            <div className="flex items-center gap-1">
              <div className="w-4 h-4">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20Z"
                    fill="black"
                  />
                </svg>
              </div>
              <div className="w-4 h-4">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20Z"
                    fill="black"
                  />
                </svg>
              </div>
            </div>
          </div>
        )}

        {/* Screen Content */}
        <div className="relative h-full">
          {/* Screen 0: Welcome - Enhanced version with animations */}
          <div
            className={`absolute inset-0 flex flex-col items-center justify-between transition-opacity duration-500 overflow-hidden ${currentScreen === 0 ? "opacity-100" : "opacity-0 pointer-events-none"}`}
          >
            {/* Animated background */}
            <div className="absolute inset-0 overflow-hidden">
              {/* Gradient background */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#a8dadc]/50 to-white"></div>

              {/* Animated waves */}
              <div className="absolute top-0 left-0 right-0 h-40 animate-pulse">
                <svg viewBox="0 0 1440 320" className="w-full" preserveAspectRatio="none">
                  <path
                    fill="#76c7c5"
                    fillOpacity="0.3"
                    d="M0,192L48,176C96,160,192,128,288,122.7C384,117,480,139,576,165.3C672,192,768,224,864,213.3C960,203,1056,149,1152,138.7C1248,128,1344,160,1392,176L1440,192L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
                    className="animate-[wave_15s_ease-in-out_infinite]"
                  ></path>
                </svg>
              </div>

              {/* Animated particles */}
              <div className="absolute inset-0">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute rounded-full bg-[#45cece]/30"
                    style={{
                      width: `${Math.random() * 20 + 5}px`,
                      height: `${Math.random() * 20 + 5}px`,
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                      animation: `float ${Math.random() * 10 + 10}s linear infinite`,
                      animationDelay: `${Math.random() * 5}s`,
                    }}
                  ></div>
                ))}
              </div>
            </div>

            {/* Top logo with animation */}
            <div className="z-10 pt-8 w-full flex justify-center animate-[fadeInDown_1s_ease-out]">
              <div className="w-40">
                <img src="/logo.png" alt="Health Aware Logo" className="w-full h-auto animate-[pulse_3s_infinite]" />
              </div>
            </div>

            {/* Welcome circle with animations */}
            <div className="z-10 flex flex-col items-center justify-center flex-grow">
              <div className="relative w-64 h-64 rounded-full bg-[#76c7c5]/30 flex items-center justify-center animate-[scaleIn_1s_ease-out] overflow-hidden">
                {/* Animated rings */}
                <div className="absolute w-full h-full rounded-full border-4 border-[#45cece]/20 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
                <div className="absolute w-[90%] h-[90%] rounded-full border-4 border-[#45cece]/15 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite_0.5s]"></div>
                <div className="absolute w-[80%] h-[80%] rounded-full border-4 border-[#45cece]/10 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite_1s]"></div>

                {/* Welcome text with typing animation */}
                <h1 className="text-3xl font-bold text-[#24262b] animate-[typing_1s_steps(8)_forwards]">Welcome!</h1>
              </div>
            </div>

            {/* Bottom logo with animation */}
            <div className="z-10 flex flex-col items-center pb-8 animate-[fadeInUp_1s_ease-out]">
              <div className="w-40">
                <img src="/logo.png" alt="Health Aware Logo" className="w-full h-auto" />
              </div>
            </div>
          </div>

          {/* Screen 1: Begin */}
          <div
            className={`absolute inset-0 flex flex-col items-center justify-between p-8 transition-opacity duration-300 overflow-y-auto ${currentScreen === 1 ? "opacity-100" : "opacity-0 pointer-events-none"}`}
          >
            <div className="w-full pt-8 flex justify-center">
              <div className="w-40">
                <img src="/logo.png" alt="Health Aware Logo" className="w-full h-auto" />
              </div>
            </div>
            <div className="w-full">
              <button
                onClick={goToNextScreen}
                className="w-full py-6 bg-[#083344] text-white text-xl font-semibold rounded-lg"
              >
                Begin
              </button>
            </div>
            <div className="h-8"></div>
          </div>

          {/* Screen 2: Profile */}
          <div
            className={`absolute inset-0 flex flex-col items-start justify-between p-8 transition-opacity duration-300 overflow-y-auto ${currentScreen === 2 ? "opacity-100" : "opacity-0 pointer-events-none"}`}
          >
            <div className="w-full">
              <div className="flex justify-center mb-4">
                <div className="w-40">
                  <img src="/logo.png" alt="Health Aware Logo" className="w-full h-auto" />
                </div>
              </div>
              <h2 className="text-2xl font-bold mb-6">Let's get your profile</h2>

              <div className="space-y-4 w-full">
                {/* Name Field */}
                <div className="space-y-1">
                  <label className="text-sm font-medium">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder={placeholders.name}
                    className={`w-full p-2 bg-[#f6f1eb] rounded border-0 placeholder-gray-500 ${errors.name ? "border-2 border-red-500" : ""}`}
                  />
                  {errors.name && (
                    <div className="flex items-center gap-1 text-red-500 text-xs mt-1">
                      <AlertCircle size={12} />
                      <span>{errors.name}</span>
                    </div>
                  )}
                </div>

                {/* Weight Field */}
                <div className="space-y-1">
                  <label className="text-sm font-medium">Weight</label>
                  <input
                    type="text"
                    value={formData.weight}
                    onChange={(e) => handleInputChange("weight", e.target.value)}
                    placeholder={placeholders.weight}
                    className={`w-full p-2 bg-[#f6f1eb] rounded border-0 placeholder-gray-500 ${errors.weight ? "border-2 border-red-500" : ""}`}
                  />
                  {errors.weight && (
                    <div className="flex items-center gap-1 text-red-500 text-xs mt-1">
                      <AlertCircle size={12} />
                      <span>{errors.weight}</span>
                    </div>
                  )}
                </div>

                {/* Age Field */}
                <div className="space-y-1">
                  <label className="text-sm font-medium">Age</label>
                  <input
                    type="text"
                    value={formData.age}
                    onChange={(e) => handleInputChange("age", e.target.value)}
                    placeholder={placeholders.age}
                    className={`w-full p-2 bg-[#f6f1eb] rounded border-0 placeholder-gray-500 ${errors.age ? "border-2 border-red-500" : ""}`}
                  />
                  {errors.age && (
                    <div className="flex items-center gap-1 text-red-500 text-xs mt-1">
                      <AlertCircle size={12} />
                      <span>{errors.age}</span>
                    </div>
                  )}
                </div>

                {/* Ethnicity Field */}
                <div className="space-y-1">
                  <label className="text-sm font-medium">Ethnicity</label>
                  <input
                    type="text"
                    value={formData.ethnicity}
                    onChange={(e) => handleInputChange("ethnicity", e.target.value)}
                    placeholder={placeholders.ethnicity}
                    className={`w-full p-2 bg-[#f6f1eb] rounded border-0 placeholder-gray-500 ${errors.ethnicity ? "border-2 border-red-500" : ""}`}
                  />
                  {errors.ethnicity && (
                    <div className="flex items-center gap-1 text-red-500 text-xs mt-1">
                      <AlertCircle size={12} />
                      <span>{errors.ethnicity}</span>
                    </div>
                  )}
                </div>

                {/* Sex Field */}
                <div className="space-y-1">
                  <label className="text-sm font-medium">Sex</label>
                  <input
                    type="text"
                    value={formData.sex}
                    onChange={(e) => handleInputChange("sex", e.target.value)}
                    placeholder={placeholders.sex}
                    className={`w-full p-2 bg-[#f6f1eb] rounded border-0 placeholder-gray-500 ${errors.sex ? "border-2 border-red-500" : ""}`}
                  />
                  {errors.sex && (
                    <div className="flex items-center gap-1 text-red-500 text-xs mt-1">
                      <AlertCircle size={12} />
                      <span>{errors.sex}</span>
                    </div>
                  )}
                </div>

                {/* City Field */}
                <div className="space-y-1">
                  <label className="text-sm font-medium">City</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    placeholder={placeholders.city}
                    className={`w-full p-2 bg-[#f6f1eb] rounded border-0 placeholder-gray-500 ${errors.city ? "border-2 border-red-500" : ""}`}
                  />
                  {errors.city && (
                    <div className="flex items-center gap-1 text-red-500 text-xs mt-1">
                      <AlertCircle size={12} />
                      <span>{errors.city}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2">
                <ChevronRight size={16} />
                <span className="text-sm text-gray-500">Given values are just for reference</span>
              </div>
            </div>

            <NavigationControls
              currentScreen={currentScreen}
              totalScreens={totalScreens}
              goToPrevScreen={goToPrevScreen}
              goToNextScreen={goToNextScreen}
              isNextDisabled={!isFormComplete()}
            />
          </div>

          {/* Screen 3: Data Info */}
          <div
            className={`absolute inset-0 flex flex-col items-start justify-between p-8 transition-opacity duration-300 overflow-y-auto ${currentScreen === 3 ? "opacity-100" : "opacity-0 pointer-events-none"}`}
          >
            <div className="w-full">
              <div className="flex justify-center mb-4">
                <div className="w-40">
                  <img src="/logo.png" alt="Health Aware Logo" className="w-full h-auto" />
                </div>
              </div>

              <h2 className="text-3xl font-bold mb-1">We care about your data,</h2>
              <h2 className="text-3xl font-bold mb-6">{formData.name || "User"}!</h2>

              <div className="space-y-6 mt-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1 w-5 h-5 rounded-full bg-[#45cece] flex items-center justify-center">
                    <Check size={14} className="text-white" />
                  </div>
                  <p className="text-sm">
                    We'll use your info to better understand your health concerns and give an accurate suggestion on
                    seeing a doctor.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1 w-5 h-5 rounded-full bg-[#ff0000] flex items-center justify-center">
                    <span className="text-white text-xs">×</span>
                  </div>
                  <p className="text-sm">
                    HealthAware will not collect or store any personal data after the test, all your information stays
                    on your device.
                  </p>
                </div>
              </div>
            </div>

            <NavigationControls
              currentScreen={currentScreen}
              totalScreens={totalScreens}
              goToPrevScreen={goToPrevScreen}
              goToNextScreen={goToNextScreen}
            />
          </div>

          {/* Screen 4: Picture Instructions */}
          <div
            className={`absolute inset-0 flex flex-col items-start justify-between p-8 transition-opacity duration-300 overflow-y-auto ${currentScreen === 4 ? "opacity-100" : "opacity-0 pointer-events-none"}`}
          >
            <div className="w-full">
              <div className="flex justify-center mb-4">
                <div className="w-40">
                  <img src="/logo.png" alt="Health Aware Logo" className="w-full h-auto" />
                </div>
              </div>

              <h2 className="text-2xl font-bold mb-6 text-center">Time for a picture!</h2>

              <div className="space-y-4 mt-4">
                <div className="flex items-center gap-3">
                  <ChevronRight size={16} />
                  <p className="text-sm">It must be taken in a bright room.</p>
                </div>

                <div className="flex items-start gap-3">
                  <ChevronRight size={16} className="mt-1 flex-shrink-0" />
                  <p className="text-sm">The image must be clear, showing the area of concern.</p>
                </div>
              </div>

              <div className="mt-12 space-y-4">
                <button className="w-full flex items-center justify-center gap-3 p-4 bg-[#083344] text-white rounded-lg">
                  <Camera size={20} />
                  <span>Take a picture</span>
                </button>

                <button className="w-full flex items-center justify-center gap-3 p-4 bg-[#083344] text-white rounded-lg">
                  <Upload size={20} />
                  <span>Upload an image</span>
                </button>
              </div>
            </div>

            <NavigationControls
              currentScreen={currentScreen}
              totalScreens={totalScreens}
              goToPrevScreen={goToPrevScreen}
              goToNextScreen={goToNextScreen}
            />
          </div>

          {/* Screen 5: Loading */}
          <div
            className={`absolute inset-0 flex flex-col items-center justify-between p-8 transition-opacity duration-300 overflow-y-auto ${currentScreen === 5 ? "opacity-100" : "opacity-0 pointer-events-none"}`}
          >
            <div className="w-full">
              <div className="flex justify-center mb-4">
                <div className="w-40">
                  <img src="/logo.png" alt="Health Aware Logo" className="w-full h-auto" />
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center">
              <h2 className="text-2xl font-bold mb-2 text-center">We are loading and processing your information!</h2>
              <div className="w-12 h-12 border-4 border-[#45cece] border-t-transparent rounded-full animate-spin mt-8"></div>
            </div>

            <NavigationControls
              currentScreen={currentScreen}
              totalScreens={totalScreens}
              goToPrevScreen={goToPrevScreen}
              goToNextScreen={goToNextScreen}
            />
          </div>

          {/* Screen 6: Results */}
          <div
            className={`absolute inset-0 flex flex-col items-start justify-between p-8 transition-opacity duration-300 overflow-y-auto ${currentScreen === 6 ? "opacity-100" : "opacity-0 pointer-events-none"}`}
          >
            <div className="w-full">
              <div className="flex justify-center mb-4">
                <div className="w-40">
                  <img src="/logo.png" alt="Health Aware Logo" className="w-full h-auto" />
                </div>
              </div>

              <h2 className="text-2xl font-bold mb-6">Your results are ready, {formData.name || "User"}.</h2>

              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#45cece] flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold">i</span>
                  </div>
                  <p className="text-sm">
                    This test is not a professional medical diagnosis. It's just a recommendation, always consult a
                    doctor for medical advice.
                  </p>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-2">You...</h3>
                {/* Results content would go here */}
              </div>
            </div>

            <NavigationControls
              currentScreen={currentScreen}
              totalScreens={totalScreens}
              goToPrevScreen={goToPrevScreen}
              goToNextScreen={goToNextScreen}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function NavigationControls({ currentScreen, totalScreens, goToPrevScreen, goToNextScreen, isNextDisabled = false }) {
  return (
    <div className="w-full flex items-center justify-between bg-[#a8dadc] rounded-full px-4 py-2 sticky bottom-0 mt-4">
      <button onClick={goToPrevScreen} className="w-8 h-8 flex items-center justify-center rounded-full bg-white">
        <ChevronLeft size={20} />
      </button>

      <div className="flex gap-1">
        {Array.from({ length: totalScreens }).map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full ${currentScreen === index ? "bg-[#083344]" : "bg-white"}`}
          />
        ))}
      </div>

      <button
        onClick={goToNextScreen}
        disabled={isNextDisabled}
        className={`w-8 h-8 flex items-center justify-center rounded-full ${isNextDisabled ? "bg-gray-300 cursor-not-allowed" : "bg-white cursor-pointer"}`}
      >
        <ChevronRight size={20} className={isNextDisabled ? "text-gray-500" : ""} />
      </button>
    </div>
  )
}

