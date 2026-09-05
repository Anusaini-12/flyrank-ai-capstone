"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { KeyboardEvent, ReactNode } from "react";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

type ModalProps = {
  trigger: ReactNode;
  title: ReactNode;
  children: ReactNode;
  id?: string;
};

export default function Modal({
  trigger,
  title,
  children,
  id,
}: ModalProps) {
  const generatedId = useId();
  const modalId = id ?? `modal-${generatedId}`;
  const titleId = `${modalId}-title`;
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const previouslyFocusedElementRef = useRef<HTMLElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      previouslyFocusedElementRef.current?.focus();
      previouslyFocusedElementRef.current = null;
      return;
    }

    const activeElement = document.activeElement;
    previouslyFocusedElementRef.current =
      activeElement instanceof HTMLElement ? activeElement : null;

    const dialog = dialogRef.current;
    const firstFocusableElement = dialog?.querySelectorAll<HTMLElement>(
      FOCUSABLE_SELECTOR,
    )[0];

    if (firstFocusableElement) {
      firstFocusableElement.focus();
    } else {
      dialog?.focus();
    }
  }, [isOpen]);

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      setIsOpen(false);
      return;
    }

    if (event.key !== "Tab") {
      return;
    }

    const dialog = dialogRef.current;
    if (!dialog) {
      return;
    }

    const focusableElements = Array.from(
      dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
    );

    if (focusableElements.length === 0) {
      event.preventDefault();
      dialog.focus();
      return;
    }

    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && document.activeElement === firstFocusableElement) {
      event.preventDefault();
      lastFocusableElement.focus();
    } else if (!event.shiftKey && document.activeElement === lastFocusableElement) {
      event.preventDefault();
      firstFocusableElement.focus();
    }
  }

  return (
    <>
      <button
        type="button"
        className="rounded-lg bg-[#0F6E56] px-5 py-3 text-lg font-semibold text-white shadow-sm transition-colors hover:bg-[#0b5945] focus:outline-none focus:ring-2 focus:ring-[#0F6E56] focus:ring-offset-2"
        onClick={() => setIsOpen(true)}
      >
        {trigger}
      </button>

      {isOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/50 p-6">
          <div
            ref={dialogRef}
            id={modalId}
            role="dialog"
            aria-modal={true}
            aria-labelledby={titleId}
            tabIndex={-1}
            onKeyDown={handleKeyDown}
            className="w-full max-w-lg rounded-2xl bg-white p-7 shadow-2xl outline-none lg:p-8"
          >
            <div className="flex items-start justify-between gap-6">
              <h2 id={titleId} className="text-2xl font-semibold text-zinc-950">
                {title}
              </h2>
              <button
                type="button"
                aria-label="Close dialog"
                className="rounded-lg px-3 py-2 text-lg font-semibold text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-950 focus:outline-none focus:ring-2 focus:ring-[#0F6E56]"
                onClick={() => setIsOpen(false)}
              >
                Close
              </button>
            </div>
            <div className="mt-5 text-base leading-7 text-zinc-600">{children}</div>
          </div>
        </div>
      ) : null}
    </>
  );
}
