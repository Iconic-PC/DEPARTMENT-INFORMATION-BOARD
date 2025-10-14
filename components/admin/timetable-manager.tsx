"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Edit, Trash2 } from "lucide-react"

interface TimetableItem {
  _id?: string
  level: string
  courseCode: string
  courseTitle: string
  lectureHall: string
  date: string
  startTime: string
  endTime: string
  fileUrl?: string
}

const API_BASE = "https://studentdb-as5o.onrender.com/api/timetables"

export default function AdminTimetablePage() {
  const [items, setItems] = useState<TimetableItem[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<TimetableItem | null>(null)
  const [formData, setFormData] = useState<TimetableItem>({
    level: "",
    courseCode: "",
    courseTitle: "",
    lectureHall: "",
    date: "",
    startTime: "",
    endTime: "",
    fileUrl: "",
  })

  // Fetch all timetables
  const fetchData = async () => {
    try {
      const res = await fetch(API_BASE)
      if (!res.ok) throw new Error("Failed to fetch timetables")
      const data = await res.json()
      setItems(data)
    } catch (err) {
      console.error(err)
      alert("Error fetching timetables. Check console for details.")
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  // Create or update timetable
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const method = editingItem ? "PUT" : "POST"
    const url = editingItem ? `${API_BASE}/${editingItem._id}` : API_BASE

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      if (!res.ok) throw new Error("Failed to save timetable")
      setIsDialogOpen(false)
      setEditingItem(null)
      setFormData({
        level: "",
        courseCode: "",
        courseTitle: "",
        lectureHall: "",
        date: "",
        startTime: "",
        endTime: "",
        fileUrl: "",
      })
      fetchData()
    } catch (err) {
      console.error(err)
      alert("Error saving timetable. Check console for details.")
    }
  }

  // Edit timetable
  const handleEdit = (item: TimetableItem) => {
    setEditingItem(item)
    setFormData(item)
    setIsDialogOpen(true)
  }

  // Delete timetable
  const handleDelete = async (id?: string) => {
    if (!id) return
    if (!confirm("Are you sure you want to delete this timetable?")) return
    try {
      const res = await fetch(`${API_BASE}/${id}`, { method: "DELETE" })
      if (!res.ok) throw new Error("Failed to delete timetable")
      fetchData()
    } catch (err) {
      console.error(err)
      alert("Error deleting timetable. Check console for details.")
    }
  }

  // File upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return
    const file = e.target.files[0]
    const form = new FormData()
    form.append("file", file)

    try {
      const res = await fetch(`${API_BASE}/upload`, { method: "POST", body: form })
      if (!res.ok) throw new Error("Failed to upload file")
      const data = await res.json()
      setFormData((prev) => ({ ...prev, fileUrl: data.fileUrl }))
    } catch (err) {
      console.error(err)
      alert("Error uploading file. Check console for details.")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Manage Timetables</h2>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setEditingItem(null)
                setFormData({
                  level: "",
                  courseCode: "",
                  courseTitle: "",
                  lectureHall: "",
                  date: "",
                  startTime: "",
                  endTime: "",
                  fileUrl: "",
                })
              }}
            >
              <Plus className="mr-2 h-4 w-4" /> Add Timetable
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{editingItem ? "Edit Timetable" : "Add New Timetable"}</DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Level</Label>
                  <Input
                    value={formData.level}
                    onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Course Code</Label>
                  <Input
                    value={formData.courseCode}
                    onChange={(e) => setFormData({ ...formData, courseCode: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Course Title</Label>
                <Input
                  value={formData.courseTitle}
                  onChange={(e) => setFormData({ ...formData, courseTitle: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Lecture Hall</Label>
                <Input
                  value={formData.lectureHall}
                  onChange={(e) => setFormData({ ...formData, lectureHall: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Date</Label>
                  <Input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Start Time</Label>
                  <Input
                    type="time"
                    value={formData.startTime}
                    onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>End Time</Label>
                  <Input
                    type="time"
                    value={formData.endTime}
                    onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Upload File (optional)</Label>
                <Input type="file" onChange={handleFileUpload} />
                {formData.fileUrl && (
                  <a href={formData.fileUrl} target="_blank" className="underline text-blue-600">
                    View File
                  </a>
                )}
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">{editingItem ? "Update" : "Create"}</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <Card key={item._id}>
            <CardHeader className="flex justify-between items-start">
              <div>
                <CardTitle>
                  {item.courseCode} - {item.courseTitle}
                </CardTitle>
                <p className="text-sm text-muted-foreground">Level: {item.level}</p>
                <p className="text-sm text-muted-foreground">Hall: {item.lectureHall}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Button size="sm" variant="outline" onClick={() => handleEdit(item)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleDelete(item._id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-2">
                Time: {item.startTime} - {item.endTime}
              </p>
              {item.fileUrl && (
                <a href={item.fileUrl} target="_blank" className="underline text-blue-600">
                  View File
                </a>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
