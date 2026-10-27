export const d = (s: number) => ({ "--d": `${s}s` }) as React.CSSProperties;

/** A numbered chapter of the agent run: mono label, rule, and a serif headline with an italic accent. */
export function Chapter({
  id,
  n,
  label,
  aside,
  title,
  accent,
  after,
  children,
}: {
  id: string;
  n: string;
  label: string;
  aside?: string;
  title: string;
  accent: string;
  after?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="relative z-10 scroll-mt-24 bg-ink py-24 md:py-32">
      <div className="wrap">
        <div data-reveal className="flex items-baseline justify-between gap-6 border-t border-smoke pt-6 font-mono text-[11px] tracking-[0.2em] md:text-[12px]">
          <span className="text-amber">
            {n} / {label}
          </span>
          {aside && <span className="hidden text-ash sm:inline">{aside}</span>}
        </div>
        <h2
          data-reveal
          className="mt-10 max-w-[1200px] font-display text-[clamp(52px,7.4vw,124px)] leading-[0.95] tracking-[-0.045em]"
          style={d(0.1)}
        >
          {title} <span className="italic text-amber">{accent}</span>
          {after && <> {after}</>}
        </h2>
        {children}
      </div>
    </section>
  );
}
