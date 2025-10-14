"use client"

import { useEffect, useState } from "react"
import { LayoutWrapper } from "@/components/layout-wrapper"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"

const HERO_IMAGES = [
 "https://images.unsplash.com/photo-1662638600476-d563fffbb072?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fGhhY2tlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500",
  "https://unsplash.com/photos/iIJrUoeRoCQ/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTF8fGN5YmVyc2VjdXJpdHl8ZW58MHx8fHwxNzYwNDc2MDk2fDA&force=true",
  "https://images.unsplash.com/photo-1719253479576-46c24a216c54?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1740",
]


const TECH_AREAS = [
  { title: "Network Security", desc: "Firewalls, IDS/IPS, and secure architectures." },
  { title: "Cloud Security", desc: "Secure cloud deployments & compliance." },
  { title: "Threat Intelligence", desc: "Detecting and responding to modern threats." },
  { title: "Ethical Hacking", desc: "Hands-on penetration testing and red-teaming." },
]

export default function TechLandingPage() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const t = setInterval(() => setIndex((i) => (i + 1) % HERO_IMAGES.length), 5000)
    return () => clearInterval(t)
  }, [paused])

  return (
    <LayoutWrapper>
      {/* HERO */}
      <section className="relative overflow-hidden h-[68vh] md:h-[72vh] lg:h-[78vh]">
        <div
          className="absolute inset-0 flex transition-transform duration-700"
          style={{ transform: `translateX(-${index * 100}%)` }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {HERO_IMAGES.map((src, i) => (
            <div key={i} className="min-w-full h-full relative">
              <img src={src} alt={`hero-${i}`} className="object-cover w-full h-full" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-transparent" />
            </div>
          ))}
        </div>

        <div className="absolute inset-0 flex items-center justify-center px-6">
          <div className="max-w-4xl text-center">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white drop-shadow-lg">
              Welcome to the{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-sky-500 to-indigo-500">
                Cybersecurity Department
              </span>
            </h1>
            <p className="mt-4 text-lg text-slate-200 max-w-3xl mx-auto">
              Empowering the next generation of cyber defenders through innovation, research, and collaboration.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild size="lg" className="bg-gradient-to-r from-cyan-500 to-indigo-600">
                <Link href="/department" className="flex items-center gap-2">
                  Explore Programs <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/events">View Events</Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-6 flex justify-center gap-2">
          {HERO_IMAGES.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-3 h-3 rounded-full ${index === i ? "bg-white" : "bg-white/30"}`}
            />
          ))}
        </div>

        <button
          onClick={() => setIndex((i) => (i - 1 + HERO_IMAGES.length) % HERO_IMAGES.length)}
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/30 p-2 rounded-full hover:bg-black/40 hidden md:inline-flex"
        >
          <ChevronLeft className="text-white" />
        </button>

        <button
          onClick={() => setIndex((i) => (i + 1) % HERO_IMAGES.length)}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/30 p-2 rounded-full hover:bg-black/40 hidden md:inline-flex"
        >
          <ChevronRight className="text-white" />
        </button>
      </section>

      {/* TECH AREAS */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-center">What We Focus On</h2>
            <p className="text-muted-foreground text-center mt-2 max-w-2xl mx-auto">
              Practical training, research labs, and industry partnerships that prepare students for cybersecurity careers.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TECH_AREAS.map((area, idx) => (
              <div
                key={area.title}
                className="rounded-xl border border-border/50 bg-gradient-to-br from-white/5 to-white/10 p-5 hover:shadow-lg transition"
              >
                <h3 className="text-lg font-semibold">{area.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{area.desc}</p>
                <div className="mt-4 h-28 rounded-md overflow-hidden">
                  <img
                    src={
                      idx === 0
                        ? "https://images.unsplash.com/photo-1691435828932-911a7801adfb?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bmV0d29yayUyMHNlY3VyaXR5fGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500"
                        : idx === 1
                        ? "https://plus.unsplash.com/premium_photo-1733306493254-52b143296396?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fGNsb3VkJTIwc2VjdXJpdHl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=400"
                        : idx === 2
                        ? "https://plus.unsplash.com/premium_photo-1663089889337-6eaafda19567?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dGhyZWF0JTIwaW50ZWxsaWdlbmNlfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=400"
                        : "https://plus.unsplash.com/premium_photo-1663100722417-6e36673fe0ed?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZXRoaWNhbCUyMGhhY2tpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=400"
                    }
                    alt={area.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT & VISION */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Text */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">About the Department</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              The Cybersecurity Department at FUTO is dedicated to advancing digital security education, research, and
              innovation. Our mission is to create a safer digital world by empowering students with both theoretical
              foundations and hands-on expertise in security technologies.
            </p>
            <h3 className="text-2xl font-semibold mb-3">Our Vision</h3>
            <p className="text-muted-foreground leading-relaxed">
              To be a leading hub for cybersecurity excellence — fostering research, collaboration, and innovation to
              address emerging cyber threats in Nigeria and across the globe.
            </p>
            <div className="mt-8">
              <Button asChild size="lg" className="bg-gradient-to-r from-cyan-500 to-indigo-600">
                <Link href="/department">Explore the Department</Link>
              </Button>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative rounded-2xl overflow-hidden shadow-lg">
            <img
              src="https://plus.unsplash.com/premium_photo-1683140640468-9e428f4257b8?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y3liZXJzZWN1cml0eSUyMHZpc3VhbGl6YXRpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=400"
              alt="Cybersecurity visualization"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent" />
          </div>
        </div>
      </section>

{/* CTA Section */}
<section className="py-24 text-center bg-gradient-to-b from-background via-muted/30 to-background">
  <div className="container mx-auto px-6">
    <h3 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4">
      Step Into the Future of <span className="text-primary">Cybersecurity</span>
    </h3>

    <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
      Protecting the digital world through innovation, intelligence, and integrity.
      Join us to shape tomorrow’s cyber defense frontier.
    </p>

    <div className="flex justify-center gap-4 mb-16">
      <Button
        asChild
        size="lg"
        className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
      >
        <Link href="/events">Discover Events</Link>
      </Button>
    </div>

    {/* Cybersecurity Image */}
    <div className="relative max-w-7xl mx-auto rounded-3xl overflow-hidden shadow-2xl">
      <img
        src="https://images.unsplash.com/photo-1665512983203-8421eae182b0?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=2000"
        alt="Cybersecurity visualization"
        className="w-full h-[650px] object-cover object-center transition-transform duration-700 hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
    </div>
  </div>
</section>

    </LayoutWrapper>
  )
}
