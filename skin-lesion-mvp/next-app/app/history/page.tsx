"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Calendar, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function HistoryPage() {
  // In a real app, this would come from a database
  // Here we're just using mock data for demonstration
  const [entries] = useState([
    {
      id: 1,
      date: "2023-04-15",
      location: "Upper back",
      image: "/placeholder.svg?height=200&width=200",
      notes: "Small brown mole, no changes observed",
    },
    {
      id: 2,
      date: "2023-05-20",
      location: "Left forearm",
      image: "/placeholder.svg?height=200&width=200",
      notes: "Slightly raised, light brown spot",
    },
  ])

  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-4">
        <Link href="/">
          <Button variant="ghost" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Button>
        </Link>
      </div>

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">History & Tracking</h1>
        <Link href="/capture">
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" /> Add New Entry
          </Button>
        </Link>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Filter Options</CardTitle>
          <CardDescription>Filter your history by date, location, or other criteria</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Date Range</label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="Select date range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="last-month">Last Month</SelectItem>
                  <SelectItem value="last-3-months">Last 3 Months</SelectItem>
                  <SelectItem value="last-year">Last Year</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Body Location</label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="face">Face</SelectItem>
                  <SelectItem value="arms">Arms</SelectItem>
                  <SelectItem value="legs">Legs</SelectItem>
                  <SelectItem value="torso">Torso</SelectItem>
                  <SelectItem value="back">Back</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Sort By</label>
              <Select defaultValue="newest">
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="location">Location</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {entries.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {entries.map((entry) => (
            <Card key={entry.id}>
              <CardHeader>
                <CardTitle className="text-lg">{entry.location}</CardTitle>
                <CardDescription className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" /> {new Date(entry.date).toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-square max-w-[200px] mx-auto mb-4 rounded-md overflow-hidden">
                  <img
                    src={entry.image || "/placeholder.svg"}
                    alt={`Skin lesion on ${entry.location}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-sm">
                  <p className="font-medium mb-1">Notes:</p>
                  <p className="text-muted-foreground">{entry.notes}</p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">
                  View Details
                </Button>
                <Link href={`/analyze?image=${encodeURIComponent(entry.image)}`}>
                  <Button size="sm">Compare</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground mb-4">No history entries found.</p>
            <Link href="/capture">
              <Button>Add Your First Entry</Button>
            </Link>
          </CardContent>
        </Card>
      )}

      <div className="mt-8 p-4 bg-muted rounded-md">
        <h2 className="font-medium mb-2">Tracking Tips</h2>
        <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
          <li>Take photos in consistent lighting conditions</li>
          <li>Use the same distance and angle when possible</li>
          <li>Include a ruler or coin for size reference</li>
          <li>Document any changes you notice, even if they seem minor</li>
          <li>Set regular reminders to check your skin (monthly is recommended)</li>
        </ul>
      </div>
    </main>
  )
}

