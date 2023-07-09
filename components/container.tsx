export default function Container(props: { children: React.ReactNode }) {
  return (
    <main className="container min-h-[calc(100vh_-_14rem)] w-full rounded-xl border border-neutral-900 bg-neutral-800 p-4">
      {props.children}
    </main>
  )
}
