import React, { useState, useCallback } from "react";

// ─── Syntax Highlighting (shared token colors via CSS variables) ───────────────

function highlightCode(code: string): React.ReactNode[] {
  const tokenRE =
    /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`)|(\b(?:import|export|from|const|let|var|function|return|if|else|switch|case|default|for|while|do|break|continue|new|this|class|extends|type|interface|async|await|try|catch|throw|typeof|void|null|undefined|true|false)\b)|(\b[A-Z][A-Za-z0-9]*(?=\s*[<({]))|(<\/?[A-Za-z][A-Za-z0-9.-]*)|([{}()[\];,]|=>|\.\.\.)/g;

  const result: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = tokenRE.exec(code)) !== null) {
    if (match.index > lastIndex) {
      result.push(
        <span key={`t${lastIndex}`} style={{ color: "var(--code-text)" }}>
          {code.slice(lastIndex, match.index)}
        </span>,
      );
    }
    const [full, comment, str, keyword, component, tag, punct] = match;
    let color = "var(--code-text)";
    if (comment) color = "var(--code-comment)";
    else if (str) color = "var(--code-string)";
    else if (keyword) color = "var(--code-keyword)";
    else if (component) color = "var(--code-func)";
    else if (tag) color = "var(--code-tag)";
    else if (punct) color = "var(--code-punct)";
    result.push(
      <span key={`m${match.index}`} style={{ color }}>
        {full}
      </span>,
    );
    lastIndex = tokenRE.lastIndex;
  }
  if (lastIndex < code.length) {
    result.push(
      <span key={`e${lastIndex}`} style={{ color: "var(--code-text)" }}>
        {code.slice(lastIndex)}
      </span>,
    );
  }
  return result;
}

// ─── Component ────────────────────────────────────────────────────────────────

interface CodeBlockProps {
  code: string;
  title?: string;
}

export function CodeBlock({ code, title }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const rawLines = code.split("\n");
  const perLineHighlighted: React.ReactNode[][] = [];
  for (let i = 0; i < rawLines.length; i++) {
    perLineHighlighted.push(highlightCode(rawLines[i]));
  }

  const handleCopy = useCallback(() => {
    try {
      const textarea = document.createElement("textarea");
      textarea.value = code;
      textarea.style.position = "fixed";
      textarea.style.left = "-9999px";
      textarea.style.top = "-9999px";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      navigator.clipboard?.writeText(code).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  }, [code]);

  return (
    <div
      className="mt-4 overflow-hidden"
      style={{
        backgroundColor: "var(--code-bg)",
        borderRadius: "var(--radius-md)",
        border: "1px solid var(--code-border)",
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-2"
        style={{ borderBottom: "1px solid var(--code-border)" }}
      >
        <span
          className="uppercase tracking-wider"
          style={{
            color: "var(--code-text)",
            fontFamily: "var(--font-button)",
            fontSize: "var(--text-button)",
            fontWeight: "var(--weight-button)",
          }}
        >
          {title || "Usage"}
        </span>
        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 cursor-pointer transition-all"
          style={{
            borderRadius: "var(--radius-full)",
            color: copied ? "var(--code-string)" : "var(--code-line-number)",
            fontFamily: "var(--font-button)",
            fontSize: "var(--text-button)",
            fontWeight: "var(--weight-button)",
            background: "var(--code-surface)",
            border: "1px solid var(--code-border)",
          }}
        >
          {copied ? (
            <div className="flex items-center gap-1.5">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
              <span>Copied!</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" /></svg>
              <span>Copy</span>
            </div>
          )}
        </button>
      </div>

      {/* Code with line numbers */}
      <div className="px-4 py-4 overflow-x-auto">
        {rawLines.map((line, i) => (
          <div key={i} className="flex" style={{ lineHeight: "1.7" }}>
            <span
              className="select-none flex-shrink-0 text-right pr-5"
              style={{
                width: "44px",
                color: "var(--code-line-number)",
                fontFamily: "var(--font-button)",
                fontSize: "var(--text-button)",
                fontWeight: "var(--weight-label)",
              }}
            >
              {i + 1}
            </span>
            <span
              className="flex-1 min-w-0"
              style={{
                fontFamily: "var(--font-button)",
                fontSize: "var(--text-button)",
                fontWeight: "var(--weight-label)",
              }}
            >
              {perLineHighlighted[i]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}