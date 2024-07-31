import React from 'react'
import { Metadata } from 'next'

import { HomeView } from '@/views/home'

export const metadata: Metadata = {
  title: 'Home',
}

export default async function HomePage() {
  return <HomeView />
}
