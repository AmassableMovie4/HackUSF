"use client"

import type React from "react"

import { useState, useRef } from "react"
import Link from "next/link"
import { ArrowLeft, Upload } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function UploadPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
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

      <h1 className="text-2xl font-bold mb-6">Upload Image</h1>

      <Card className="mb-6">
        <CardContent className="p-6">
          {selectedImage ? (
            <div className="flex flex-col items-center">
              <img
                src={selectedImage || "/placeholder.svg"}
                alt="Selected skin image"
                className="max-w-full rounded-md mb-4"
              />
              <div className="flex gap-4">
                <Button onClick={triggerFileInput} variant="outline">
                  Choose Different Image
                </Button>
                <Link href={`/analyze?image=${encodeURIComponent(selectedImage)}`}>
                  <Button>Analyze Image</Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <div
                className="w-full max-w-md h-64 border-2 border-dashed rounded-md flex flex-col items-center justify-center mb-4 cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={triggerFileInput}
              >
                <Upload className="h-12 w-12 text-muted-foreground mb-2" />
                <p className="text-muted-foreground">Click or drag and drop to upload an image</p>
              </div>
              <Button onClick={triggerFileInput} className="flex items-center gap-2">
                <Upload className="h-4 w-4" /> Select Image
              </Button>
            </div>
          )}
          <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
        </CardContent>
      </Card>

      <div className="text-sm text-muted-foreground p-4 bg-muted rounded-md">
        <p className="mb-2 font-medium">Tips for selecting good photos:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Choose clear, well-lit images</li>
          <li>Make sure the skin lesion is in focus</li>
          <li>Select recent photos for the most accurate tracking</li>
          <li>Include images that show the lesion from different angles if possible</li>
        </ul>
      </div>
    </main>
  )
}

