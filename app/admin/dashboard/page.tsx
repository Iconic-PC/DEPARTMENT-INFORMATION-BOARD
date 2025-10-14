"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { AuthGuard } from "@/components/auth-guard"
import { LayoutWrapper } from "@/components/layout-wrapper"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { useAuth } from "@/lib/auth-context"
import { Bell, Calendar, FileArchive, LogOut, User, BookOpen } from "lucide-react"
import { AnnouncementManager } from "@/components/admin/announcement-manager"
import { EventManager } from "@/components/admin/event-manager"
import { ArchiveManager } from "@/components/admin/archive-manager"
import TimetableManager from "@/components/admin/timetable-manager" // <- fixed import

export default function AdminDashboardPage() {
  const { user, isAuthenticated, loading, logout } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !isAuthenticated) router.push("/admin/login")
  }, [isAuthenticated, loading, router])

  const handleLogout = async () => {
    await logout()
    router.push("/admin/login")
  }

  if (loading || !isAuthenticated) return <p>Loading...</p>

  return (
    <AuthGuard>
      <LayoutWrapper>
        <div className="container px-4 py-8 md:px-6 md:py-12">
          {/* Header */}
          <div className="flex flex-col space-y-4 mb-8 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
            <div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">Admin Dashboard</h1>
              <p className="text-muted-foreground mt-2">Manage departmental content and resources</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span className="text-sm font-medium">{user?.username}</span>
                <Badge variant="outline">{user?.role}</Badge>
              </div>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="announcements" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="announcements" className="flex items-center space-x-2">
                <Bell className="h-4 w-4" />
                <span>Announcements</span>
              </TabsTrigger>
              <TabsTrigger value="events" className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>Events</span>
              </TabsTrigger>
              <TabsTrigger value="archive" className="flex items-center space-x-2">
                <FileArchive className="h-4 w-4" />
                <span>Archive</span>
              </TabsTrigger>
              <TabsTrigger value="timetable" className="flex items-center space-x-2">
                <BookOpen className="h-4 w-4" />
                <span>Timetable</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="announcements">
              <AnnouncementManager />
            </TabsContent>

            <TabsContent value="events">
              <EventManager />
            </TabsContent>

            <TabsContent value="archive">
              <ArchiveManager />
            </TabsContent>

            <TabsContent value="timetable">
              <TimetableManager /> {/* <- now works correctly */}
            </TabsContent>
          </Tabs>
        </div>
      </LayoutWrapper>
    </AuthGuard>
  )
}
