import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function EducationPage() {
  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-4">
        <Link href="/">
          <Button variant="ghost" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Button>
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-2">Educational Resources</h1>
      <p className="text-muted-foreground mb-8">Learn about skin cancer warning signs and prevention</p>

      <Tabs defaultValue="abcde" className="mb-8">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="abcde">ABCDE Rule</TabsTrigger>
          <TabsTrigger value="types">Types of Skin Cancer</TabsTrigger>
          <TabsTrigger value="prevention">Prevention</TabsTrigger>
        </TabsList>

        <TabsContent value="abcde" className="pt-6">
          <Card>
            <CardHeader>
              <CardTitle>The ABCDE Rule of Melanoma</CardTitle>
              <CardDescription>
                The ABCDE rule is a simple guide to help you identify potential warning signs of melanoma, the most
                serious form of skin cancer.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 border rounded-md">
                    <h3 className="text-lg font-medium mb-2 flex items-center">
                      <span className="bg-red-100 text-red-800 font-bold w-8 h-8 rounded-full flex items-center justify-center mr-2">
                        A
                      </span>
                      Asymmetry
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      One half of the mole does not match the other half. Normal moles are typically symmetrical.
                    </p>
                  </div>

                  <div className="p-4 border rounded-md">
                    <h3 className="text-lg font-medium mb-2 flex items-center">
                      <span className="bg-red-100 text-red-800 font-bold w-8 h-8 rounded-full flex items-center justify-center mr-2">
                        B
                      </span>
                      Border
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      The edges are irregular, ragged, notched, or blurred. Normal moles usually have smooth, even
                      borders.
                    </p>
                  </div>

                  <div className="p-4 border rounded-md">
                    <h3 className="text-lg font-medium mb-2 flex items-center">
                      <span className="bg-red-100 text-red-800 font-bold w-8 h-8 rounded-full flex items-center justify-center mr-2">
                        C
                      </span>
                      Color
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      The color is not uniform and may include different shades of brown, black, or tan. You might also
                      see areas of red, white, or blue.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 border rounded-md">
                    <h3 className="text-lg font-medium mb-2 flex items-center">
                      <span className="bg-red-100 text-red-800 font-bold w-8 h-8 rounded-full flex items-center justify-center mr-2">
                        D
                      </span>
                      Diameter
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      The mole is larger than 6 millimeters across (about the size of a pencil eraser), although
                      melanomas can sometimes be smaller.
                    </p>
                  </div>

                  <div className="p-4 border rounded-md">
                    <h3 className="text-lg font-medium mb-2 flex items-center">
                      <span className="bg-red-100 text-red-800 font-bold w-8 h-8 rounded-full flex items-center justify-center mr-2">
                        E
                      </span>
                      Evolution
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      The mole is changing over time. This includes changes in size, shape, color, elevation, or any new
                      symptom such as bleeding, itching or crusting.
                    </p>
                  </div>

                  <div className="p-4 bg-muted rounded-md">
                    <h3 className="font-medium mb-2">When to See a Doctor</h3>
                    <p className="text-sm">
                      If you notice any of these warning signs, or if you have a mole that is changing, itching, or
                      bleeding, you should see a dermatologist promptly.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="types" className="pt-6">
          <Card>
            <CardHeader>
              <CardTitle>Types of Skin Cancer</CardTitle>
              <CardDescription>
                Understanding the different types of skin cancer and their characteristics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="p-4 border rounded-md">
                  <h3 className="text-lg font-medium mb-2">Basal Cell Carcinoma (BCC)</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    The most common type of skin cancer. It rarely spreads to other parts of the body but can be locally
                    destructive if not treated.
                  </p>
                  <div className="text-sm">
                    <p className="font-medium">Common signs:</p>
                    <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                      <li>Pearly or waxy bump</li>
                      <li>Flat, flesh-colored or brown scar-like lesion</li>
                      <li>Bleeding or scabbing sore that heals and returns</li>
                    </ul>
                  </div>
                </div>

                <div className="p-4 border rounded-md">
                  <h3 className="text-lg font-medium mb-2">Squamous Cell Carcinoma (SCC)</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    The second most common type of skin cancer. It can grow deep into the skin and spread to other parts
                    of the body if not treated.
                  </p>
                  <div className="text-sm">
                    <p className="font-medium">Common signs:</p>
                    <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                      <li>Firm, red nodule</li>
                      <li>Flat lesion with a scaly, crusted surface</li>
                      <li>Sore that doesn't heal or heals and returns</li>
                    </ul>
                  </div>
                </div>

                <div className="p-4 border rounded-md">
                  <h3 className="text-lg font-medium mb-2">Melanoma</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    The most serious form of skin cancer. It can develop in existing moles or appear as new dark spots
                    on the skin.
                  </p>
                  <div className="text-sm">
                    <p className="font-medium">Common signs:</p>
                    <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                      <li>A large brownish spot with darker speckles</li>
                      <li>A mole that changes in color, size, or feel or that bleeds</li>
                      <li>
                        A small lesion with an irregular border and portions that appear red, pink, white, blue or
                        blue-black
                      </li>
                      <li>Dark lesions on your palms, soles, fingertips or toes, or on mucous membranes</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="prevention" className="pt-6">
          <Card>
            <CardHeader>
              <CardTitle>Prevention Strategies</CardTitle>
              <CardDescription>Practical steps to reduce your risk of skin cancer</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 border rounded-md">
                    <h3 className="text-lg font-medium mb-2">Sun Protection</h3>
                    <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                      <li>Use sunscreen with SPF 30 or higher daily, even on cloudy days</li>
                      <li>Apply sunscreen 15-30 minutes before going outside</li>
                      <li>Reapply sunscreen every 2 hours, or after swimming or sweating</li>
                      <li>Wear protective clothing, including wide-brimmed hats and UV-blocking sunglasses</li>
                    </ul>
                  </div>

                  <div className="p-4 border rounded-md">
                    <h3 className="text-lg font-medium mb-2">Avoid Peak Sun Hours</h3>
                    <p className="text-sm text-muted-foreground">
                      Try to stay out of the sun between 10 a.m. and 4 p.m., when the sun's rays are strongest. Plan
                      outdoor activities for early morning or late afternoon.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 border rounded-md">
                    <h3 className="text-lg font-medium mb-2">Regular Skin Checks</h3>
                    <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                      <li>Examine your skin head-to-toe once a month</li>
                      <li>Use mirrors to view all areas of your body</li>
                      <li>Look for any new or changing spots</li>
                      <li>See a dermatologist annually for a professional skin exam</li>
                    </ul>
                  </div>

                  <div className="p-4 border rounded-md">
                    <h3 className="text-lg font-medium mb-2">Avoid Tanning Beds</h3>
                    <p className="text-sm text-muted-foreground">
                      Tanning beds emit UV rays that can increase your risk of skin cancer. If you want a tanned look,
                      consider using a self-tanning product instead.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-muted rounded-md">
                <h3 className="font-medium mb-2">High-Risk Groups</h3>
                <p className="text-sm mb-2">
                  Some people have a higher risk of developing skin cancer. You may be at increased risk if you:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                  <li>Have fair skin, light hair, or light eyes</li>
                  <li>Have a history of sunburns, especially in childhood</li>
                  <li>Have a family or personal history of skin cancer</li>
                  <li>Have many moles or abnormal moles</li>
                  <li>Live or vacation at high altitudes or near the equator</li>
                  <li>Work outdoors</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Find a Dermatologist</CardTitle>
          <CardDescription>Resources to help you find a qualified dermatologist in your area</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm">
              Regular skin checks by a dermatologist are an important part of early detection. Here are some resources
              to help you find a qualified dermatologist:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a
                href="https://www.aad.org/public/tools/find-a-dermatologist"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 border rounded-md hover:bg-muted/50 transition-colors"
              >
                <h3 className="font-medium mb-1">American Academy of Dermatology</h3>
                <p className="text-sm text-muted-foreground">
                  Find board-certified dermatologists in your area using the AAD's search tool.
                </p>
              </a>

              <a
                href="https://www.skincancer.org/early-detection/physician-finder/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 border rounded-md hover:bg-muted/50 transition-colors"
              >
                <h3 className="font-medium mb-1">Skin Cancer Foundation</h3>
                <p className="text-sm text-muted-foreground">
                  Search for specialists who focus on skin cancer detection and treatment.
                </p>
              </a>
            </div>

            <div className="p-4 bg-muted rounded-md">
              <h3 className="font-medium mb-2">What to Expect at Your Appointment</h3>
              <p className="text-sm text-muted-foreground">
                During a skin cancer screening, the dermatologist will examine your skin from head to toe, looking for
                any suspicious spots. They may use a special magnifying device called a dermatoscope to look more
                closely at certain areas. The exam usually takes 10-15 minutes.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}

