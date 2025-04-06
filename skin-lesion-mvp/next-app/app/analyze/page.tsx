"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Save, AlertTriangle, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"

export default function AnalyzePage() {
  const searchParams = useSearchParams()
  const imageParam = searchParams.get("image")
  const [image, setImage] = useState<string | null>(null)

  // In a real app, this would come from an actual analysis
  // Here we're just simulating results for demonstration purposes
  const [analysisComplete, setAnalysisComplete] = useState(false)
  const [analysisProgress, setAnalysisProgress] = useState(0)

  useEffect(() => {
    if (imageParam) {
      setImage(imageParam)

      // Simulate analysis progress
      const interval = setInterval(() => {
        setAnalysisProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            setAnalysisComplete(true)
            return 100
          }
          return prev + 10
        })
      }, 300)

      return () => clearInterval(interval)
    }
  }, [imageParam])

  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-4">
        <Link href="/">
          <Button variant="ghost" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Button>
        </Link>
      </div>

      <h1 className="text-2xl font-bold mb-6">Image Analysis</h1>

      <Alert className="mb-8 border-amber-500 bg-amber-50">
        <AlertTriangle className="h-4 w-4 text-amber-800" />
        <AlertTitle className="text-amber-800">Important Medical Disclaimer</AlertTitle>
        <AlertDescription className="text-amber-700">
          This analysis is for educational purposes only and is not a medical diagnosis. Always consult a dermatologist
          for proper evaluation of skin concerns.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Image</CardTitle>
            <CardDescription>Your uploaded skin image</CardDescription>
          </CardHeader>
          <CardContent>
            {image ? (
              <img src={image || "/placeholder.svg"} alt="Skin lesion" className="w-full rounded-md" />
            ) : (
              <div className="w-full h-64 bg-muted rounded-md flex items-center justify-center">
                <p className="text-muted-foreground">No image available</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Analysis Results</CardTitle>
            <CardDescription>
              {analysisComplete ? "Review the analysis of your image" : "Processing your image..."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!analysisComplete ? (
              <div className="space-y-4">
                <Progress value={analysisProgress} className="w-full" />
                <p className="text-sm text-center text-muted-foreground">
                  Analyzing image features... {analysisProgress}%
                </p>
              </div>
            ) : (
              <Tabs defaultValue="abcde">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="abcde">ABCDE Analysis</TabsTrigger>
                  <TabsTrigger value="features">Features</TabsTrigger>
                </TabsList>
                <TabsContent value="abcde" className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">Asymmetry</p>
                      <div className="flex items-center gap-1">
                        <span className="text-sm text-amber-600">Moderate</span>
                        <AlertTriangle className="h-4 w-4 text-amber-600" />
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      The lesion shows some asymmetry when divided through the center.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">Border</p>
                      <div className="flex items-center gap-1">
                        <span className="text-sm text-green-600">Regular</span>
                        <Check className="h-4 w-4 text-green-600" />
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">The borders appear mostly regular and well-defined.</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">Color</p>
                      <div className="flex items-center gap-1">
                        <span className="text-sm text-green-600">Uniform</span>
                        <Check className="h-4 w-4 text-green-600" />
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      The color appears relatively uniform throughout the lesion.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">Diameter</p>
                      <div className="flex items-center gap-1">
                        <span className="text-sm text-green-600">Small</span>
                        <Check className="h-4 w-4 text-green-600" />
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">The estimated diameter appears to be less than 6mm.</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">Evolution</p>
                      <div className="flex items-center gap-1">
                        <span className="text-sm text-muted-foreground">Unknown</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      No previous images available to assess changes over time.
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="features" className="pt-4">
                  <div className="space-y-4">
                    <p className="text-sm">
                      This analysis identifies visual characteristics of the lesion. Remember that only a dermatologist
                      can provide a proper diagnosis.
                    </p>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Texture</p>
                        <p className="text-sm text-muted-foreground">Appears smooth</p>
                      </div>

                      <div className="space-y-2">
                        <p className="text-sm font-medium">Shape</p>
                        <p className="text-sm text-muted-foreground">Mostly round</p>
                      </div>

                      <div className="space-y-2">
                        <p className="text-sm font-medium">Elevation</p>
                        <p className="text-sm text-muted-foreground">Appears flat</p>
                      </div>

                      <div className="space-y-2">
                        <p className="text-sm font-medium">Surface</p>
                        <p className="text-sm text-muted-foreground">No visible scaling</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" disabled={!analysisComplete}>
              <Save className="h-4 w-4 mr-2" /> Save to History
            </Button>
            <Link href="/education">
              <Button variant="link">Learn about these features</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Next Steps</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p>Based on the analysis, here are some recommended next steps:</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-md">
                <h3 className="font-medium mb-2">Monitor for Changes</h3>
                <p className="text-sm text-muted-foreground">
                  Take regular photos (every 1-3 months) to track any changes in size, shape, color, or other features.
                </p>
              </div>

              <div className="p-4 border rounded-md">
                <h3 className="font-medium mb-2">Consult a Dermatologist</h3>
                <p className="text-sm text-muted-foreground">
                  Schedule a visit with a dermatologist for professional evaluation, especially if you notice any
                  changes.
                </p>
              </div>
            </div>

            <Alert>
              <AlertTitle>Remember</AlertTitle>
              <AlertDescription>
                Early detection is key in skin cancer. When in doubt, always consult a healthcare professional.
              </AlertDescription>
            </Alert>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}

