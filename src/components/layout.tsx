import { ReactNode } from 'react'

import { cn } from '@/lib/utils'

export const Layout = ({ children }: { children: ReactNode }) => {
	return (
		<div className="container px-2">
			<div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-4 px-1 sm:grid-cols-12">
				{children}
			</div>
		</div>
	)
}

const LayoutTop = ({
	children,
	className,
}: { children: ReactNode; className?: string }) => (
	<section
		className={cn(
			'sm:col-start-1 md:col-start-3 sm:col-span-9 md:col-span-8',
			className,
		)}
	>
		{children}
	</section>
)

const LayoutLeft = ({
	children,
	className,
}: { children: ReactNode; className?: string }) => (
	<section className={cn('hidden sm:col-span-3 md:col-span-2', className)}>
		{children}
	</section>
)

const LayoutRight = ({
	children,
	className,
}: { children: ReactNode; className?: string }) => (
	<section
		className={cn(
			'sm:col-start-10 sm:col-span-3 md:col-start-11 md:col-span-2',
			className,
		)}
	>
		{children}
	</section>
)

const LayoutMain = ({
	children,
	className,
}: { children: ReactNode; className?: string }) => (
	<section
		className={cn(
			'sm:col-start-1 md:col-start-3 sm:col-span-9 md:col-span-8',
			'row-start-2',
			className,
		)}
	>
		{children}
	</section>
)

Layout.Top = LayoutTop
Layout.Left = LayoutLeft
Layout.Right = LayoutRight
Layout.Main = LayoutMain
