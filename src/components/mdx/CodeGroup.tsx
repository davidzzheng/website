import { useState } from "preact/hooks"
import type { VNode, ComponentChildren } from "preact"

export default function CodeGroup({ children }: { children: ComponentChildren }) {
  const items = (Array.isArray(children) ? children : [children]).filter(Boolean) as VNode<{ "data-label"?: string; label?: string; className?: string }>[]
  const [active, setActive] = useState(0)

  const labels = items.map((item, i) => {
    const props = item.props ?? {}
    return (
      props["data-label"] ||
      props.label ||
      props.className?.match?.(/language-(\w+)/)?.[1] ||
      `Tab ${i + 1}`
    )
  })

  return (
    <div style={{ margin: "24px 0" }}>
      <div style={{ display: "flex", gap: "2px", borderBottom: "1px solid var(--color-border)", marginBottom: "-1px" }}>
        {labels.map((label: string, i: number) => (
          <button
            onClick={() => setActive(i)}
            style={{
              padding: "8px 16px", fontSize: "12px", fontFamily: "var(--font-mono)",
              color: active === i ? "var(--color-accent)" : "var(--color-text-faint)",
              background: "none", border: "none", cursor: "pointer",
              borderBottom: active === i ? "2px solid var(--color-accent)" : "2px solid transparent",
              transition: "color 150ms",
            }}
          >
            {label}
          </button>
        ))}
      </div>
      <div>{items[active]}</div>
    </div>
  )
}
