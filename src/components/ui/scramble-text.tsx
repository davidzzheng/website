'use client'

import { type ElementType, useEffect, useRef, useState } from 'react'

import { cn } from '@/lib/utils'

type ScrambleTextProps = {
  text: string
  as?: ElementType
  trigger?: boolean
  delay?: number
  duration?: number
  className?: string
}

export default function ScrambleText({
  text,
  as = 'span',
  className,
  trigger = true,
  delay = 0,
  duration = 750,
}: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState('')
  const [isAnimating, setIsAnimating] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout>(null)

  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?'

  useEffect(() => {
    if (trigger && !isAnimating) {
      timeoutRef.current = setTimeout(() => {
        startScramble()
      }, delay)
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [trigger, delay])

  const startScramble = () => {
    setIsAnimating(true)
    const startTime = Date.now()
    const totalDuration = duration

    const settleTimesMs = text.split('').map(() => Math.random() * totalDuration)

    const animate = () => {
      const elapsed = Date.now() - startTime

      if (elapsed >= totalDuration) {
        setDisplayText(text)
        setIsAnimating(false)
        return
      }

      setDisplayText(
        text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' '

            if (elapsed >= settleTimesMs[index]) {
              return text[index]
            }

            return characters[Math.floor(Math.random() * characters.length)]
          })
          .join(''),
      )

      requestAnimationFrame(animate)
    }

    animate()
  }

  const Component = as

  return <Component className={cn('inline-block', className)}>{displayText || (trigger ? '' : text)}</Component>
}
