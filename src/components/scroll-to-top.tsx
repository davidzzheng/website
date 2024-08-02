'use client'

import { ArrowUp } from 'lucide-react'

import { Button } from './ui/button'

export const ScrollToTop = () => (
  <Button variant="secondary" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
    <ArrowUp className="mr-2 size-4" />
    Back to top
  </Button>
)
