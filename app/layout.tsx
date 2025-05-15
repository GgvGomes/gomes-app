import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Portfolio | FullStack Developer",
  description: "Personal portfolio showcasing my projects and skills as a FullStack Developer",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} font-sans bg-gradient-to-b from-[#050816] to-[#090325] text-white min-h-screen overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  )
}
