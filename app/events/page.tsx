"use client"

import { useState } from "react"
import { LayoutWrapper } from "@/components/layout-wrapper"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Calendar, Clock, MapPin, Search } from "lucide-react"
import useSWR from "swr"

interface Event {
  _id: string
  title: string
  description?: string
  location?: string
  date: string
}

const API_BASE = "https://studentdb-as5o.onrender.com/api"
const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function EventsPage() {
  const { data: events, error } = useSWR<Event[]>(`${API_BASE}/events`, fetcher, {
    refreshInterval: 5000,
  })

  const [searchQuery, setSearchQuery] = useState("")

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })

  // ✅ Filter events by title, location, or description
  const filteredEvents =
    events?.filter((event) =>
      [event.title, event.location, event.description]
        .join(" ")
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    ) || []

  if (error) return <p className="text-center text-red-500">Failed to load events.</p>

  return (
    <LayoutWrapper>
      <div className="container px-4 py-8 md:px-6 md:py-12">
        {/* Header */}
        <div className="flex flex-col space-y-4 text-center mb-8">
          <div className="flex items-center justify-center space-x-2">
            <Calendar className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Upcoming Events</h1>
          </div>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl text-pretty">
            Discover and participate in departmental events, workshops, and activities
          </p>
        </div>

        {/* ✅ Search Bar */}
        <div className="max-w-md mx-auto mb-10 relative">
          <Search className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search events by title, location, or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Event Cards */}
        {!events ? (
          <p className="text-center text-muted-foreground">Loading events...</p>
        ) : filteredEvents.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-semibold text-muted-foreground">No matching events found.</h2>
            <p className="mt-2 text-muted-foreground">
              Try adjusting your search terms or check back later for updates.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {filteredEvents.map((event) => (
              <Card key={event._id} className="group hover:shadow-lg transition-all duration-200 flex flex-col">
                <CardHeader>
                  <div className="space-y-3">
                    <CardTitle className="text-xl text-balance">{event.title}</CardTitle>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(event.date)}</span>
                      </div>
                      {event.location && (
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4" />
                          <span>{event.location}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <CardDescription className="text-base leading-relaxed mb-4 flex-1">
                    {event.description}
                  </CardDescription>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>Scheduled Event</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </LayoutWrapper>
  )
}
