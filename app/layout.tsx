import Header from "@/components/header"
import Nav from "@/components/nav"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata: Metadata = {
  title: "David Zheng - Personal Website",
  description: "A website to display my projects and blog posts.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} relative bg-black font-sans text-white`}
      >
        <Header />
        <Nav />
        <main className="absolute top-0 h-screen w-screen pt-72 overflow-hidden">
          {children}
        </main>
      </body>
    </html>
  )
}
