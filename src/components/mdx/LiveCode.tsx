import { useState, useEffect, useRef } from "preact/hooks"
import { transform } from "sucrase"

export default function LiveCode({
  code,
  language = "js",
}: {
  code: string
  language?: "js" | "ts"
}) {
  const instanceId = useRef(Math.random().toString(36).slice(2)).current
  const [output, setOutput] = useState<{ type: "log" | "error" | "warn"; text: string }[]>([])
  const [running, setRunning] = useState(false)

  useEffect(() => {
    const handler = (e: MessageEvent) => {
      if (e.data?.__livecode && e.data.__id === instanceId) {
        setOutput((prev) => [...prev, e.data.__livecode])
      }
    }
    window.addEventListener("message", handler)
    return () => window.removeEventListener("message", handler)
  }, [instanceId])

  const run = () => {
    setOutput([])
    let jsCode = code
    if (language === "ts") {
      jsCode = transform(code, { transforms: ["typescript"] }).code
    }

    const escapeForTemplate = (s: string) => s.replace(/<\/script>/gi, "<\\/script>")

    const html = `<!DOCTYPE html><html><body><script>
      (function() {
        function send(type, args) {
          parent.postMessage({ __livecode: { type: type, text: args.map(function(a) {
            try { return typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a); }
            catch(e) { return String(a); }
          }).join(' ') }, __id: '${instanceId}' }, '*');
        }
        console.log = function() { send('log', Array.prototype.slice.call(arguments)); };
        console.error = function() { send('error', Array.prototype.slice.call(arguments)); };
        console.warn = function() { send('warn', Array.prototype.slice.call(arguments)); };
        window.onerror = function(msg, src, line, col, err) {
          send('error', [err ? err.message : msg]);
        };
        try {
          ${escapeForTemplate(jsCode)}
        } catch(e) {
          send('error', [e.message]);
        }
      })();
      <\/script></body></html>`

    const iframe = document.createElement("iframe")
    iframe.sandbox.add("allow-scripts")
    iframe.style.display = "none"
    iframe.srcdoc = html
    iframe.onload = () => {
      setRunning(false)
      setTimeout(() => iframe.remove(), 1000)
    }
    document.body.appendChild(iframe)
  }

  const colorMap = { log: "#4ade80", error: "#ef4444", warn: "#e8a540" }

  return (
    <div style={{ margin: "24px 0", borderRadius: "8px", overflow: "hidden", border: "1px solid var(--color-border)" }}>
      <pre style={{ margin: 0, padding: "16px 20px", background: "rgba(0,0,0,0.35)", overflowX: "auto", fontFamily: "var(--font-mono)", fontSize: "13px", lineHeight: 1.5, color: "var(--color-text)" }}>
        <code>{code}</code>
      </pre>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 16px", background: "rgba(255,255,255,0.02)", borderTop: "1px solid var(--color-border)" }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--color-text-faint)", letterSpacing: "0.05em" }}>
          {language.toUpperCase()}
        </span>
        <button
          onClick={run}
          disabled={running}
          style={{
            padding: "4px 12px", fontSize: "12px", fontFamily: "var(--font-mono)",
            color: "var(--color-accent)", background: "rgba(232,165,64,0.08)",
            border: "1px solid rgba(232,165,64,0.2)", borderRadius: "4px",
            cursor: running ? "default" : "pointer", opacity: running ? 0.5 : 1,
          }}
        >
          {running ? "running…" : "▶ run"}
        </button>
      </div>
      {output.length > 0 && (
        <div style={{ padding: "12px 16px", background: "rgba(0,0,0,0.3)", borderTop: "1px solid var(--color-border)", fontFamily: "var(--font-mono)", fontSize: "13px", lineHeight: 1.6, maxHeight: "300px", overflowY: "auto" }}>
          {output.map((line, i) => (
            <div key={i} style={{ color: colorMap[line.type] }}>
              {line.type === "error" ? "✗ " : line.type === "warn" ? "⚠ " : "› "}
              {line.text}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
