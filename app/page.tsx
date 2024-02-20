"use client"

import { AnimatePresence, LazyMotion, domAnimation, m } from "framer-motion"
import { useSpring } from "react-spring"
import createGlobe from "cobe"
import { useRef, useEffect } from "react"

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>()
  const pointerInteracting = useRef(null)
  const pointerInteractionMovement = useRef(0)
  const [{ r }, api] = useSpring(() => ({
    r: 0,
    config: {
      mass: 1,
      tension: 280,
      friction: 40,
      precision: 0.001,
    },
  }))

  useEffect(() => {
    let phi = 0
    let width = 0
    let globe
    const onResize = () =>
      canvasRef.current && (width = canvasRef.current.offsetWidth)
    window.addEventListener("resize", onResize)
    onResize()
    if (canvasRef.current) {
      globe = createGlobe(canvasRef?.current, {
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
          if (!pointerInteracting.current) {
            // Called on every animation frame.
            // `state` will be an empty object, return updated params.
            phi += 0.0025
          }
          state.phi = phi + r.get()
          state.width = width * 2
          state.height = width * 2
        },
      })
    }

    setTimeout(() => {
      if (canvasRef.current) {
        canvasRef.current.style.opacity = "1"
      }
    })
    return () => {
      globe?.destroy()
      window.removeEventListener("resize", onResize)
    }
  }, [])

  return (
    <>
      <div className="overflow-none absolute top-0 h-screen w-screen">
        <canvas
          ref={canvasRef}
          onPointerDown={(e) => {
            pointerInteracting.current =
              e.clientX - pointerInteractionMovement.current
            canvasRef.current.style.cursor = "grabbing"
          }}
          onPointerUp={() => {
            pointerInteracting.current = null
            canvasRef.current.style.cursor = "grab"
          }}
          onPointerOut={() => {
            pointerInteracting.current = null
            canvasRef.current.style.cursor = "grab"
          }}
          onMouseMove={(e) => {
            if (pointerInteracting.current !== null) {
              const delta = e.clientX - pointerInteracting.current
              pointerInteractionMovement.current = delta
              api.start({
                r: delta / 200,
              })
            }
          }}
          onTouchMove={(e) => {
            if (pointerInteracting.current !== null && e.touches[0]) {
              const delta = e.touches[0].clientX - pointerInteracting.current
              pointerInteractionMovement.current = delta
              api.start({
                r: delta / 100,
              })
            }
          }}
          className="mx-auto mt-48 h-full max-h-[640px] w-full max-w-[640px] cursor-grab opacity-0 transition-opacity duration-1000 ease-in-out"
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
                className="w-fit text-6xl font-bold leading-none"
              >
                Hello
              </m.p>
              <m.p
                initial={{ opacity: 0, x: 120 }}
                animate={{ opacity: 1, x: 80 }}
                transition={{ duration: 0.75, delay: 0.75, type: "spring" }}
                key="world"
                className="animate-text-gradient direction-reverse w-fit bg-gradient-to-r from-blue-400 from-30% via-green-500 via-70% to-blue-400 bg-[length:200%] bg-clip-text text-6xl font-bold leading-none text-transparent transition-[background-position]"
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
