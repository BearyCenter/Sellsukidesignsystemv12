import React, { useState, useCallback } from "react";
import { Copy, Check } from "lucide-react";

interface CodeBlockProps {
  code: string;
  title?: string;
}

export function CodeBlock({ code, title }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    // Use textarea fallback since Clipboard API may be blocked by permissions policy
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
      // Final fallback: try Clipboard API
      navigator.clipboard?.writeText(code).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  }, [code]);

  return (
    <div className="mt-4 rounded-[var(--radius)] border border-border overflow-hidden bg-card">
      <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-muted/50">
        <span
          className="text-muted-foreground uppercase tracking-wider"
          style={{
            fontFamily: "var(--font-label)",
            fontSize: "calc(var(--text-label) * 0.7)",
            fontWeight: "var(--weight-label)",
          }}
        >
          {title || "Usage"}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-[var(--radius-sm)] transition-all cursor-pointer hover:bg-muted"
          style={{
            fontFamily: "var(--font-button)",
            fontSize: "var(--text-button)",
            fontWeight: "var(--weight-button)",
          }}
        >
          {copied ? (
            <>
              <Check size={12} className="text-chart-2" />
              <span className="text-chart-2">Copied!</span>
            </>
          ) : (
            <>
              <Copy size={12} className="text-muted-foreground" />
              <span className="text-muted-foreground">Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto">
        <code
          className="text-foreground block whitespace-pre"
          style={{
            fontFamily: "var(--font-code, 'Fira Code', 'SF Mono', 'Cascadia Code', 'Consolas', monospace)",
            fontSize: "calc(var(--text-button) * 0.92)",
            lineHeight: "1.6",
            fontWeight: 400,
          }}
        >
          {code}
        </code>
      </pre>
    </div>
  );
}