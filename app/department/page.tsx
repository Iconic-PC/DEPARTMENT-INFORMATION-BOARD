"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Users, Target, Eye, Building2, Shield, Award, BookOpen } from "lucide-react"

export default function DepartmentOverviewPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const organizationalStructure = [
    {
      title: "Head of Department",
      name: "Prof. Dr. Onojo",
      email: "onojo@university.edu",
      office: "NITDA BUILDING",
    },
    {
      title: "Staff Advisor",
      name: "Engr. Dr. Emeto",
      email: "emeto@university.edu",
      office: "NITDA BUILDING",
    },
    {
      title: "Exam Officer",
      name: "Engr. Dr. Eze",
      email: "eze@university.edu",
      office: "FACULTY BUILDING",
    },
  ]

  const presentExecutives = [
    { position: "President", name: "Onyegbule Semeony Sogineke", year: "Third Year" },
    { position: "Vice President", name: "Ezeihekaibee Chiemerie Udochi", year: "Second Year" },
    { position: "Secretary General", name: "Izu-Chiedo Samuel C.", year: "Third Year" },
    { position: "Financial Secretary", name: "Gervase Chelsea", year: "Third Year" },
    { position: "Treasurer", name: "Iwueze Annalisa Ngozika", year: "Second Year" },
    { position: "Assistant Secretary General", name: "Okereke Jnae Kalu", year: "Second Year" },
    { position: "Director of Welfare", name: "Nwokedi Chinedu Ebubechukwu", year: "Second Year" },
    { position: "Director of Research", name: "Uzoma Chinedu Bartholomew", year: "Second Year" },
    { position: "Director of Socials", name: "Nkaru Nwokoro Munachi C.", year: "Third Year" },
    { position: "Director of Sports", name: "Kalu Victor Tochi", year: "Second Year" },
    { position: "Public Relation Officer", name: "Ibe Lucky Obioma", year: "Second Year" },
  ]

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

  const filteredStaff = organizationalStructure.filter((m) =>
    [m.title, m.name, m.email, m.office]
      .filter(Boolean)
      .some((field) => field.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const filteredExecutives = presentExecutives.filter((e) =>
    [e.position, e.name, e.year]
      .filter(Boolean)
      .some((field) => field.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="h-8 w-8 text-emerald-600" />
            <h1 className="text-4xl font-bold text-foreground">Department Overview</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover our mission, vision, and the dedicated team that drives excellence in cybersecurity education and research.
          </p>
        </div>

        {/* 🔍 Search Bar */}
        <div className="relative max-w-md mx-auto mb-10">
          <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search by name, title, position, or office..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="border-emerald-200 dark:border-emerald-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
                <Target className="h-5 w-5" />
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                To provide world-class education in cybersecurity, fostering innovation and research that addresses the
                evolving challenges of digital security. We are committed to developing skilled professionals who will
                lead the fight against cyber threats and protect our digital infrastructure.
              </p>
            </CardContent>
          </Card>

          <Card className="border-emerald-200 dark:border-emerald-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
                <Eye className="h-5 w-5" />
                Our Vision
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                To be a globally recognized center of excellence in cybersecurity education and research, producing
                graduates who are industry-ready and capable of addressing the complex security challenges of tomorrow's
                digital world.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Department Leadership */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Building2 className="h-6 w-6 text-emerald-600" />
              Department Leadership
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              {filteredStaff.map((member, index) => (
                <div key={index} className="text-center p-6 rounded-lg border border-border bg-card">
                  <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-emerald-600" />
                  </div>
                  <h3 className="font-semibold text-lg mb-1">
                    {highlightMatch(member.name, searchTerm)}
                  </h3>
                  <Badge variant="secondary" className="mb-2">
                    {highlightMatch(member.title, searchTerm)}
                  </Badge>
                  <p className="text-sm text-muted-foreground mb-1">
                    {highlightMatch(member.email, searchTerm)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Office: {highlightMatch(member.office, searchTerm)}
                  </p>
                </div>
              ))}
              {filteredStaff.length === 0 && (
                <p className="col-span-3 text-center text-muted-foreground">No matching staff found.</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Student Executives */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Award className="h-6 w-6 text-emerald-600" />
              Present Student Executives
            </CardTitle>
            <p className="text-muted-foreground">
              Meet our dedicated student leadership team for the current academic year 2024/2025.
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredExecutives.map((executive, index) => (
                <div key={index} className="p-4 rounded-lg border border-border bg-card hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center">
                      <BookOpen className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">{highlightMatch(executive.name, searchTerm)}</h4>
                      <Badge variant="outline" className="text-xs">
                        {highlightMatch(executive.year, searchTerm)}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm font-medium text-emerald-700 dark:text-emerald-400">
                    {highlightMatch(executive.position, searchTerm)}
                  </p>
                </div>
              ))}
              {filteredExecutives.length === 0 && (
                <p className="col-span-full text-center text-muted-foreground">No matching executives found.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
