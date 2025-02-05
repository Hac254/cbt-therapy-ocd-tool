"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Star } from "lucide-react"

export function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return null

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 3, delay: 1.5 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0d3c26]"
    >
      <div className="text-center text-white">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center mb-4"
        >
          
          <Star className="h-16 w-16" />
        </motion.div>
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-3xl font-bold"
        >
        
          OCD & Phobias Tool
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-lg"
        >
          Your journey to wellness begins here 🌟
        </motion.p>
      </div>
    </motion.div>
  )
}

