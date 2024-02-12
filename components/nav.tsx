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

const routes = [
  {
    name: "Home",
    path: "/",
    icon: <HomeIcon aria-label="Home" />,
  },
  {
    name: "About",
    path: "/about",
    icon: <UserIcon aria-label="About" />,
  },
  {
    name: "Work",
    path: "/work",
    icon: <CodeIcon aria-label="Work" />,
  },
  {
    name: "Notes",
    path: "/notes",
    icon: <BookIcon aria-label="Notes" />,
  },
  // {
  //   name: "Photos",
  //   path: "/photos",
  //   icon: <ApertureIcon aria-label="Photos" />,
  // },
  // {
  //   name: "Contact",
  //   path: "/contact",
  //   icon: <MailIcon aria-label="Contact" />,
  // },
]

export default function Nav() {
  const pathname = usePathname()

  return (
    <LazyMotion features={domAnimation}>
      <nav className="absolute left-0 z-10 ml-4 flex min-h-screen flex-col items-center justify-center">
        <AnimatePresence>
          <m.ul
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex list-none flex-col gap-y-4 text-center"
          >
            <TooltipProvider>
              {routes.map((route) => (
                <li key={route.name}>
                  <Tooltip delayDuration={0}>
                    <TooltipTrigger>
                      <Button
                        asChild
                        variant={
                          pathname === route.path ? "secondary" : "ghost"
                        }
                        size="icon"
                      >
                        <Link href={route.path}>{route.icon}</Link>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>{route.name}</p>
                    </TooltipContent>
                  </Tooltip>
                </li>
              ))}
            </TooltipProvider>
          </m.ul>
        </AnimatePresence>
      </nav>
    </LazyMotion>
  )
}
