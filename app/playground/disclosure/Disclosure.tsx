"use client";

import { ReactNode, useId, useState } from "react";

type DisclosureProps = {
  title: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
  id?: string;
};

export default function Disclosure({
  title,
  children,
  defaultOpen = false,
  id,
}: DisclosureProps) {
  const generatedId = useId();
  const contentId = id ?? `disclosure-content-${generatedId}`;
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div>
      <button
        type="button"
        className="rounded-lg border border-border bg-card px-5 py-3 text-lg font-semibold text-foreground shadow-sm transition-colors hover:border-primary hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
        aria-expanded={isOpen}
        aria-controls={contentId}
        onClick={() => setIsOpen((currentIsOpen) => !currentIsOpen)}
      >
        {title}
      </button>
      <div id={contentId} hidden={!isOpen}>
        {children}
      </div>
    </div>
  );
}
