'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltip'

type ClipboardProps = {
  value: string
  children: React.ReactNode
  className?: string
}

export const Clipboard = ({ value, children, className }: ClipboardProps) => {
  const [isCopied, setIsCopied] = React.useState(false)

  return (
    <TooltipProvider>
      <Tooltip delayDuration={250}>
        <TooltipTrigger asChild>
          <button
            className={cn('transiton hover:opacity-75', className)}
            onClick={(e) => {
              e.preventDefault()
              navigator.clipboard.writeText(value)
              setIsCopied(true)
              setTimeout(() => {
                setIsCopied(false)
              }, 3000)
            }}
          >
            {children}
          </button>
        </TooltipTrigger>
        <TooltipContent onPointerDownOutside={(e) => e.preventDefault()}>
          {isCopied ? 'Copied!' : 'Click to copy'}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
