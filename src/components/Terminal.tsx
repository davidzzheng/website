import { useState, useEffect, useRef } from "preact/hooks"

type Line = { type: "input" | "output" | "error" | "system"; text: string }

const BANNER = [
  "  ___  _   _  ___  ___ ___ ___ ",
  " / _ \\| | | |/ _ \\/ __/ __/ __|",
  "| (_) | |_| | (_) \\__ \\__ \\__ \\",
  " \\___/ \\___/ \\___/|___/___/___/",
  "",
  "Type 'help' for available commands.",
]

const COMMANDS: Record<string, string[]> = {
  help: [
    "Available commands:",
    "  about       — who I am",
    "  social      — social links",
    "  email       — email address",
    "  ls          — list pages",
    "  cat <page>  — open a page",
    "  clear       — clear terminal",
    "  whoami      — identity check",
  ],
  about: [
    "Software engineer in Vancouver.",
    "I build web apps and get way too deep into the details.",
    "Sometimes I write about it.",
  ],
  social: [
    "github   → github.com/davidzzheng",
    "linkedin → linkedin.com/in/davidzzheng",
  ],
  email: ["david@davidzheng.me"],
  whoami: ["david zheng"],
}

const PAGES: Record<string, string> = {
  home: "/",
  work: "/work",
  writing: "/posts",
  posts: "/posts",
  contact: "/contact",
  tags: "/tags",
  rss: "/rss.xml",
}

export default function Terminal() {
  const [lines, setLines] = useState<Line[]>([{ type: "system", text: BANNER.join("\n") }])
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<string[]>([])
  const [historyIdx, setHistoryIdx] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight })
  }, [lines])

  const run = (raw: string) => {
    const cmd = raw.trim().toLowerCase()
    const newLines: Line[] = [{ type: "input", text: raw }]

    if (!cmd) {
      // empty — just show prompt
    } else if (cmd === "clear") {
      setLines([])
      return
    } else if (cmd === "ls") {
      newLines.push({ type: "output", text: Object.keys(PAGES).join("  ") })
    } else if (cmd.startsWith("cat ")) {
      const page = cmd.slice(4).trim()
      if (PAGES[page]) {
        newLines.push({ type: "output", text: `→ opening ${page}...` })
        setTimeout(() => { window.location.href = PAGES[page] }, 500)
      } else {
        newLines.push({ type: "error", text: `cat: ${page}: No such page` })
      }
    } else if (COMMANDS[cmd]) {
      newLines.push({ type: "output", text: COMMANDS[cmd].join("\n") })
    } else {
      newLines.push({ type: "error", text: `command not found: ${cmd}. Type 'help' for commands.` })
    }

    setLines((prev) => [...prev, ...newLines])
    setHistory((prev) => [...prev, raw])
    setHistoryIdx(-1)
  }

  const handleKey = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      run(input)
      setInput("")
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      if (history.length === 0) return
      const idx = historyIdx === -1 ? history.length - 1 : Math.max(0, historyIdx - 1)
      setHistoryIdx(idx)
      setInput(history[idx])
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      if (historyIdx === -1) return
      const idx = historyIdx + 1
      if (idx >= history.length) { setHistoryIdx(-1); setInput("") }
      else { setHistoryIdx(idx); setInput(history[idx]) }
    }
  }

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      style={{
        margin: "24px 0", borderRadius: "10px", overflow: "hidden",
        border: "1px solid var(--color-border)", background: "rgba(0,0,0,0.5)",
      }}
    >
      {/* Title bar */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "8px 14px", background: "rgba(255,255,255,0.04)", borderBottom: "1px solid var(--color-border)" }}>
        <div style={{ display: "flex", gap: "6px" }}>
          <span style={{ width: "11px", height: "11px", borderRadius: "50%", background: "#ff5f57", opacity: 0.6 }} />
          <span style={{ width: "11px", height: "11px", borderRadius: "50%", background: "#febc2e", opacity: 0.6 }} />
          <span style={{ width: "11px", height: "11px", borderRadius: "50%", background: "#28c840", opacity: 0.6 }} />
        </div>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--color-text-faint)", letterSpacing: "0.05em" }}>david@zheng: ~</span>
      </div>

      {/* Terminal output */}
      <div ref={scrollRef} style={{ padding: "16px 20px", maxHeight: "320px", overflowY: "auto", fontFamily: "var(--font-mono)", fontSize: "13px", lineHeight: 1.6, cursor: "text" }}>
        {lines.map((line, i) => {
          if (line.type === "system") {
            return <pre key={i} style={{ margin: 0, color: "var(--color-accent)", whiteSpace: "pre-wrap", fontSize: "12px", lineHeight: 1.3 }}>{line.text}</pre>
          }
          if (line.type === "input") {
            return (
              <div key={i} style={{ display: "flex", gap: "8px", marginTop: "4px" }}>
                <span style={{ color: "var(--color-accent)" }}>$</span>
                <span style={{ color: "var(--color-text)" }}>{line.text}</span>
              </div>
            )
          }
          return (
            <pre key={i} style={{
              margin: line.type === "error" ? "2px 0 0 20px" : "2px 0 0 20px",
              whiteSpace: "pre-wrap",
              color: line.type === "error" ? "#ef5350" : "var(--color-text-dim)",
            }}>{line.text}</pre>
          )
        })}

        {/* Active input line */}
        <div style={{ display: "flex", gap: "8px", marginTop: "4px", alignItems: "center" }}>
          <span style={{ color: "var(--color-accent)" }}>$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onInput={(e) => setInput((e.target as HTMLInputElement).value)}
            onKeyDown={handleKey}
            spellcheck={false}
            autocapitalize="off"
            autocomplete="off"
            style={{
              flex: 1, background: "none", border: "none", outline: "none",
              color: "var(--color-text)", fontFamily: "var(--font-mono)",
              fontSize: "13px", caretColor: "var(--color-accent)",
            }}
          />
          <span style={{ width: "8px", height: "16px", background: "var(--color-accent)", animation: "blink 1s step-end infinite" }} />
        </div>
      </div>

      <style>{`@keyframes blink { 50% { opacity: 0; } }`}</style>
    </div>
  )
}
