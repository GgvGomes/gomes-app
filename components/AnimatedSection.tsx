"use client"

import type React from "react"

import { useEffect, useRef } from "react"

interface AnimatedSectionProps {
  children: React.ReactNode
  id: string
}

const AnimatedSection = ({ children, id }: AnimatedSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // If section is intersecting (visible)
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in")
          entry.target.classList.remove("opacity-0")

          // Add content animations
          const animatableElements = entry.target.querySelectorAll(".animate-on-scroll")
          animatableElements.forEach((el, index) => {
            setTimeout(
              () => {
                el.classList.add("animate-slide-up")
                el.classList.remove("translate-y-10", "opacity-0")
              },
              100 * (index + 1),
            ) // Stagger the animations
          })

          // Stop observing after animation
          observer.unobserve(entry.target)
        }
      },
      {
        threshold: 0.2, // Trigger when 20% of the element is visible
        rootMargin: "0px 0px -100px 0px", // Slightly before element enters viewport
      },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <section id={id} ref={sectionRef} className="opacity-0 relative transition-all duration-700 ease-out">
      {children}
    </section>
  )
}

export default AnimatedSection
