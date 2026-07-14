import { useState, useEffect, useRef, useMemo, useCallback, useReducer } from "preact/hooks"
import { createElement as h, render } from "preact"
import { Fragment } from "preact"
import htm from "htm"

const html = htm.bind(h)

export default function Preview({ code }: { code: string }) {
  const [showSource, setShowSource] = useState(false)
  const [copied, setCopied] = useState(false)
  const [resetKey, setResetKey] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!containerRef.current) return

    try {
      // Wrap user code in a Preact component so hooks work
      const factory = new Function(
        "h", "html", "Fragment",
        "useState", "useEffect", "useRef", "useMemo", "useCallback", "useReducer",
        `"use strict";\n${code}`
      )

      const PreviewComponent = () => {
        const result = factory(
          h, html, Fragment,
          useState, useEffect, useRef, useMemo, useCallback, useReducer
        )
        return result
      }

      render(h(PreviewComponent, null), containerRef.current)
      setError(null)
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e))
    }

    return () => {
      if (containerRef.current) render(null, containerRef.current)
    }
  }, [code, resetKey])

  const copy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div style={{ margin: "24px 0", borderRadius: "8px", overflow: "hidden", border: "1px solid var(--color-border)" }}>
      {/* Live preview */}
      <div
        ref={containerRef}
        style={{
          padding: "24px", background: "rgba(255,255,255,0.02)",
          minHeight: "80px", display: "flex", alignItems: "center", justifyContent: "center",
        }}
      />
      {error && (
        <div style={{ padding: "8px 16px", background: "rgba(239,68,68,0.08)", fontFamily: "var(--font-mono)", fontSize: "12px", color: "#ef4444", borderTop: "1px solid var(--color-border)" }}>
          ✗ {error}
        </div>
      )}
      {/* Source toggle */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 12px", background: "rgba(255,255,255,0.03)", borderTop: "1px solid var(--color-border)" }}>
        <div style={{ display: "flex", gap: "12px" }}>
          <button
            onClick={() => setShowSource(!showSource)}
            style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: "var(--color-text-faint)", background: "none", border: "none", cursor: "pointer" }}
          >
            {showSource ? "− hide source" : "+ show source"}
          </button>
          <button
            onClick={() => setResetKey(k => k + 1)}
            style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: "var(--color-text-faint)", background: "none", border: "none", cursor: "pointer" }}
          >
            ↻ reset
          </button>
        </div>
        <button
          onClick={copy}
          style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: copied ? "var(--color-accent)" : "var(--color-text-faint)", background: "none", border: "none", cursor: "pointer" }}
        >
          {copied ? "✓ copied" : "copy"}
        </button>
      </div>
      {showSource && (
        <pre style={{ margin: 0, padding: "16px", background: "rgba(0,0,0,0.2)", overflowX: "auto", fontFamily: "var(--font-mono)", fontSize: "13px", lineHeight: 1.5, color: "var(--color-text-dim)", borderTop: "1px solid var(--color-border)" }}>
          <code>{code}</code>
        </pre>
      )}
    </div>
  )
}
