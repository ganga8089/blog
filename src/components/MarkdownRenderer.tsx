import React from "react";

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let inCodeBlock = false;
  let codeLines: string[] = [];
  let currentList: React.ReactNode[] = [];
  let listType: "bullet" | "ordered" | null = null;

  const flushList = (key: string) => {
    if (currentList.length > 0) {
      if (listType === "bullet") {
        elements.push(
          <ul key={`ul-${key}`} className="list-disc pl-6 mb-6 space-y-2">
            {currentList}
          </ul>
        );
      } else if (listType === "ordered") {
        elements.push(
          <ol key={`ol-${key}`} className="list-decimal pl-6 mb-6 space-y-2">
            {currentList}
          </ol>
        );
      }
      currentList = [];
      listType = null;
    }
  };

  lines.forEach((line, index) => {
    // 1. Code Block toggle
    if (line.trim().startsWith("```")) {
      flushList(index.toString());
      if (inCodeBlock) {
        // End code block
        elements.push(
          <pre key={`code-${index}`} className="bg-secondary/40 border border-border rounded-xl p-5 overflow-x-auto mb-6 text-sm font-mono leading-relaxed">
            <code>{codeLines.join("\n")}</code>
          </pre>
        );
        codeLines = [];
        inCodeBlock = false;
      } else {
        // Start code block
        inCodeBlock = true;
      }
      return;
    }

    if (inCodeBlock) {
      codeLines.push(line);
      return;
    }

    // 2. Headings
    if (line.startsWith("# ")) {
      flushList(index.toString());
      const text = line.replace("# ", "").trim();
      const id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");
      elements.push(
        <h1 key={`h1-${index}`} id={id} className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-10 mb-5 text-foreground">
          {text}
        </h1>
      );
      return;
    }

    if (line.startsWith("## ")) {
      flushList(index.toString());
      const text = line.replace("## ", "").trim();
      const id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");
      elements.push(
        <h2 key={`h2-${index}`} id={id} className="text-xl sm:text-2xl font-bold tracking-tight mt-10 mb-4 pb-2 border-b border-border/80 text-foreground">
          {text}
        </h2>
      );
      return;
    }

    if (line.startsWith("### ")) {
      flushList(index.toString());
      const text = line.replace("### ", "").trim();
      const id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");
      elements.push(
        <h3 key={`h3-${index}`} id={id} className="text-lg sm:text-xl font-bold tracking-tight mt-8 mb-3 text-foreground">
          {text}
        </h3>
      );
      return;
    }

    // 3. Blockquotes
    if (line.startsWith("> ")) {
      flushList(index.toString());
      const text = line.replace("> ", "").trim();
      elements.push(
        <blockquote key={`quote-${index}`} className="border-l-4 border-primary pl-5 italic text-muted-foreground/90 my-6">
          {text}
        </blockquote>
      );
      return;
    }

    // 4. Bullet lists
    if (line.startsWith("* ") || line.startsWith("- ")) {
      if (listType !== "bullet") {
        flushList(index.toString());
        listType = "bullet";
      }
      const text = line.replace(/^[\*\-]\s+/, "").trim();
      // Handle inline bold/code tags in bullets
      currentList.push(
        <li key={`li-${index}`} className="text-sm sm:text-base leading-relaxed text-foreground/90">
          {renderInlineText(text)}
        </li>
      );
      return;
    }

    // 5. Numbered lists
    if (/^\d+\.\s+/.test(line)) {
      if (listType !== "ordered") {
        flushList(index.toString());
        listType = "ordered";
      }
      const text = line.replace(/^\d+\.\s+/, "").trim();
      currentList.push(
        <li key={`li-${index}`} className="text-sm sm:text-base leading-relaxed text-foreground/90">
          {renderInlineText(text)}
        </li>
      );
      return;
    }

    // 6. Blank space
    if (line.trim() === "") {
      flushList(index.toString());
      return;
    }

    // 7. Regular paragraph
    flushList(index.toString());
    elements.push(
      <p key={`p-${index}`} className="text-sm sm:text-base leading-relaxed text-foreground/90 mb-5">
        {renderInlineText(line)}
      </p>
    );
  });

  // Flush remaining lists
  flushList("final");

  return <div className="prose max-w-none">{elements}</div>;
}

// Basic inline text formatting helper (**bold**, `code`, etc.)
function renderInlineText(text: string): React.ReactNode[] {
  // Regex to match bold (**text**) or inline code (`code`)
  const formatRegex = /(\*\*.*?\*\*|`.*?`)/g;
  const splitParts = text.split(formatRegex);

  return splitParts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="font-bold text-foreground">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code key={index} className="bg-secondary/60 text-primary border border-border px-1.5 py-0.5 rounded font-mono text-xs">
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}
