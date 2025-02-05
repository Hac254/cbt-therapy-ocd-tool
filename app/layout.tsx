import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { MainNav } from "@/components/main-nav"
import { AppProvider } from "@/context/app-context"
import { cn } from "@/lib/utils"
import "./globals.css"
import type React from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "OCD Helper - I-CBT Tool",
  description: "A comprehensive tool for managing OCD using Inference-Based CBT",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={cn(inter.className, "min-h-screen bg-background antialiased")}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AppProvider>
            <div className="relative flex min-h-screen flex-col">
              <MainNav />
              <main className="flex-1">{children}</main>
            </div>
            <Toaster />
          </AppProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

