import React from 'react'
import { Inter } from 'next/font/google'

import { Background } from '@/components/background'
import { NavBar } from '@/components/nav-bar'
import { cn } from '@/lib/utils'
import { Providers } from './providers'

import './globals.scss'

const inter = Inter({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-sans',
})

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return (
		<html>
			<body
				className={cn(
					'min-h-screen bg-background font-sans antialiased',
					inter.variable,
				)}
			>
				<Providers>
					<NavBar />
					{children}
					<div className="fixed top-0 -z-50 h-screen w-screen">
						<Background />
					</div>
				</Providers>
			</body>
		</html>
	)
}

export default Layout
