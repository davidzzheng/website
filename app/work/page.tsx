const TECHSTACK = [
  "TypeScript",
  "React",
  "Next.js",
  "TailwindCSS",
  "Cloudflare",
  "Bun",
  "Hono",
  "SQLite",
  "Redis",
  "Python",
  "Rust",
  "Perplexity AI",
]

export default function Work() {
  return (
    <main className="">
      <div className="mx-auto flex max-w-[840px] flex-col gap-y-4">
        <div className="mb-8">
          <h2 className="text-3xl font-semibold mb-2">Current Tech Stack</h2>
          <ul className="flex gap-2">
            {TECHSTACK.map(skill => (
              <li key={skill} className="text-sm py-0.5 px-1 bg-blue-700 rounded-sm">{skill}</li>
            ))}
          </ul>
        </div>

        <h2 className="text-3xl">Work History</h2>
        <ul className="space-y-8">
          <li className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl"><a href="https://abnormalsecurity.com/" className="link" target="_blank">Abnormal Security</a></h3>
              <div className="text-sm">2022 - 2023</div>
            </div>
            <p className="text-base">
              Abnormal Security is a cybersecurity company that uses artificial intelligence to detect and respond to cloud-based threats.
              At Abnormal I helped build the frontend for some of their newer products, with the main objective of being to transform the company from a strictly email security to a broader cloud security platform.
            </p>
          </li>
          <li className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="flex items-baseline gap-x-2 text-2xl">
                <a className="link" href="https://deliverr.com/">Deliverr</a>
                <div className="text-sm">(acquired by Shopify)</div>
              </h3>
              <div className="text-sm">2021 - 2022</div>
            </div>
            <p className="text-base">
              Deliverr is a logistics company that helps e-commerce businesses fulfill orders faster.
              I worked on the team that built the Deliverr API, which allows businesses to integrate with Deliverr&apos;s fulfillment network.
            </p>
          </li>
          <li className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl"><a href="https://www.workday.com/" className="link" target="_blank">Workday</a></h3>
              <div className="text-sm">2018 - 2021</div>
            </div>
            <p className="text-base">
              Workday is a cloud-based financial management and human capital management software company used by large enterprises all over the world.
              At Workday I worked with a team that had gotten acquired to help build their talent marketplace platform within the Workday monolith. I also helped
              prove out the usage of JavaScript & React within our product pillar, paving the way for future projects to use modern web technologies
              instead of the XML-based service that powers the rest of Workday.
            </p>
          </li>
          <li className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl"><a href="https://assistlist.ca/" className="link" target="_blank">AssistList</a></h3>
              <div className="text-sm">2017 - 2018</div>
            </div>
            <p className="text-base">
              AssistList is a non-profit organization based out of Vancouver, Canada that facilitates in the exchange and sale of second-hand medical equipment.
              Originally a Rails monolithic application, AssistList’s frontend was re-implemented as a React single page application
              to handle the increasingly complex user flows, as well as to adopt the modern standards in web development such as component-based architecture.
            </p>
          </li>
          <li className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl"><a href="https://penguinrobotics.ca/" className="link" target="_blank">Penguin Robotics</a></h3>
              <div className="text-sm">2014 - 2018</div>
            </div>
            <p className="text-base">
              Penguin Robotics is a non-profit organization that runs local robotics competitions and workshops for high school students.
              Founded by graduating students from one of the top high school robotics program in the world, our goal is to to proliferate the knowledge and skills
              we had built up over the years to other students and ensure that our region remained competitive on the world stage.
            </p>
          </li>
        </ul>
      </div>
    </main>
  )
}
