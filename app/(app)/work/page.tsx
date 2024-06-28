const TECHSTACK = [
	"TypeScript",
	"React",
	"Next.js",
	"TailwindCSS",
	"tRPC",
	"Cloudflare",
	"Bun",
	"Hono",
	"PostgreSQL",
	"NATS",
	"Python",
	"Rust",
];

export default function Work() {
	return (
		<div className="mx-auto flex max-w-[840px] flex-col gap-y-16">
			<div>
				<h2 className="mb-2 text-xl font-semibold">Current Tech Stack</h2>
				<ul className="flex gap-2">
					{TECHSTACK.map((skill) => (
						<li
							key={skill}
							className="rounded-sm bg-blue-700 px-1 py-0.5 text-sm"
						>
							{skill}
						</li>
					))}
				</ul>
			</div>

			<div>
				<h2 className="mb-2 text-xl font-semibold">Work Experience</h2>
				<ul className="space-y-8">
					<li className="space-y-2">
						<div className="flex items-center justify-between">
							<h3 className="text-lg">
								<a
									href="https://abnormalsecurity.com/"
									className="link"
									target="_blank"
								>
									Abnormal Security
								</a>
							</h3>
							<div className="text-sm">2022 - 2023</div>
						</div>
						<p className="text-sm">
							Abnormal Security is a cybersecurity company that uses artificial
							intelligence to detect and respond to cloud-based threats. At
							Abnormal I helped build the frontend for some of their newer
							products, with the main objective of being to transform the
							company from a strictly email security to a broader cloud security
							platform.
						</p>
						<ul className="flex gap-2">
							{[
								"TypeScript",
								"React",
								"Storybook",
								"Python",
								"Kafka",
								"OpenSearch",
							].map((skill) => (
								<li
									key={skill}
									className="rounded-sm bg-blue-700 px-1 py-0.5 text-sm"
								>
									{skill}
								</li>
							))}
						</ul>
					</li>
					<li className="space-y-2">
						<div className="flex items-center justify-between">
							<h3 className="flex items-baseline gap-x-2 text-lg">
								<a className="link" href="https://deliverr.com/">
									Deliverr
								</a>
								<div className="text-sm">(acquired by Shopify)</div>
							</h3>
							<div className="text-sm">2021 - 2022</div>
						</div>
						<p className="text-sm">
							Deliverr is a logistics company that helps e-commerce businesses
							fulfill orders faster by providing them with a network of
							warehouses across the United States. At Deliverr I worked across
							the tech stack, implementing frontend features that would help
							streamline our warehouse operations, as well as backend
							integrations with our last-mile carrier partners.
						</p>
						<ul className="flex gap-2">
							{["TypeScript", "React", "Express", "Storybook"].map((skill) => (
								<li
									key={skill}
									className="rounded-sm bg-blue-700 px-1 py-0.5 text-sm"
								>
									{skill}
								</li>
							))}
						</ul>
					</li>
					<li className="space-y-2">
						<div className="flex items-center justify-between">
							<h3 className="text-lg">
								<a
									href="https://www.workday.com/"
									className="link"
									target="_blank"
								>
									Workday
								</a>
							</h3>
							<div className="text-sm">2018 - 2021</div>
						</div>
						<p className="text-sm">
							Workday is a cloud-based financial management and human capital
							management software company used by large enterprises all over the
							world. At Workday I worked with a team that had gotten acquired to
							help build their{" "}
							<a
								href="https://www.workday.com/en-ca/products/talent-management/talent-optimization.html"
								target="_blank"
								className="link"
							>
								talent marketplace platform
							</a>{" "}
							within the Workday monolith. I also helped prove out the usage of
							JavaScript & React within our product pillar, paving the way for
							future projects to use modern web technologies instead of the
							XML-based service that powers the rest of Workday.
						</p>
						<ul className="flex gap-2">
							{["TypeScript", "Angular", "React", "Storybook"].map((skill) => (
								<li
									key={skill}
									className="rounded-sm bg-blue-700 px-1 py-0.5 text-sm"
								>
									{skill}
								</li>
							))}
						</ul>
					</li>
				</ul>
			</div>

			<div>
				<h2 className="mb-2 text-xl font-semibold">Projects</h2>
				<ul className="space-y-8">
					<li className="space-y-2">
						<div className="flex items-center justify-between">
							<h3 className="text-lg">
								<a
									// href="https://github.com/davidzzheng/website"
									// target="_blank"
									className="link cursor-default"
								>
									blockspace.
								</a>
							</h3>
							<div className="text-sm">2024</div>
						</div>

						<p className="text-sm">
							blockspace is an upcoming project that allows users to turn any
							weblink into a collectible. The platform takes any URL that has an
							OpenGraph preview and mints it as a state-compressed non-fungible
							token (NFT).
						</p>
						<ul className="flex gap-2">
							{["TypeScript", "Hono", "Cloudflare", "Arweave"].map((skill) => (
								<li
									key={skill}
									className="rounded-sm bg-blue-700 px-1 py-0.5 text-sm"
								>
									{skill}
								</li>
							))}
						</ul>
					</li>
					<li className="space-y-2">
						<div className="flex items-center justify-between">
							<h3 className="text-lg">
								<a
									href="https://github.com/davidzzheng/website"
									target="_blank"
									className="link"
								>
									Portfolio
								</a>
							</h3>
							<div className="text-sm">2024</div>
						</div>

						<p className="text-sm">
							A simple portfolio website built with the latest versions of
							Next.js and Tailwind CSS. This website will serve as a canvas for
							me to explore the newer web paradigms - notably the recently
							announced{" "}
							<a href="https://v0.dev/" target="_blank" className="link">
								React compiler
							</a>{" "}
							and AI-generated UIs with{" "}
							<a href="https://v0.dev/" target="_blank" className="link">
								v0
							</a>
							.
						</p>
						<ul className="flex gap-2">
							{[
								"TypeScript",
								"React",
								"TailwindCSS",
								"shadcn/ui",
								"Vercel",
							].map((skill) => (
								<li
									key={skill}
									className="rounded-sm bg-blue-700 px-1 py-0.5 text-sm"
								>
									{skill}
								</li>
							))}
						</ul>
					</li>
					<li className="space-y-2">
						<div className="flex items-center justify-between">
							<h3 className="text-lg">
								<a
									href="https://github.com/davidzzheng/tailwind-storybook"
									target="_blank"
									className="link"
								>
									Tailwind Storybook
								</a>
							</h3>
							<div className="text-sm">2021</div>
						</div>

						<p className="text-sm">
							A simple Storybook setup that proved out the usage of
							Tailwind&apos;s built-in design system within a Storybook
							environment, enabling rapid prototyping and development of React
							components with the full power of TailwindCSS.
						</p>
						<ul className="flex gap-2">
							{["TypeScript", "React", "TailwindCSS", "Storybook"].map(
								(skill) => (
									<li
										key={skill}
										className="rounded-sm bg-blue-700 px-1 py-0.5 text-sm"
									>
										{skill}
									</li>
								),
							)}
						</ul>
					</li>
					<li className="space-y-2">
						<div className="flex items-center justify-between">
							<h3 className="text-lg">
								<a
									href="https://assistlist.ca/"
									className="link"
									target="_blank"
								>
									AssistList
								</a>
							</h3>
							<div className="text-sm">2017 - 2018</div>
						</div>
						<p className="text-sm">
							AssistList is a non-profit organization based out of Vancouver,
							Canada that facilitates in the exchange and sale of second-hand
							medical equipment. Originally a Rails monolithic application,
							AssistList’s frontend was re-implemented as a React single page
							application to handle the increasingly complex user flows, as well
							as to adopt the modern standards in web development such as
							component-based architecture.
						</p>
						<ul className="flex gap-2">
							{["JavaScript", "React", "Semantic UI", "Ruby on Rails"].map(
								(skill) => (
									<li
										key={skill}
										className="rounded-sm bg-blue-700 px-1 py-0.5 text-sm"
									>
										{skill}
									</li>
								),
							)}
						</ul>
					</li>
					<li className="space-y-2">
						<div className="flex items-center justify-between">
							<h3 className="text-lg">
								<a
									href="https://penguinrobotics.ca/"
									className="link"
									target="_blank"
								>
									Penguin Robotics
								</a>
							</h3>
							<div className="text-sm">2014 - 2018</div>
						</div>
						<p className="text-sm">
							Penguin Robotics is a non-profit organization that runs local
							robotics competitions and workshops for high school students.
							Founded by graduating students from one of the top high school
							robotics program in the world, our goal is to to proliferate the
							knowledge and skills we had built up over the years to other
							students and ensure that our region remained competitive on the
							world stage.
						</p>
					</li>
					<li className="space-y-2">
						<div className="flex items-center justify-between">
							<h3 className="text-lg">
								<a
									href="https://www.facebook.com/GladstoneRobosavages/"
									className="link"
									target="_blank"
								>
									Gladstone Robosavages
								</a>
							</h3>
							<div className="text-sm">2013 - 2014</div>
						</div>
						<p className="text-sm">
							Gladstone Robosavages were a high school robotics team that
							competed in VEX Robotics competitions. Originally started as an
							electronics class, the program quickly grew into a world-class
							robotics program that has won numerous awards and accolades at the
							international level. During my time there, I lead a team to a
							world championship qualification spot as a first-time
							captain/driver. I also helped push forward software-oriented
							solutions that took advantage of the sensors available to us, and
							open-sourced our code for our underclassmen to learn from and
							build upon after we graduated.
						</p>
					</li>
				</ul>
			</div>
		</div>
	);
}
