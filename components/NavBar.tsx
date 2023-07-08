import Link from 'next/link'
import React from 'react'

export default function NavBar() {
  return (
    <ul className="fixed left-0 flex flex-col items-center">
      <li className="text-2xl font-bold">
        <Link href="/">Link</Link>
      </li>
      <li className="text-2xl font-bold">Next.js</li>
      <li className="text-2xl font-bold">Next.js</li>
    </ul>
  )
}
