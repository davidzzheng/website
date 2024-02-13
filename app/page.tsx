"use client"

import { AnimatePresence, LazyMotion, domAnimation, m } from "framer-motion"
import createGlobe from "cobe"
import { useRef, useEffect } from "react"
export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>()
  const globeState = useRef({ phi: 0, theta: 0 })
  const focusRef = useRef([0, 0])

  useEffect(() => {
    let width = 0
    const onResize = () =>
      canvasRef.current && (width = canvasRef.current.offsetWidth)
    window.addEventListener("resize", onResize)
    onResize()
    const globe = createGlobe(canvasRef.current!, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.3,
      dark: 1,
      diffuse: 3,
      mapSamples: 12000,
      mapBrightness: 1.2,
      baseColor: [1, 1, 1],
      markerColor: [0 / 255, 30 / 255, 120 / 255],
      glowColor: [1.2, 1.2, 1.2],
      markers: [
        { location: [49.246292, -123.116226], size: 0.05 },
        // { location: [114.177216, 22.302711], size: 0.05 },
        // { location: [-118.243683, 34.052235], size: 0.05 },
        // { location: [-104.991531, 39.742043], size: 0.05 },
        // { location: [103.851959, 1.290270], size: 0.05 },
        // { location: [-74.0060, 40.7128], size: 0.05 }
      ],
      onRender: (state) => {
        const { current } = globeState

        const [focusPhi, focusTheta] = focusRef.current

        if (focusPhi > 0) {
          const doublePi = Math.PI * 2
          const distPositive = (focusPhi - current.phi + doublePi) % doublePi
          const distNegative = (current.phi - focusPhi + doublePi) % doublePi
          // Control the speed
          if (distPositive < distNegative) {
            current.phi += distPositive * 0.08
          } else {
            current.phi -= distNegative * 0.08
          }
          current.theta = current.theta * 0.92 + focusTheta * 0.08
        }

        current.phi += 0.0025

        state.phi = current.phi
        state.width = width * 2
        state.height = width * 2
      },
    })
    setTimeout(() => {
      if (canvasRef.current) {
        canvasRef.current.style.opacity = "1"
      }
    })
    return () => {
      globe.destroy()
      window.removeEventListener("resize", onResize)
    }
  }, [])

  const locationToAngles = (lat: number, long: number) => {
    return [
      Math.PI - ((long * Math.PI) / 180 - Math.PI / 2),
      (lat * Math.PI) / 180,
    ]
  }

  const focusOnHome = () => {
    focusRef.current = locationToAngles(49.246292, -123.116226)
  }

  const resetFocus = () => {
    focusRef.current = [0, 0.3]
  }

  const toggleFocus = () => {
    if (focusRef.current[0] === 0) {
      focusOnHome()
    } else {
      resetFocus()
    }
  }

  return (
    <>
      <div className="absolute top-0 w-full">
        <canvas
          className="mx-auto"
          ref={canvasRef}
          style={{
            width: 1200,
            height: 1200,
            maxWidth: "100%",
            aspectRatio: 1,
          }}
        />
      </div>
      <LazyMotion features={domAnimation}>
        <div className="container relative mt-[10vh] flex justify-center">
          <div>
            <AnimatePresence>
              <m.p
                initial={{ opacity: 0, x: -120 }}
                animate={{ opacity: 1, x: -80 }}
                transition={{ duration: 0.75, delay: 0.5, type: "spring" }}
                key="hello"
                className="w-fit cursor-pointer text-[20ch] font-bold leading-none"
                onClick={toggleFocus}
              >
                Hello
              </m.p>
              <m.p
                initial={{ opacity: 0, x: 120 }}
                animate={{ opacity: 1, x: 80 }}
                transition={{ duration: 0.75, delay: 0.75, type: "spring" }}
                key="world"
                className="animate-text-gradient direction-reverse w-fit cursor-pointer bg-gradient-to-r from-blue-400 from-30% via-green-500 via-70% to-blue-400 bg-[length:200%] bg-clip-text text-[20ch] font-bold leading-none text-transparent transition-[background-position]"
                onClick={toggleFocus}
              >
                World
              </m.p>
            </AnimatePresence>
          </div>
        </div>
      </LazyMotion>
    </>
  )
}
