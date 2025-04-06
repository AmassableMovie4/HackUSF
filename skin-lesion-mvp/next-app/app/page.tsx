import Link from "next/link"
import { Camera, Upload, History, Info } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-center mb-2">Skin Health Tracker</h1>
      <p className="text-center text-muted-foreground mb-8">
        Monitor changes in your skin and learn about skin cancer warning signs
      </p>

      <Alert className="mb-8 border-amber-500 bg-amber-50">
        <AlertTitle className="text-amber-800">Important Medical Disclaimer</AlertTitle>
        <AlertDescription className="text-amber-700">
          This app is designed for educational purposes and to help track skin changes over time. It is not a diagnostic
          tool and cannot replace professional medical advice. Always consult a dermatologist or healthcare provider for
          proper diagnosis.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="h-5 w-5" />
              Take a Photo
            </CardTitle>
            <CardDescription>Use your camera to capture an image of a skin lesion</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <div className="w-full h-48 bg-muted rounded-md flex items-center justify-center">
              <Camera className="h-12 w-12 text-muted-foreground" />
            </div>
          </CardContent>
          <CardFooter>
            <Link href="/capture" className="w-full">
              <Button className="w-full">Open Camera</Button>
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Upload an Image
            </CardTitle>
            <CardDescription>Upload an existing photo from your device</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <div className="w-full h-48 bg-muted rounded-md flex items-center justify-center">
              <Upload className="h-12 w-12 text-muted-foreground" />
            </div>
          </CardContent>
          <CardFooter>
            <Link href="/upload" className="w-full">
              <Button className="w-full" variant="outline">
                Upload Image
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <History className="h-5 w-5" />
              View History
            </CardTitle>
            <CardDescription>Track changes in your skin over time</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Monitoring changes in size, shape, color, and other features is important for early detection.
            </p>
          </CardContent>
          <CardFooter>
            <Link href="/history" className="w-full">
              <Button className="w-full" variant="outline">
                View History
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="h-5 w-5" />
              Educational Resources
            </CardTitle>
            <CardDescription>Learn about skin cancer warning signs</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Understanding the ABCDE rule and other warning signs can help with early detection.
            </p>
          </CardContent>
          <CardFooter>
            <Link href="/education" className="w-full">
              <Button className="w-full" variant="outline">
                Learn More
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </main>
  )
}

