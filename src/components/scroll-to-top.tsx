'use client'

import { ArrowUp } from 'lucide-react'

import { Button, ButtonProps } from './ui/button'

export const ScrollToTop = (props: ButtonProps) => (
  <Button
    variant="secondary"
    {...props}
    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
  >
    <ArrowUp className="mr-2 size-4" />
    Back to top
  </Button>
)
