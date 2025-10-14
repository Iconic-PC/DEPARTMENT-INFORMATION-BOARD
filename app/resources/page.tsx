"use client"

import { useState, ReactElement } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Shield,
  ExternalLink,
  Lock,
  Bug,
  Globe,
  Terminal,
  Zap,
  Eye,
  AlertTriangle,
  Code,
} from "lucide-react"

// Type definitions for clarity (prevents red lines)
interface CyberTool {
  name: string
  description: string
  category: string
  icon: ReactElement
  link: string
  type: string
}

interface PracticalLab {
  name: string
  description: string
  category: string
  icon: ReactElement
  link: string
  difficulty: string
}

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const cybersecurityTools: CyberTool[] = [
    {
      name: "Wireshark",
      description: "Network protocol analyzer for troubleshooting and analysis.",
      category: "Network Analysis",
      icon: <Globe className="h-5 w-5" />,
      link: "https://www.wireshark.org/",
      type: "Tool",
    },
    {
      name: "Metasploit Framework",
      description: "Penetration testing platform for security assessments.",
      category: "Penetration Testing",
      icon: <Bug className="h-5 w-5" />,
      link: "https://www.metasploit.com/",
      type: "Tool",
    },
    {
      name: "Nmap",
      description: "Network discovery and security auditing utility.",
      category: "Network Scanning",
      icon: <Eye className="h-5 w-5" />,
      link: "https://nmap.org/",
      type: "Tool",
    },
    {
      name: "Burp Suite",
      description: "Web application security testing platform.",
      category: "Web Security",
      icon: <Globe className="h-5 w-5" />,
      link: "https://portswigger.net/burp",
      type: "Tool",
    },
  ]

  const practicalLabs: PracticalLab[] = [
    {
      name: "TryHackMe",
      description: "Hands-on cybersecurity training through gamified challenges.",
      category: "Interactive Learning",
      icon: <Terminal className="h-5 w-5" />,
      link: "https://tryhackme.com/",
      difficulty: "Beginner to Advanced",
    },
    {
      name: "HackTheBox",
      description: "Penetration testing labs and cybersecurity challenges.",
      category: "Penetration Testing",
      icon: <Lock className="h-5 w-5" />,
      link: "https://www.hackthebox.com/",
      difficulty: "Intermediate to Expert",
    },
    {
      name: "OverTheWire",
      description: "Wargames to learn and practice security concepts.",
      category: "Wargames",
      icon: <Zap className="h-5 w-5" />,
      link: "https://overthewire.org/",
      difficulty: "Beginner to Advanced",
    },
    {
      name: "VulnHub",
      description: "Vulnerable virtual machines for security practice.",
      category: "Virtual Labs",
      icon: <AlertTriangle className="h-5 w-5" />,
      link: "https://www.vulnhub.com/",
      difficulty: "All Levels",
    },
  ]

  // Combine all items for searching
  const allResources = [...cybersecurityTools, ...practicalLabs]

  const handleSearch = () => {
    const query = searchQuery.toLowerCase()
    const found = allResources.find((res) =>
      res.name.toLowerCase().includes(query)
    )

    if (found) {
      window.open(found.link, "_blank")
    } else if (query.trim() !== "") {
      window.open(`https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`, "_blank")
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="h-8 w-8 text-emerald-600" />
            <h1 className="text-4xl font-bold text-foreground">Cybersecurity Resources</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Explore essential cybersecurity tools and platforms to boost your knowledge and skills.
          </p>

          {/* 🔍 Search Bar */}
          <div className="mt-6 flex justify-center gap-2">
            <Input
              type="text"
              placeholder="Search cybersecurity resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full max-w-md"
            />
            <Button onClick={handleSearch} className="bg-emerald-600 text-white hover:bg-emerald-700">
              Search
            </Button>
          </div>
        </div>

        {/* Cybersecurity Tools Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Terminal className="h-6 w-6 text-emerald-600" />
              Essential Cybersecurity Tools
            </CardTitle>
            <p className="text-muted-foreground">Industry-standard tools used by professionals worldwide.</p>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {cybersecurityTools.map((tool, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg border border-border bg-card hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900 rounded-lg flex items-center justify-center flex-shrink-0">
                      {tool.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold">{tool.name}</h3>
                        <Badge variant="outline" className="text-xs">
                          {tool.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{tool.description}</p>
                      <Button size="sm" variant="outline" className="gap-2 bg-transparent" asChild>
                        <a href={tool.link} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-3 w-3" />
                          Visit Site
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Hands-On Learning Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Code className="h-6 w-6 text-emerald-600" />
              Hands-On Learning Platforms
            </CardTitle>
            <p className="text-muted-foreground">
              Interactive platforms for practical cybersecurity experience.
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {practicalLabs.map((lab, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg border border-border bg-card hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900 rounded-lg flex items-center justify-center flex-shrink-0">
                      {lab.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold">{lab.name}</h3>
                        <Badge variant="secondary" className="text-xs">
                          {lab.difficulty}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">{lab.description}</p>
                      <p className="text-xs text-emerald-600 dark:text-emerald-400 mb-3">{lab.category}</p>
                      <Button size="sm" variant="outline" className="gap-2 bg-transparent" asChild>
                        <a href={lab.link} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-3 w-3" />
                          Start Learning
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
