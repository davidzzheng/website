import Nav from "@/components/nav"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Header from "@/components/header"
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
      <body className={`${inter.variable} bg-neutral-950 font-sans text-white`}>
        <Nav />
        <Header />
        {children}
      </body>
    </html>
  )
}
