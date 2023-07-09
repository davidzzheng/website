"use client"

import Link from "next/link"
import { AnimatePresence, LazyMotion, domAnimation, m } from "framer-motion"
import { Button } from "./ui/button"
import {
  ApertureIcon,
  BookIcon,
  CodeIcon,
  HomeIcon,
  MailIcon,
  UserIcon,
} from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip"
import { usePathname } from "next/navigation"

export default function Nav() {
  const pathname = usePathname()

  return (
    <LazyMotion features={domAnimation}>
      <nav className="fixed left-0 ml-4 flex min-h-screen flex-col items-center justify-center">
        <AnimatePresence>
          <m.ul
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex list-none flex-col gap-y-4 text-center"
          >
            <TooltipProvider>
              <li>
                <Tooltip delayDuration={0}>
                  <TooltipTrigger>
                    <Button
                      asChild
                      variant={pathname === "/" ? "secondary" : "ghost"}
                      size="icon"
                    >
                      <Link href="/">
                        <HomeIcon aria-label="Home" size={24} />
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>Home</p>
                  </TooltipContent>
                </Tooltip>
              </li>
              <li>
                <Tooltip delayDuration={0}>
                  <TooltipTrigger>
                    <Button
                      asChild
                      variant={pathname === "/about" ? "secondary" : "ghost"}
                      size="icon"
                    >
                      <Link href="/about">
                        <UserIcon aria-label="About" size={24} />
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>About</p>
                  </TooltipContent>
                </Tooltip>
              </li>
              <li>
                <Tooltip delayDuration={0}>
                  <TooltipTrigger>
                    <Button
                      asChild
                      variant={pathname === "/work" ? "secondary" : "ghost"}
                      size="icon"
                    >
                      <Link href="/work">
                        <CodeIcon aria-label="Work" size={24} />
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p id="nav-work">Work</p>
                  </TooltipContent>
                </Tooltip>
              </li>
              <li>
                <Tooltip delayDuration={0}>
                  <TooltipTrigger>
                    <Button
                      asChild
                      variant={pathname === "/notes" ? "secondary" : "ghost"}
                      size="icon"
                    >
                      <Link href="/notes">
                        <BookIcon aria-label="Notes" size={24} />
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p id="nav-notes">Notes</p>
                  </TooltipContent>
                </Tooltip>
              </li>
              <li>
                <Tooltip delayDuration={0}>
                  <TooltipTrigger>
                    <Button
                      asChild
                      variant={pathname === "/photos" ? "secondary" : "ghost"}
                      size="icon"
                    >
                      <Link href="/photos">
                        <ApertureIcon aria-label="Photos" size={24} />
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p id="nav-photos">Photos</p>
                  </TooltipContent>
                </Tooltip>
              </li>
              <li>
                <Tooltip delayDuration={0}>
                  <TooltipTrigger>
                    <Button
                      asChild
                      variant={pathname === "/contact" ? "secondary" : "ghost"}
                      size="icon"
                    >
                      <Link href="/contact">
                        <MailIcon aria-label="Contact" size={24} />
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p id="nav-contact">Contact</p>
                  </TooltipContent>
                </Tooltip>
              </li>
            </TooltipProvider>
          </m.ul>
        </AnimatePresence>
      </nav>
    </LazyMotion>
  )
}
