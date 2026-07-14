import type { ComponentChildren } from "preact"

type CalloutType = "info" | "warning" | "tip" | "danger"

const colors: Record<CalloutType, { border: string; bg: string; label: string }> = {
  info: { border: "#5b8def", bg: "rgba(91,141,239,0.06)", label: "INFO" },
  warning: { border: "#e8a540", bg: "rgba(232,165,64,0.06)", label: "WARNING" },
  tip: { border: "#4ade80", bg: "rgba(74,222,128,0.06)", label: "TIP" },
  danger: { border: "#ef4444", bg: "rgba(239,68,68,0.06)", label: "DANGER" },
}

export default function Callout({
  type = "info",
  title,
  children,
}: {
  type?: CalloutType
  title?: string
  children: ComponentChildren
}) {
  const c = colors[type]
  return (
    <div style={{ borderLeft: `2px solid ${c.border}`, background: c.bg, padding: "16px 20px", borderRadius: "0 6px 6px 0", margin: "24px 0" }}>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.1em", color: c.border, marginBottom: title ? "6px" : 0, fontWeight: 600 }}>
        {title ?? c.label}
      </div>
      <div style={{ fontSize: "15px", lineHeight: 1.6, color: "var(--color-text-dim)" }}>
        {children}
      </div>
    </div>
  )
}
