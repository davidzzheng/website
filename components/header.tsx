"use client"

import { AnimatePresence, LazyMotion, domAnimation, m } from "framer-motion"
import { usePathname } from "next/navigation"

export default function Header() {
  const pathname = usePathname()

  const headerText =
    pathname === "/" ? "home" : (pathname?.split("/").pop() as string)

  return (
    <LazyMotion features={domAnimation}>
      <div className="absolute left-0 top-0 w-full">
        <AnimatePresence mode="popLayout">
          <m.h1 key={pathname} aria-live="polite" className="p-12">
            {headerText.split("").map((letter, index) => (
              <m.span
                key={index}
                initial={{ opacity: 0, x: 150 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ delay: index * 0.01 }}
                className="inline-block text-4xl font-semibold"
              >
                {index === 0 ? letter.toUpperCase() : letter}
              </m.span>
            ))}
          </m.h1>
        </AnimatePresence>
      </div>
    </LazyMotion>
  )
}
