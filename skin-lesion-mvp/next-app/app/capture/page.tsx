"use client"

import { useRef, useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Camera } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useMobile } from "@/hooks/use-mobile"

export default function CapturePage() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [cameraActive, setCameraActive] = useState(false)
  const isMobile = useMobile()

  useEffect(() => {
    let stream: MediaStream | null = null

    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: isMobile ? "environment" : "user",
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
        })

        if (videoRef.current) {
          videoRef.current.srcObject = stream
          setCameraActive(true)
        }
      } catch (err) {
        console.error("Error accessing camera:", err)
      }
    }

    startCamera()

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [isMobile])

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current
      const canvas = canvasRef.current
      const context = canvas.getContext("2d")

      if (context) {
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        context.drawImage(video, 0, 0, canvas.width, canvas.height)

        const imageData = canvas.toDataURL("image/png")
        setCapturedImage(imageData)

        // Stop the camera after capturing
        const stream = video.srcObject as MediaStream
        if (stream) {
          stream.getTracks().forEach((track) => track.stop())
          setCameraActive(false)
        }
      }
    }
  }

  const retakePhoto = async () => {
    setCapturedImage(null)

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: isMobile ? "environment" : "user",
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      })

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setCameraActive(true)
      }
    } catch (err) {
      console.error("Error restarting camera:", err)
    }
  }

  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-4">
        <Link href="/">
          <Button variant="ghost" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Button>
        </Link>
      </div>

      <h1 className="text-2xl font-bold mb-6">Capture Image</h1>

      <Card className="mb-6">
        <CardContent className="p-6">
          {capturedImage ? (
            <div className="flex flex-col items-center">
              <img
                src={capturedImage || "/placeholder.svg"}
                alt="Captured skin image"
                className="max-w-full rounded-md mb-4"
              />
              <div className="flex gap-4">
                <Button onClick={retakePhoto} variant="outline">
                  Retake Photo
                </Button>
                <Link href={`/analyze?image=${encodeURIComponent(capturedImage)}`}>
                  <Button>Analyze Image</Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <div className="relative w-full max-w-md mb-4 bg-black rounded-md overflow-hidden">
                <video ref={videoRef} autoPlay playsInline className="w-full h-auto" />
              </div>
              <Button onClick={captureImage} disabled={!cameraActive} className="flex items-center gap-2">
                <Camera className="h-4 w-4" /> Capture Image
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <canvas ref={canvasRef} className="hidden" />

      <div className="text-sm text-muted-foreground p-4 bg-muted rounded-md">
        <p className="mb-2 font-medium">Tips for taking good photos:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Ensure good lighting - natural daylight is best</li>
          <li>Keep the camera steady to avoid blurry images</li>
          <li>Include a ruler or coin for size reference if possible</li>
          <li>Take multiple angles of the same lesion</li>
        </ul>
      </div>
    </main>
  )
}

