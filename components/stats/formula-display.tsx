"use client";

import katex from "katex";

interface FormulaDisplayProps {
  math: string;
  block?: boolean;
  className?: string;
}

export function FormulaDisplay({ math, block = true, className = "" }: FormulaDisplayProps) {
  const html = katex.renderToString(math, {
    throwOnError: false,
    displayMode: block,
    strict: false,
  });

  return (
    <span
      className={`${block ? "block text-center my-2 sm:my-3 text-sm sm:text-base md:text-lg overflow-x-auto max-w-full" : "inline"} ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export function InlineMath({ math, className = "" }: { math: string; className?: string }) {
  return <FormulaDisplay math={math} block={false} className={className} />;
}
