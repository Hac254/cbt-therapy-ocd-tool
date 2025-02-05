"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Brain,
  BarChart,
  BookOpen,
  AlertCircle,
  Menu,
  Home,
  HelpCircle,
  Scale,
  MessageSquareIcon as MessageSquareQuestion,
} from "lucide-react"

const links = [
  { name: "Home", href: "/", icon: Home },
  { name: "Doubt Tracker", href: "/doubt-tracker", icon: Brain },
  { name: "Reality Check", href: "/reality-check", icon: Scale },
  { name: "Socratic Questions", href: "/socratic", icon: MessageSquareQuestion },
  { name: "Learn", href: "/learn", icon: BookOpen },
  { name: "Progress", href: "/progress", icon: BarChart },
  { name: "Support", href: "/support", icon: HelpCircle },
  { name: "Emergency", href: "/emergency", icon: AlertCircle },
]

export function MainNav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-40 border-b bg-background">
      <div className="flex h-16 items-center px-4">
        <Link href="/" className="font-bold text-xl flex items-center gap-2 mr-4">
          <span className="text-2xl">🌟</span>
          <span className="hidden sm:inline">OCD Helper</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex flex-1 justify-center">
          <div className="flex space-x-1">
            {links.map((link) => (
              <Button
                key={link.href}
                variant={pathname === link.href ? "default" : "ghost"}
                asChild
                className="px-4 transition-all duration-200 hover:scale-105"
              >
                <Link href={link.href} className="flex items-center space-x-2">
                  <link.icon className="h-5 w-5" />
                  <span>{link.name}</span>
                </Link>
              </Button>
            ))}
          </div>
        </div>

        {/* Mobile Navigation */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" className="lg:hidden ml-auto" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72">
            <div className="flex items-center gap-2 font-bold text-xl mb-4">
              <span className="text-2xl">🌟</span>
              <span>OCD Helper</span>
            </div>
            <ScrollArea className="h-[calc(100vh-4rem)] pb-10">
              <div className="flex flex-col space-y-2 py-4">
                {links.map((link) => (
                  <Button
                    key={link.href}
                    variant={pathname === link.href ? "default" : "ghost"}
                    asChild
                    className="justify-start hover:scale-105 transition-all duration-200"
                    onClick={() => setOpen(false)}
                  >
                    <Link href={link.href} className="flex items-center space-x-2">
                      <link.icon className="h-5 w-5" />
                      <span>{link.name}</span>
                    </Link>
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}

