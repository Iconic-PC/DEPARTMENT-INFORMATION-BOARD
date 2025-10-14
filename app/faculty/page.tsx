"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Users, Mail, MapPin, GraduationCap, Award, BookOpen, Search } from "lucide-react"

export default function FacultyStaffPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const dean = {
    name: "Prof. Dr. Mrs. U. Eze",
    title: "Dean of S.I.C.T Faculty",
    email: "u. eze@university.edu",
    office: "Admin-501",
    specialization: "Cybersecurity Policy & Governance",
    qualifications: ["Ph.D. Computer Science", "M.Sc. Information Security", "B.Sc. Computer Engineering"],
  }

  const facultyStaff = [
    {
      name: "Dr. Jennifer Martinez",
      title: "Faculty Staff Advisor",
      email: "j.martinez@university.edu",
      office: "CS-401",
      specialization: "Network Security & Cryptography",
      qualifications: ["Ph.D. Cybersecurity", "M.Sc. Computer Science"],
    },
    {
      name: "Prof. Ahmed Hassan",
      title: "Senior Faculty Member",
      email: "a.hassan@university.edu",
      office: "CS-403",
      specialization: "Ethical Hacking & Penetration Testing",
      qualifications: ["Ph.D. Information Security", "CISSP", "CEH"],
    },
    {
      name: "Dr. Lisa Thompson",
      title: "Associate Professor",
      email: "l.thompson@university.edu",
      office: "CS-405",
      specialization: "Digital Forensics & Incident Response",
      qualifications: ["Ph.D. Digital Forensics", "GCFA", "GCIH"],
    },
    {
      name: "Dr. Carlos Rodriguez",
      title: "Assistant Professor",
      email: "c.rodriguez@university.edu",
      office: "CS-407",
      specialization: "Malware Analysis & Reverse Engineering",
      qualifications: ["Ph.D. Computer Science", "GREM", "CISSP"],
    },
    {
      name: "Dr. Fatima Al-Zahra",
      title: "Research Faculty",
      email: "f.alzahra@university.edu",
      office: "CS-409",
      specialization: "IoT Security & Privacy",
      qualifications: ["Ph.D. Information Systems", "M.Sc. Cybersecurity"],
    },
    {
      name: "Prof. Michael O'Brien",
      title: "Department Coordinator",
      email: "m.obrien@university.edu",
      office: "CS-411",
      specialization: "Security Architecture & Risk Management",
      qualifications: ["Ph.D. Information Security", "CISM", "CISA"],
    },
  ]

  // ✅ Filter by search query
  const filteredFaculty = facultyStaff.filter((faculty) =>
    [faculty.name, faculty.title, faculty.specialization, ...faculty.qualifications]
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  )

  const deanMatchesSearch =
    [dean.name, dean.title, dean.specialization, ...dean.qualifications]
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <GraduationCap className="h-8 w-8 text-emerald-600" />
            <h1 className="text-4xl font-bold text-foreground">Faculty & Staff</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Meet our distinguished faculty members who bring years of expertise and passion to cybersecurity education.
          </p>
        </div>

        {/* ✅ Search Bar */}
        <div className="max-w-md mx-auto mb-12 relative">
          <Search className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search by name, title, or specialization..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Dean Section */}
        {deanMatchesSearch && (
          <Card className="mb-12 border-emerald-200 dark:border-emerald-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl text-emerald-700 dark:text-emerald-400">
                <Award className="h-6 w-6" />
                Dean of Faculty
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center">
                    <Users className="h-12 w-12 text-emerald-600" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2">{dean.name}</h3>
                  <Badge variant="default" className="mb-3 bg-emerald-600">
                    {dean.title}
                  </Badge>
                  <p className="text-muted-foreground mb-4">{dean.specialization}</p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-emerald-600" />
                      <span>{dean.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-emerald-600" />
                      <span>Office: {dean.office}</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h4 className="font-semibold mb-2">Qualifications:</h4>
                    <div className="flex flex-wrap gap-2">
                      {dean.qualifications.map((qual, index) => (
                        <Badge key={index} variant="outline">
                          {qual}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Faculty Staff */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <BookOpen className="h-6 w-6 text-emerald-600" />
              Faculty Members
            </CardTitle>
            <p className="text-muted-foreground">
              Our expert faculty members specializing in various cybersecurity domains.
            </p>
          </CardHeader>
          <CardContent>
            {filteredFaculty.length === 0 ? (
              <p className="text-center text-muted-foreground py-10">No matching faculty found.</p>
            ) : (
              <div className="grid lg:grid-cols-2 gap-6">
                {filteredFaculty.map((faculty, index) => (
                  <div
                    key={index}
                    className="p-6 rounded-lg border border-border bg-card hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center flex-shrink-0">
                        <Users className="h-8 w-8 text-emerald-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold mb-1">{faculty.name}</h3>
                        <Badge variant="secondary" className="mb-2">
                          {faculty.title}
                        </Badge>
                        <p className="text-sm text-muted-foreground mb-3">{faculty.specialization}</p>

                        <div className="space-y-2 mb-3">
                          <div className="flex items-center gap-2 text-sm">
                            <Mail className="h-3 w-3 text-emerald-600 flex-shrink-0" />
                            <span className="truncate">{faculty.email}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin className="h-3 w-3 text-emerald-600 flex-shrink-0" />
                            <span>Office: {faculty.office}</span>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-semibold mb-1">Qualifications:</h4>
                          <div className="flex flex-wrap gap-1">
                            {faculty.qualifications.map((qual, qualIndex) => (
                              <Badge key={qualIndex} variant="outline" className="text-xs">
                                {qual}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
