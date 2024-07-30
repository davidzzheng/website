import { usePathname, useSearchParams } from 'next/navigation'
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from './ui/breadcrumb'
import Link from 'next/link'
import React from 'react'

type BreadcrumbsProps = {
	homeLabel?: string;
	homeHref?: string;
};

export const Breadcrumbs = ({
	homeLabel = 'Home',
	homeHref = '/',
}: BreadcrumbsProps) => {
	const pathname = usePathname()
	const searchParams = useSearchParams()
	const segments = pathname.split('/').filter(Boolean)

	const breadcrumbs = React.useMemo(() => {
		const crumbs = [{ label: homeLabel, href: homeHref }]

		segments.forEach((segment, index) => {
			const href = `/${segments.slice(0, index + 1).join('/')}`
			let label = segment

			// Check if the segment is a dynamic route parameter
			if (segment.startsWith('[') && segment.endsWith(']')) {
				const paramName = segment.slice(1, -1)
				const paramValue = searchParams.get(paramName)
				label = paramValue || segment
			}

			crumbs.push({ label, href })
		})

		return crumbs
	}, [segments, searchParams, homeLabel, homeHref])

	return (
		<Breadcrumb>
			<BreadcrumbList>
				{breadcrumbs.map((crumb, index) => (
					<React.Fragment key={crumb.href}>
						{index > 0 && <BreadcrumbSeparator />}
						<BreadcrumbItem>
							{index === breadcrumbs.length - 1 ? (
								<BreadcrumbPage>{crumb.label}</BreadcrumbPage>
							) : (
								<BreadcrumbLink asChild>
									<Link href={crumb.href}>{crumb.label}</Link>
								</BreadcrumbLink>
							)}
						</BreadcrumbItem>
					</React.Fragment>
				))}
			</BreadcrumbList>
		</Breadcrumb>
	)
}
