"use client"

import { useState } from "react"
import { LayoutWrapper } from "@/components/layout-wrapper"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bell, Calendar, Clock, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import useSWR from "swr"

interface Announcement {
  _id: string
  title: string
  content?: string
  author?: string
  createdAt: string
  category?: string
  priority?: "high" | "medium" | "low"
}

const API_BASE = "https://studentdb-as5o.onrender.com/api"
const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function AnnouncementsPage() {
  const { data: announcements, error, isLoading } = useSWR<Announcement[]>(
    `${API_BASE}/announcements`,
    fetcher,
    { refreshInterval: 5000 }
  )
  const [searchTerm, setSearchTerm] = useState("")

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })

  const highlightMatch = (text = "", term = "") => {
    if (!term.trim()) return text
    const regex = new RegExp(`(${term})`, "gi")
    return text.split(regex).map((part, i) =>
      regex.test(part) ? (
        <mark key={i} className="bg-yellow-200 dark:bg-yellow-700 text-black px-1 rounded">
          {part}
        </mark>
      ) : (
        part
      )
    )
  }

  const filteredAnnouncements =
    announcements?.filter((a) =>
      [a.title, a.content, a.category, a.author]
        .filter(Boolean)
        .some((field) => field!.toLowerCase().includes(searchTerm.toLowerCase()))
    ) || []

  if (error) {
    return (
      <LayoutWrapper>
        <p className="text-center text-red-500">Failed to load announcements.</p>
      </LayoutWrapper>
    )
  }

  return (
    <LayoutWrapper>
      <div className="container px-4 py-8 md:px-6 md:py-12">
        {/* Header */}
        <div className="flex flex-col space-y-4 text-center mb-8">
          <div className="flex items-center justify-center space-x-2">
            <Bell className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Announcements</h1>
          </div>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl text-pretty">
            Stay informed with the latest department news, updates, and important notices.
          </p>
        </div>

        {/* Search bar */}
        <div className="relative max-w-md mx-auto mb-10">
          <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search announcements..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {isLoading ? (
          <p className="text-center text-muted-foreground">Loading announcements...</p>
        ) : filteredAnnouncements.length === 0 ? (
          <p className="text-center text-muted-foreground">No announcements found.</p>
        ) : (
          <div className="grid gap-6 md:gap-8">
            {filteredAnnouncements.map((announcement) => (
              <Card key={announcement._id} className="group hover:shadow-lg transition-all duration-200">
                <CardHeader>
                  <div className="flex flex-col space-y-3 sm:flex-row sm:items-start sm:justify-between sm:space-y-0">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Badge className={getPriorityColor(announcement.priority)}>
                          {announcement.priority?.toUpperCase() || "GENERAL"}
                        </Badge>
                        <Badge variant="outline">{announcement.category || "General"}</Badge>
                      </div>
                      <CardTitle className="text-xl sm:text-2xl text-balance">
                        {highlightMatch(announcement.title, searchTerm)}
                      </CardTitle>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(announcement.createdAt)}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed mb-4">
                    {highlightMatch(announcement.content || "", searchTerm)}
                  </CardDescription>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>Posted by {announcement.author || "Admin"}</span>
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
