"use client"

import { useEffect, useState } from "react"
import { LayoutWrapper } from "@/components/layout-wrapper"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileArchive, Download, Calendar, FileText, ImageIcon, Video, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

interface ArchiveItem {
  _id: string
  title: string
  description?: string
  category: string
  type: string
  size?: string
  date: string
  fileUrl: string
}

export default function ArchivePage() {
  const [archiveItems, setArchiveItems] = useState<ArchiveItem[]>([])
  const [filteredItems, setFilteredItems] = useState<ArchiveItem[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  const API_BASE = "https://studentdb-as5o.onrender.com/api"

  useEffect(() => {
    const fetchArchive = async () => {
      try {
        const res = await fetch(`${API_BASE}/archives`)
        const data = await res.json()
        setArchiveItems(data)
        setFilteredItems(data)
      } catch (err) {
        console.error("Error fetching archive:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchArchive()
  }, [])

  // Filter archive on search
  useEffect(() => {
    const filtered = archiveItems.filter(
      (item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredItems(filtered)
  }, [searchTerm, archiveItems])

  const getFileIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "pdf":
        return <FileText className="h-5 w-5 text-red-600" />
      case "zip":
        return <FileArchive className="h-5 w-5 text-purple-600" />
      case "xlsx":
      case "xls":
        return <FileText className="h-5 w-5 text-green-600" />
      case "jpg":
      case "png":
      case "jpeg":
        return <ImageIcon className="h-5 w-5 text-blue-600" />
      case "mp4":
        return <Video className="h-5 w-5 text-orange-600" />
      default:
        return <FileText className="h-5 w-5 text-gray-600" />
    }
  }

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      Reports: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      Minutes: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      Presentations: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
      Policies: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
      Media: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
      Financial: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      Academic: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200",
      Training: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
    }
    return colors[category] || "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
  }

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })

  return (
    <LayoutWrapper>
      <div className="container px-4 py-8 md:px-6 md:py-12">
        {/* Header */}
        <div className="flex flex-col space-y-4 text-center mb-12">
          <div className="flex items-center justify-center space-x-2">
            <FileArchive className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Document Archive</h1>
          </div>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl text-pretty">
            Access historical documents, reports, and resources from our departmental archive
          </p>
        </div>

        {/* Search */}
        <div className="mb-6 w-full max-w-md mx-auto relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search archive..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Archive Grid */}
        {loading ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground">Loading archive...</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-semibold text-muted-foreground">No documents match your search.</h2>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredItems.map((item) => (
              <Card key={item._id} className="group hover:shadow-lg transition-all duration-200 flex flex-col">
                <CardHeader>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Badge className={getCategoryColor(item.category)}>{item.category}</Badge>
                      <div className="flex items-center space-x-2">
                        {getFileIcon(item.type)}
                        <span className="text-sm text-muted-foreground">{item.type}</span>
                      </div>
                    </div>
                    <CardTitle className="text-lg text-balance">{item.title}</CardTitle>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(item.date)}</span>
                      </div>
                      <span>{item.size}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <CardDescription className="text-sm leading-relaxed mb-4 flex-1">{item.description}</CardDescription>
                  <a
                    href={item.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    className="w-full bg-transparent flex items-center justify-center border rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </LayoutWrapper>
  )
}
