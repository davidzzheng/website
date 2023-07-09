"use client"

import { AnimatePresence, LazyMotion, domAnimation, m } from "framer-motion"

export default function Home() {
  return (
    <LazyMotion features={domAnimation}>
      <main className="container">
        <div className="my-[12.5%] flex justify-center">
          <div>
            <AnimatePresence>
              <m.p
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className=" text-[200px] font-bold leading-none"
              >
                Hello
              </m.p>
              <m.p
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="ml-40 animate-text-gradient bg-gradient-to-r from-blue-400 from-30% via-green-500 via-70% to-blue-400 bg-[length:200%] bg-clip-text text-[200px] font-bold leading-none text-transparent transition-[background-position]"
              >
                World
              </m.p>
            </AnimatePresence>
          </div>
        </div>
      </main>
    </LazyMotion>
  )
}
