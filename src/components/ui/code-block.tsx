"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { clsx } from "clsx";

interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
  showLineNumbers?: boolean;
}

export function CodeBlock({
  code,
  language = "typescript",
  className,
  showLineNumbers = true,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.split("\n");

  return (
    <div
      className={clsx(
        "relative rounded-xl border border-[#27272a] bg-[#0c0c0e] overflow-hidden",
        className
      )}
    >
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#27272a] bg-[#18181b]/50">
        <span className="text-xs text-[#71717a] font-mono">{language}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-[#71717a] hover:text-[#a1a1aa] transition-colors cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <div className="overflow-x-auto">
        <pre className="p-4 text-sm leading-relaxed">
          <code>
            {lines.map((line, i) => (
              <div key={i} className="flex">
                {showLineNumbers && (
                  <span className="inline-block w-8 text-right mr-4 text-[#3f3f46] select-none text-xs leading-relaxed">
                    {i + 1}
                  </span>
                )}
                <span
                  className="flex-1 whitespace-pre text-[#e4e4e7] leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: highlightSyntax(line),
                  }}
                />
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}

function highlightSyntax(line: string): string {
  let html = escapeHtml(line);

  // Comments
  html = html.replace(/(\/\/.*$)/gm, '<span class="code-comment">$1</span>');
  html = html.replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="code-comment">$1</span>');

  // Strings
  html = html.replace(
    /(&quot;.*?&quot;|&#x27;.*?&#x27;|`[^`]*`)/g,
    '<span class="code-string">$1</span>'
  );

  // Keywords
  html = html.replace(
    /\b(import|from|export|default|const|let|var|function|return|if|else|async|await|new|class|extends|implements|interface|type|enum|try|catch|throw|finally|for|while|do|switch|case|break|continue|typeof|instanceof|void|null|undefined|true|false|as|keyof|readonly)\b/g,
    '<span class="code-keyword">$1</span>'
  );

  // Types (capitalized words)
  html = html.replace(
    /\b([A-Z][a-zA-Z0-9_]*)\b/g,
    '<span class="code-type">$1</span>'
  );

  // Functions
  html = html.replace(
    /(\w+)(?=\s*\()/g,
    '<span class="code-function">$1</span>'
  );

  return html;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}
