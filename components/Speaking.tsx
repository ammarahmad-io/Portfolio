import { Chapter, d } from "./Chapter";

// [BRACKETS] mark details still to be filled in.
const STATS = [
  { value: "[N]", label: "talks given" },
  { value: "[N]+", label: "people in the room" },
  { value: "2026", label: "NASCON Agentika" },
];

const TALKS = [
  { title: "[Talk title]", venue: "[University]", year: "[YEAR]" },
  { title: "[Talk title]", venue: "[Conference]", year: "[YEAR]" },
  { title: "Agentika hackathon", venue: "NASCON 2026", year: "2026" },
];

export function Speaking() {
  return (
    <Chapter
      id="speaking"
      n="06"
      label="BROADCAST"
      aside="TALKS & COMMUNITY"
      title="Code is half the job."
      accent="Explaining it"
      after="is the other."
    >
      <div className="mt-16 grid gap-4 md:mt-20 md:grid-cols-[1.4fr_1fr]">
        <figure data-reveal className="grain relative min-h-[380px] overflow-hidden rounded-xl md:min-h-[520px]">
          <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-amber/15 to-transparent" />
          <span className="absolute left-6 top-6 font-mono text-[12px] tracking-[0.16em] text-ash">[STAGE PHOTO: UNIVERSITY TALK]</span>
          <figcaption className="absolute inset-x-6 bottom-6 flex flex-col gap-2">
            <span className="font-display text-[clamp(40px,4.4vw,64px)] leading-none tracking-[-0.035em]">
              Real rooms. <span className="italic text-amber">Real people.</span>
            </span>
          </figcaption>
        </figure>
        <div className="grid gap-4">
          <figure data-reveal style={d(0.1)} className="grain relative min-h-[240px] overflow-hidden rounded-xl">
            <span className="absolute left-6 top-6 font-mono text-[12px] tracking-[0.16em] text-ash">[PHOTO: NASCON 2026]</span>
          </figure>
          <dl data-reveal style={d(0.2)} className="grid grid-cols-3 gap-4 rounded-xl border border-smoke bg-graphite p-6">
            {STATS.map((s) => (
              <div key={s.label} className="flex flex-col gap-2">
                <dt className="order-2 font-mono text-[11px] tracking-[0.12em] text-ash uppercase md:text-[12px]">{s.label}</dt>
                <dd className="font-display text-[clamp(40px,4vw,60px)] leading-none tracking-[-0.04em]">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <ul className="mt-16 border-t border-smoke">
        {TALKS.map((t, i) => (
          <li
            key={i}
            data-reveal
            style={d(i * 0.08)}
            className="grid grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-1 border-b border-smoke py-6 md:grid-cols-[1fr_280px_80px]"
          >
            <span className="font-display text-[clamp(28px,3vw,42px)] tracking-[-0.03em]">{t.title}</span>
            <span className="order-3 col-span-2 font-mono text-[13px] tracking-[0.12em] text-ash md:order-none md:col-span-1">{t.venue}</span>
            <span className="text-right font-mono text-[13px] text-ash">{t.year}</span>
          </li>
        ))}
      </ul>
    </Chapter>
  );
}
