import type { VNode, ComponentChildren } from "preact"

export default function Steps({ children }: { children: ComponentChildren }) {
  const items = (Array.isArray(children) ? children : [children]).filter(Boolean) as VNode[]
  return (
    <div style={{ margin: "24px 0" }}>
      {items.map((item, i) => (
        <div key={i} style={{ display: "flex", gap: "16px", position: "relative" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
            <div style={{
              width: "28px", height: "28px", borderRadius: "50%",
              border: "2px solid var(--color-accent)", color: "var(--color-accent)",
              fontFamily: "var(--font-mono)", fontSize: "13px", fontWeight: 600,
              display: "flex", alignItems: "center", justifyContent: "center",
              background: "rgba(232,165,64,0.06)", flexShrink: 0, zIndex: 1,
            }}>
              {i + 1}
            </div>
            {i < items.length - 1 && (
              <div style={{ width: "2px", flex: 1, background: "var(--color-border)", marginTop: "4px", marginBottom: "4px" }} />
            )}
          </div>
          <div style={{ paddingBottom: i < items.length - 1 ? "32px" : 0, flex: 1 }}>
            {item}
          </div>
        </div>
      ))}
    </div>
  )
}
