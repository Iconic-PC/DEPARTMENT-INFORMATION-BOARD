"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Edit, Trash2, FileText, Calendar } from "lucide-react"

interface ArchiveItem {
  _id?: string
  title: string
  description: string
  date: string
  type: string
  size?: string
  category: string
  fileUrl?: string
  isEditable?: boolean
}

const API_BASE = "https://studentdb-as5o.onrender.com/api"

export function ArchiveManager() {
  const [archiveItems, setArchiveItems] = useState<ArchiveItem[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<ArchiveItem | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    type: "",
    size: "",
    category: "",
    fileUrl: "",
  })

  // Fetch archives, events, and announcements
  const fetchArchiveData = async () => {
    try {
      const [archivesRes, eventsRes, announcementsRes] = await Promise.all([
        fetch(`${API_BASE}/archives`),
        fetch(`${API_BASE}/events`),
        fetch(`${API_BASE}/announcements`),
      ])

      const [archives, events, announcements] = await Promise.all([
        archivesRes.json(),
        eventsRes.json(),
        announcementsRes.json(),
      ])

      const eventsAsArchive: ArchiveItem[] = events.map((e: any) => ({
        _id: e._id,
        title: e.title,
        description: e.description,
        date: e.date,
        type: "Event",
        category: "Events",
        isEditable: false,
      }))

      const announcementsAsArchive: ArchiveItem[] = announcements.map((a: any) => ({
        _id: a._id,
        title: a.title,
        description: a.description,
        date: a.date,
        type: "Announcement",
        category: "Announcements",
        isEditable: false,
      }))

      const combined = [
        ...archives.map((item: any) => ({ ...item, isEditable: true })),
        ...eventsAsArchive,
        ...announcementsAsArchive,
      ]

      setArchiveItems(combined)
    } catch (err) {
      console.error("Error fetching archive data:", err)
    }
  }

  useEffect(() => {
    fetchArchiveData()
  }, [])

  const resetForm = () => {
    setFormData({ title: "", description: "", date: "", type: "", size: "", category: "", fileUrl: "" })
    setEditingItem(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const method = editingItem ? "PUT" : "POST"
      const url = editingItem ? `${API_BASE}/archives/${editingItem._id}` : `${API_BASE}/archives`

      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      await fetchArchiveData()
      setIsDialogOpen(false)
      resetForm()
    } catch (err) {
      console.error("Error saving archive:", err)
    }
  }

  const handleEdit = (item: ArchiveItem) => {
    if (!item.isEditable) return
    setEditingItem(item)
    setFormData({
      title: item.title || "",
      description: item.description || "",
      date: item.date || "",
      type: item.type || "",
      size: item.size || "",
      category: item.category || "",
      fileUrl: item.fileUrl || "",
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (id?: string) => {
    if (!id) return
    if (!confirm("Are you sure you want to delete this item?")) return
    try {
      await fetch(`${API_BASE}/archives/${id}`, { method: "DELETE" })
      await fetchArchiveData()
    } catch (err) {
      console.error("Error deleting archive:", err)
    }
  }

  // Handle file upload
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const form = new FormData()
    form.append("file", file)

    try {
      const res = await fetch(`${API_BASE}/upload`, {
        method: "POST",
        body: form,
      })
      const data = await res.json()
      setFormData((prev) => ({ ...prev, fileUrl: data.fileUrl, size: file.size ? `${(file.size / (1024 * 1024)).toFixed(2)} MB` : "" }))
    } catch (err) {
      console.error("File upload failed:", err)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Manage Archive</h2>
          <p className="text-muted-foreground">Create, edit, and delete archive items</p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { resetForm(); setIsDialogOpen(true) }}>
              <Plus className="mr-2 h-4 w-4" />
              Add Archive Item
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>{editingItem ? "Edit Archive Item" : "Add New Archive Item"}</DialogTitle>
              <DialogDescription>{editingItem ? "Update the archive item details." : "Create a new archive item."}</DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input placeholder="Title" value={formData.title} onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))} required />
              <Textarea placeholder="Description" value={formData.description} onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))} required />
              <Input type="date" value={formData.date} onChange={(e) => setFormData((prev) => ({ ...prev, date: e.target.value }))} required />

              <Select value={formData.type} onValueChange={(val) => setFormData((prev) => ({ ...prev, type: val }))}>
                <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="PDF">PDF</SelectItem>
                  <SelectItem value="DOCX">DOCX</SelectItem>
                  <SelectItem value="ZIP">ZIP</SelectItem>
                  <SelectItem value="MP4">MP4</SelectItem>
                  <SelectItem value="Event">Event</SelectItem>
                  <SelectItem value="Announcement">Announcement</SelectItem>
                </SelectContent>
              </Select>

              <Input placeholder="Category" value={formData.category} onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))} required />

              {/* File Upload */}
              <div className="space-y-2">
                <label className="block text-sm font-medium">Upload File (PDF/Image/etc.)</label>
                <Input type="file" onChange={handleFileChange} />
                {formData.fileUrl && (
                  <a href={formData.fileUrl} target="_blank" className="text-blue-600 underline text-sm">View Uploaded File</a>
                )}
              </div>

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                <Button type="submit">{editingItem ? "Update" : "Create"}</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Archive Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {archiveItems.map((item) => (
          <Card key={item._id || item.title}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <Badge variant="outline">{item.category}</Badge>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </div>
                <div className="flex items-center space-x-2">
                  {item.isEditable && (
                    <>
                      <Button variant="outline" size="sm" onClick={() => handleEdit(item)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDelete(item._id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-2 text-sm">{item.description}</p>
              <div className="flex justify-between text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(item.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FileText className="h-4 w-4" />
                  <span>{item.type} {item.size && `• ${item.size}`}</span>
                </div>
              </div>
              {item.fileUrl && (
                <a href={item.fileUrl} target="_blank" className="text-blue-600 underline text-sm mt-1 block">View File</a>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
