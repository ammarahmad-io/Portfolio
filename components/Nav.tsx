import { LINKEDIN } from "@/lib/links";
import { MobileMenu } from "./MobileMenu";

const LINKS = [
  { href: "#work", label: "Work" },
  { href: "#story", label: "Story" },
  { href: "#trace", label: "Trace" },
  { href: "#speaking", label: "Speaking" },
];

export function Nav() {
  return (
    <header className="fade-in fixed inset-x-4 top-4 z-50 mx-auto max-w-[1080px] md:top-6 2xl:max-w-[1400px]" style={{ "--d": "0.2s" } as React.CSSProperties}>
      <div className="flex h-16 items-center justify-between gap-3 rounded-[22px] border border-smoke bg-graphite/80 pl-6 pr-2.5 backdrop-blur-md md:h-[72px] md:pl-[30px] md:pr-3.5">
        <a href="#top" className="flex shrink-0 items-baseline gap-[0.22em] font-display text-[28px] leading-none tracking-[-0.03em] md:text-[32px]" aria-label="Ammar Ahmad, home">
          <span>Ammar</span>
          <span className="italic text-amber">Ahmad</span>
        </a>
        <nav aria-label="Main" className="flex items-center gap-2 text-[15px] lg:gap-9">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="hidden transition-colors hover:text-amber lg:inline">
              {l.label}
            </a>
          ))}
          <MobileMenu links={LINKS} contact={LINKEDIN} />
          <a
            href={LINKEDIN}
            target="_blank"
            rel="noreferrer"
            className="hidden h-11 items-center gap-5 rounded-xl border border-[#3a352d] bg-[#1f1c17] px-5 transition-colors hover:border-amber hover:text-amber sm:inline-flex md:h-12"
          >
            Let&apos;s talk <span aria-hidden="true">↗</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
