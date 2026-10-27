"use client";

import { useEffect, useState } from "react";

/** Menu button and dropdown for screens where the nav links don't fit. */
export function MobileMenu({ links, contact }: { links: { href: string; label: string }[]; contact: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((o) => !o)}
        className="inline-flex h-11 items-center rounded-xl border border-[#3a352d] bg-[#1f1c17] px-5 text-[16px] transition-colors hover:border-amber hover:text-amber md:h-12 lg:hidden"
      >
        {open ? "Close" : "Menu"}
      </button>
      {open && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="absolute inset-x-0 top-[calc(100%+8px)] flex flex-col rounded-[22px] border border-smoke bg-graphite p-3 shadow-2xl shadow-black/60 lg:hidden"
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-xl px-4 py-3 font-display text-[38px] leading-none tracking-[-0.03em] transition-colors hover:bg-ink hover:text-amber"
            >
              {l.label}
            </a>
          ))}
          <a
            href={contact}
            target="_blank"
            rel="noreferrer"
            onClick={() => setOpen(false)}
            className="mt-2 flex items-center justify-between rounded-xl border border-[#3a352d] px-4 py-4 text-[17px] transition-colors hover:border-amber hover:text-amber"
          >
            Let&apos;s talk <span aria-hidden="true">↗</span>
          </a>
        </nav>
      )}
    </>
  );
}
