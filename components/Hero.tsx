import { SignalPortrait } from "./SignalPortrait";
import { MotionToggle } from "./MotionProvider";
import { LINKEDIN } from "@/lib/links";

const d = (s: number) => ({ "--d": `${s}s` }) as React.CSSProperties;

export function Hero() {
  return (
    <section id="top" className="relative isolate flex min-h-svh flex-col overflow-hidden">
      {/* Column guides: faint, symmetric, fading out top and bottom */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-[22%] top-[110px] -z-10 px-[var(--gutter)]">
        <div className="relative h-full">
          {["0%", "16%", "31%", "69%", "84%", "100%"].map((left, i) => (
            <span
              key={left}
              className={`absolute top-0 h-full w-px bg-gradient-to-b from-transparent via-smoke/70 to-transparent ${i === 0 || i === 5 ? "" : "hidden md:block"}`}
              style={{ left }}
            />
          ))}
        </div>
      </div>

      <SignalPortrait src="/ammar-signal.png" />
      {/* Softens the edge where the next section slides over the fixed portrait */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-40 bg-gradient-to-b from-transparent to-ink" />

      <div
        data-hero-content
        className="relative z-10 flex w-full flex-1 flex-col items-center px-[var(--gutter)] pt-24 will-change-transform md:pt-[84px]"
      >
        {/* Left rail */}
        <div className="fade-in absolute left-[var(--gutter)] top-[140px] hidden items-center gap-3 font-mono text-[11px] tracking-[0.22em] xl:flex" style={d(0.6)}>
          <span aria-hidden="true" className="size-1.5 rounded-full bg-amber" />
          ENGINEER. BUILDER. SPEAKER.
        </div>
        <div className="fade-in absolute left-[var(--gutter)] top-[300px] hidden flex-col gap-[22px] font-mono text-[11px] tracking-[0.2em] xl:flex" style={d(0.8)}>
          <span className="text-amber">01 / PROMPT</span>
          <span aria-hidden="true" className="text-[22px] tracking-normal text-amber">+</span>
          <span className="leading-loose text-ash">
            FULL-STACK
            <br />
            AGENTIC AI
            <br />
            PUBLIC SPEAKING
          </span>
        </div>

        {/* Right rail */}
        <div className="fade-in absolute right-[var(--gutter)] top-[140px] hidden text-right font-mono text-[11px] tracking-[0.22em] xl:block" style={d(0.6)}>
          BASED IN [CITY] · BUILDING IN PUBLIC
        </div>
        <div className="fade-in absolute right-[var(--gutter)] top-[300px] hidden flex-col gap-2.5 text-right font-mono text-[11px] tracking-[0.12em] text-ash xl:flex" style={d(0.8)}>
          <span>run_id · 2026.10</span>
          <span>mode · connect</span>
          <span className="text-bone">
            <span className="text-phosphor">●</span> status · listening
          </span>
        </div>

        {/* Holds the portrait's place in the layout; the portrait itself is the fixed layer above. */}
        <div
          data-portrait-anchor
          role="img"
          aria-label="Portrait of Ammar Ahmad"
          className="aspect-[1087/883] w-[min(88vw,500px,max(260px,calc((100svh-525px)*1.23)))]"
        />

        <p
          className="fade-in relative mt-2 text-center font-mono text-[8px] tracking-[0.26em] text-sand [text-shadow:0_0_8px_#0b0a08,0_0_14px_#0b0a08] md:mt-3 md:text-[9px]"
          style={d(0.9)}
        >
          A HUMAN PERSPECTIVE ON TECHNOLOGY
        </p>

        <h1 className="relative mt-3 text-center font-display text-[clamp(44px,12.4vw,64px)] leading-[0.98] tracking-[-0.05em] [text-shadow:0_4px_45px_#0008] md:text-[clamp(64px,min(9vw,14svh),184px)] md:leading-[0.93]">
          <span className="rise"><span style={d(0.35)}>I build systems</span></span>
          {/* "ask." wraps to its own line only when the screen is too narrow */}
          <span className="rise">
            <span style={d(0.47)}>that think before you</span>{" "}
            <span className="italic text-amber" style={d(0.62)}>
              ask.
            </span>
          </span>
        </h1>

        <div className="fade-in mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-5" style={d(1.05)}>
          <a
            href="#story"
            className="inline-flex h-[52px] items-center gap-9 rounded-full border border-[#3a352d] bg-ink/40 px-6 text-[16px] font-medium backdrop-blur-sm transition-colors hover:border-amber hover:text-amber"
          >
            See the run <span aria-hidden="true">↓</span>
          </a>
          <a
            href={LINKEDIN}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-7 border-b border-bone pb-2 text-[16px] font-medium transition-colors hover:border-amber hover:text-amber"
          >
            Start a conversation <span aria-hidden="true">↗</span>
          </a>
        </div>

        {/* Bottom bar */}
        <div className="fade-in mt-auto flex w-full items-center justify-between gap-4 pb-3 pt-4 font-mono text-[11px] tracking-[0.22em] text-sand" style={d(1.3)}>
          <span className="flex items-center gap-4">
            <span aria-hidden="true" className="h-8 w-px bg-amber" />
            SCROLL TO RUN ↓
          </span>
          <span className="hidden md:inline">SHIPPING AGENTS SINCE 2024</span>
          <MotionToggle />
        </div>
      </div>
    </section>
  );
}
