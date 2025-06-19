'use client'

import { AnimatePresence, motion, type Transition } from 'motion/react'
import { createContext, type ReactNode, useContext, useEffect, useId, useState } from 'react'

import { cn } from '@/lib/utils'

type AnimatedBackgroundContextType = {
  activeId: string | null
  setActiveId: (id: string | null) => void
  uniqueId: string
  className?: string
  transition?: Transition
  enableHover: boolean
}

const AnimatedBackgroundContext = createContext<AnimatedBackgroundContextType | null>(null)

export function useAnimatedBackground() {
  const context = useContext(AnimatedBackgroundContext)
  if (!context) {
    throw new Error('useAnimatedBackground must be used within AnimatedBackground')
  }
  return context
}

export type AnimatedBackgroundProps = {
  children: ReactNode
  defaultValue?: string
  onValueChange?: (newActiveId: string | null) => void
  className?: string
  transition?: Transition
  enableHover?: boolean
}

export function AnimatedBackground({
  children,
  defaultValue,
  onValueChange,
  className,
  transition,
  enableHover = false,
}: AnimatedBackgroundProps) {
  const [activeId, setActiveId] = useState<string | null>(null)
  const uniqueId = useId()

  const handleSetActiveId = (id: string | null) => {
    setActiveId(id)

    if (onValueChange) {
      onValueChange(id)
    }
  }

  useEffect(() => {
    if (defaultValue !== undefined) {
      setActiveId(defaultValue)
    }
  }, [defaultValue])

  return (
    <AnimatedBackgroundContext.Provider
      value={{
        activeId,
        setActiveId: handleSetActiveId,
        uniqueId,
        className,
        transition,
        enableHover,
      }}
    >
      {children}
    </AnimatedBackgroundContext.Provider>
  )
}

export type AnimatedBackgroundItemProps = {
  id: string
  children: ReactNode
  className?: string
}

export function AnimatedBackgroundItem({ id, children, className }: AnimatedBackgroundItemProps) {
  const { activeId, setActiveId, uniqueId, className: bgClassName, transition, enableHover } = useAnimatedBackground()

  const interactionProps = enableHover
    ? {
        onMouseEnter: () => setActiveId(id),
        onMouseLeave: () => setActiveId(null),
      }
    : {
        onClick: () => setActiveId(id),
      }

  return (
    <div
      className={cn('-mx-3 relative inline-flex rounded-xl p-3', className)}
      data-checked={activeId === id ? 'true' : 'false'}
      {...interactionProps}
    >
      <AnimatePresence mode="wait">
        {activeId === id && (
          <motion.div
            layoutId={`background-${uniqueId}`}
            className={cn('absolute inset-0', bgClassName)}
            transition={{
              type: 'spring',
              bounce: 0.2,
              duration: 0.3,
              ...transition,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>
      <div className="z-10">{children}</div>
    </div>
  )
}
