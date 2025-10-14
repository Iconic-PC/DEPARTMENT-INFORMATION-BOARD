"use client"

import { useState, useEffect } from "react"
import { LayoutWrapper } from "@/components/layout-wrapper"
import { Calendar, Clock, FileText, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

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

export default function StudentTimetablePage() {
  const [timetable, setTimetable] = useState<TimetableItem[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(API_BASE)
        if (!res.ok) throw new Error("Failed to fetch timetable")
        const data: TimetableItem[] = await res.json()
        setTimetable(data)
      } catch (err: any) {
        console.error(err)
        setError(err.message || "Error fetching timetable")
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  // Filter and group by level
  const filtered = timetable.filter((item) =>
    [item.courseCode, item.courseTitle, item.level, item.lectureHall]
      .some((field) => field.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const groupedByLevel: Record<string, TimetableItem[]> = {}
  filtered.forEach((item) => {
    if (!groupedByLevel[item.level]) groupedByLevel[item.level] = []
    groupedByLevel[item.level].push(item)
  })

  // Sort by date and time for clarity
  Object.keys(groupedByLevel).forEach(level => {
    groupedByLevel[level].sort((a, b) => {
      const dateA = new Date(a.date + "T" + a.startTime)
      const dateB = new Date(b.date + "T" + b.startTime)
      return dateA.getTime() - dateB.getTime()
    })
  })

  return (
    <LayoutWrapper>
      <div className="container px-4 py-8 md:px-6 md:py-12">
        {/* Header */}
        <div className="flex flex-col space-y-4 text-center mb-8">
          <div className="flex items-center justify-center space-x-2">
            <Calendar className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Timetable
            </h1>
          </div>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl text-pretty">
            View your courses, schedules, and lecture halls organized by level.
          </p>
        </div>

        {/* Search */}
        <div className="relative max-w-md mx-auto mb-10">
          <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search timetable..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Loading / Error */}
        {loading ? (
          <p className="text-center text-muted-foreground">Loading timetable...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : filtered.length === 0 ? (
          <p className="text-center text-muted-foreground">No timetable entries found.</p>
        ) : (
          Object.keys(groupedByLevel).sort().map((level) => (
            <div key={level} className="mb-10">
              <h2 className="text-2xl font-semibold mb-4">Level {level}</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full table-auto border border-gray-300 dark:border-gray-700 rounded-lg">
                  <thead className="bg-gray-100 dark:bg-gray-800">
                    <tr>
                      <th className="px-4 py-2 border-b text-left">Date</th>
                      <th className="px-4 py-2 border-b text-left">Time</th>
                      <th className="px-4 py-2 border-b text-left">Course Code</th>
                      <th className="px-4 py-2 border-b text-left">Course Title</th>
                      <th className="px-4 py-2 border-b text-left">Lecture Hall</th>
                      <th className="px-4 py-2 border-b text-left">File</th>
                    </tr>
                  </thead>
                  <tbody>
                    {groupedByLevel[level].map((item) => (
                      <tr key={item._id} className="hover:bg-gray-50 dark:hover:bg-gray-900">
                        <td className="px-4 py-2 border-b">{new Date(item.date).toLocaleDateString()}</td>
                        <td className="px-4 py-2 border-b">{item.startTime} - {item.endTime}</td>
                        <td className="px-4 py-2 border-b">{item.courseCode}</td>
                        <td className="px-4 py-2 border-b">{item.courseTitle}</td>
                        <td className="px-4 py-2 border-b">{item.lectureHall}</td>
                        <td className="px-4 py-2 border-b">
                          {item.fileUrl && (
                            <a
                              href={item.fileUrl}
                              target="_blank"
                              className="underline text-blue-600 hover:text-blue-800 text-sm flex items-center"
                            >
                              <FileText className="inline h-4 w-4 mr-1" />
                              View
                            </a>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))
        )}
      </div>
    </LayoutWrapper>
  )
}
