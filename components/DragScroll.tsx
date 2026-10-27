"use client";

import { useRef } from "react";

/** Horizontal scroller that can also be dragged with a mouse. */
export function DragScroll({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; left: number; moved: boolean } | null>(null);

  return (
    <div
      ref={ref}
      className={`no-scrollbar cursor-grab snap-x snap-mandatory overflow-x-auto active:cursor-grabbing ${className}`}
      onPointerDown={(e) => {
        if (e.pointerType !== "mouse" || !ref.current) return;
        drag.current = { x: e.clientX, left: ref.current.scrollLeft, moved: false };
        ref.current.style.scrollSnapType = "none";
      }}
      onPointerMove={(e) => {
        if (!drag.current || !ref.current) return;
        const dx = e.clientX - drag.current.x;
        if (Math.abs(dx) > 4) drag.current.moved = true;
        ref.current.scrollLeft = drag.current.left - dx;
      }}
      onPointerUp={() => {
        if (ref.current) ref.current.style.scrollSnapType = "";
        setTimeout(() => (drag.current = null), 0);
      }}
      onPointerLeave={() => {
        if (ref.current) ref.current.style.scrollSnapType = "";
        drag.current = null;
      }}
      onClickCapture={(e) => {
        if (drag.current?.moved) e.preventDefault();
      }}
    >
      {children}
    </div>
  );
}
