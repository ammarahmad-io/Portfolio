import { d } from "./Chapter";
import { GITHUB, LINKEDIN } from "@/lib/links";

const CHANNELS = [
  { label: "LinkedIn", handle: "/in/ammarahmaddev", href: LINKEDIN },
  { label: "GitHub", handle: "/ammarahmad-io", href: GITHUB },
  { label: "Email", handle: "[ADD EMAIL]", href: undefined },
];

export function Contact() {
  return (
    <section id="contact" className="relative z-10 scroll-mt-24 bg-ink pb-10 pt-24 md:pt-32">
      <div className="wrap">
        <div data-reveal className="flex items-baseline justify-between gap-6 border-t border-amber/50 pt-6 font-mono text-[11px] tracking-[0.2em] md:text-[12px]">
          <span className="text-amber">07 / HANDOFF → HUMAN</span>
          <span className="hidden text-ash sm:inline">
            <span className="text-phosphor">●</span> OPEN TO CONVERSATIONS
          </span>
        </div>

        <h2
          data-reveal
          style={d(0.1)}
          className="mt-12 max-w-[1500px] font-display text-[clamp(54px,8.6vw,150px)] leading-[0.92] tracking-[-0.045em]"
        >
          This is where the agent stops and the <span className="italic text-amber">conversation</span> starts.
        </h2>

        <div className="mt-16 grid gap-12 md:mt-24 md:grid-cols-[1fr_1.2fr]">
          <div data-reveal style={d(0.15)} className="flex flex-col gap-6">
            <p className="max-w-[500px] text-[21px] leading-relaxed text-sand">
              I&apos;m not looking for a job. I&apos;m looking for people building interesting things with AI: founders,
              engineers, organisers and students. If that&apos;s you, say hello.
            </p>
            <p className="font-mono text-[13px] leading-relaxed text-ash">
              next_step: [Where you&apos;re headed in the next few years, in your own words.]
            </p>
          </div>

          <ul className="border-t border-smoke">
            {CHANNELS.map((c, i) => {
              const inner = (
                <>
                  <span className="font-display text-[clamp(46px,5.4vw,82px)] leading-none tracking-[-0.035em]">{c.label}</span>
                  <span className="flex items-center gap-4 font-mono text-[13px] text-ash">
                    <span className="hidden sm:inline">{c.handle}</span>
                    {c.href && <span className="text-xl text-bone transition-colors group-hover:text-amber">↗</span>}
                  </span>
                </>
              );
              return (
                <li key={c.label} data-reveal style={d(0.1 + i * 0.08)} className="border-b border-smoke">
                  {c.href ? (
                    <a
                      href={c.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center justify-between gap-6 py-6 transition-colors hover:text-amber"
                    >
                      {inner}
                    </a>
                  ) : (
                    <div className="flex items-center justify-between gap-6 py-6">{inner}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        <footer className="mt-28 flex flex-col gap-4 border-t border-smoke pt-6 font-mono text-[12px] tracking-[0.16em] text-ash sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} AMMAR AHMAD</span>
          <span>DESIGNED &amp; BUILT BY ME · NEXT.JS</span>
          <a href="#top" className="transition-colors hover:text-amber">
            BACK TO TOP ↑
          </a>
        </footer>
      </div>
    </section>
  );
}
