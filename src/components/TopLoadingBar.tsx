"use client"

import { useEffect, useState, useRef } from "react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const TopLoadingBar = () => {
  const pathname = usePathname()
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const prevPathnameRef = useRef<string>("")
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Only trigger if pathname actually changed
    if (prevPathnameRef.current === pathname) return
    
    // Skip on initial mount
    if (prevPathnameRef.current === "") {
      prevPathnameRef.current = pathname
      return
    }

    prevPathnameRef.current = pathname

    // Start loading when pathname changes
    setLoading(true)
    setProgress(10) // Start at 10% for immediate visual feedback

    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    // Simulate progress with smooth animation
    let currentProgress = 10
    intervalRef.current = setInterval(() => {
      if (currentProgress >= 90) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
        }
        return
      }
      
      // Increment progress with decreasing increments for smooth animation
      const increment = Math.random() * 8 + 3
      currentProgress = Math.min(currentProgress + increment, 90)
      setProgress(currentProgress)
    }, 80)

    // Complete progress when navigation is done
    const completeTimer = setTimeout(() => {
      setProgress(100)
      setTimeout(() => {
        setLoading(false)
        setProgress(0)
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
        }
      }, 200)
    }, 300)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
      clearTimeout(completeTimer)
    }
  }, [pathname])

  // Listen to link clicks for immediate feedback
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const link = target.closest("a")
      
      if (link && link.href) {
        try {
          const url = new URL(link.href)
          const currentUrl = new URL(window.location.href)
          
          // Only handle internal navigation
          if (url.origin === currentUrl.origin && url.pathname !== pathname) {
            setLoading(true)
            setProgress(10)
            
            // Clear any existing interval
            if (intervalRef.current) {
              clearInterval(intervalRef.current)
            }
            
            let currentProgress = 10
            intervalRef.current = setInterval(() => {
              if (currentProgress >= 90) {
                if (intervalRef.current) {
                  clearInterval(intervalRef.current)
                }
                return
              }
              const increment = Math.random() * 8 + 3
              currentProgress = Math.min(currentProgress + increment, 90)
              setProgress(currentProgress)
            }, 80)
          }
        } catch {
          // Invalid URL, ignore
        }
      }
    }

    document.addEventListener("click", handleClick, true)
    return () => document.removeEventListener("click", handleClick, true)
  }, [pathname])

  if (!loading) return null

  return (
    <div
      className={cn(
        "fixed top-14 left-0 right-0 z-[99] h-0.5 bg-transparent transition-opacity duration-200",
        loading ? "opacity-100" : "opacity-0"
      )}
      aria-hidden="true"
    >
      <div
        className="h-full bg-primary transition-all duration-150 ease-out shadow-lg shadow-primary/50"
        style={{
          width: `${progress}%`,
        }}
      />
    </div>
  )
}

export default TopLoadingBar

