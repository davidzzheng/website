'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'

export const NavBar = () => {
	const path = usePathname()
	const initialIndex = (() => {
		switch (path.split('/')[1]) {
			case 'about':
				return 0
			case 'work':
				return 1
			case 'blog':
				return 2
			default:
				return null
		}
	})()
	const [activeTabIndex, setActiveTabIndex] = useState<number | null>(
		initialIndex,
	)
	const [tabUnderlineWidth, setTabUnderlineWidth] = useState(0)
	const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0)

	useEffect(() => {
		function setTabPosition() {
			const currentTab = tabsRef.current[activeTabIndex ?? -1]
			setTabUnderlineLeft(currentTab?.offsetLeft ?? 0)
			setTabUnderlineWidth(currentTab?.clientWidth ?? 0)
		}

		setTabPosition()
		window.addEventListener('resize', setTabPosition)

		return () => window.removeEventListener('resize', setTabPosition)
	}, [activeTabIndex])

	const tabsRef = useRef<Array<HTMLAnchorElement | null>>([])
	return (
		<div className="flex h-16 w-full items-center justify-between px-8">
			<div className="flex items-center">
				<Link href="/" className="text-foreground">
					<p className="text-lg text-white">dz</p>
				</Link>
			</div>
			<div className="relative my-4 w-fit">
				<ul className="flex space-x-4">
					{['about', 'work', 'blog'].map((tab, idx) => (
						<Link
							key={tab}
							ref={(el) => {
								tabsRef.current[idx] = el
							}}
							href={`/${tab}`}
							className="cursor-pointer px-4 pb-3 pt-2"
							onClick={() => setActiveTabIndex(idx)}
							role="listitem"
						>
							{tab}
						</Link>
					))}
				</ul>
				<span
					className="absolute bottom-0 block h-1 bg-primary transition-all duration-300"
					style={{ left: tabUnderlineLeft, width: tabUnderlineWidth }}
				/>
			</div>
			<div />
			{/* <div className="flex items-center gap-2"> */}
			{/* 	<Link href="/blog" className="text-white"> */}
			{/* 		Blog */}
			{/* 	</Link> */}
			{/* 	<Link href="/about" className="text-white"> */}
			{/* 		About */}
			{/* 	</Link> */}
			{/* </div> */}
		</div>
	)
}
