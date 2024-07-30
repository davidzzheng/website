import Link from 'next/link'

export const NavBar = () => {
	return (
		<div className="flex h-16 w-full items-center justify-between px-8">
			<div className="flex items-center">
				<Link href="/" className="text-foreground">
					<p className="text-lg text-white">dz</p>
				</Link>
			</div>
			<div className="flex items-center gap-2">
				<Link href="/blog" className="text-white">
					Blog
				</Link>
				<Link href="/about" className="text-white">
					About
				</Link>
			</div>
		</div>
	)
}
