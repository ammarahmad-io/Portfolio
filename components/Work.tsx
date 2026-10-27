import { Chapter, d } from "./Chapter";
import { DragScroll } from "./DragScroll";
import { GITHUB } from "@/lib/links";

type Project = {
  n: string;
  name: string;
  kind: string;
  year: string;
  summary: string;
  stack: string[];
  graph: string[];
  href?: string;
};

// [BRACKETS] mark details still to be filled in.
const PROJECTS: Project[] = [
  {
    n: "01",
    name: "PixelAgent",
    kind: "Autonomous vision agent",
    year: "2026",
    summary:
      "An AI vision agent that analyzes, generates and edits images from natural-language instructions.",
    stack: ["Python", "LangChain", "Agnes AI"],
    graph: ["prompt", "vision agent", "analyze / edit", "image"],
    href: `${GITHUB}/PixelAgent`,
  },
  {
    n: "02",
    name: "NASCON 2026 · Agentika",
    kind: "Hackathon build",
    year: "2026",
    summary: "[What your team built at the Agentika hackathon, and how it did.]",
    stack: ["[STACK]"],
    graph: ["prompt", "plan", "tools", "result"],
  },
  {
    n: "03",
    name: "Its-story-time",
    kind: "Python project",
    year: "2026",
    summary: "[One line on what Its-story-time does.]",
    stack: ["Python"],
    graph: ["input", "story engine", "output"],
    href: `${GITHUB}/Its-story-time`,
  },
  {
    n: "04",
    name: "[Production app]",
    kind: "Full-stack product",
    year: "[YEAR]",
    summary: "[A client or company project from your two years: the problem, what you built, the result.]",
    stack: ["Next.js", "FastAPI", "PostgreSQL"],
    graph: ["user", "next.js", "fastapi", "postgres"],
  },
];

function Graph({ nodes }: { nodes: string[] }) {
  return (
    <div className="flex w-full items-center">
      {nodes.map((node, i) => (
        <div key={node} className="flex min-w-0 flex-1 items-center last:flex-none">
          <span
            className={`shrink-0 whitespace-nowrap rounded-md border px-2.5 py-2 font-mono text-[11px] sm:px-3 sm:text-[12px] ${
              i === 1 ? "border-amber bg-amber/10 text-amber" : i === nodes.length - 1 ? "border-bone bg-bone text-ink" : "border-ash text-bone"
            }`}
          >
            {node}
          </span>
          {i < nodes.length - 1 && (
            <span className="edge h-px min-w-4 flex-1 bg-ash" style={{ "--e": `${0.2 + i * 0.15}s` } as React.CSSProperties} />
          )}
        </div>
      ))}
    </div>
  );
}

export function Work() {
  return (
    <Chapter id="work" n="04" label="ACTIONS" aside="DRAG →" title="Things I've" accent="shipped.">
      <DragScroll className="bleed mt-16 md:mt-20">
        <div className="flex w-max gap-5 pb-2">
          {PROJECTS.map((p, i) => (
            <article
              key={p.n}
              data-reveal
              style={d(i * 0.1)}
              className="flex w-[min(86vw,580px)] shrink-0 snap-start flex-col overflow-hidden rounded-xl border border-smoke bg-graphite"
            >
              <div className="flex items-center gap-1.5 border-b border-smoke px-4 py-3">
                <span className="size-2 rounded-full bg-smoke" />
                <span className="size-2 rounded-full bg-smoke" />
                <span className="size-2 rounded-full bg-amber" />
                <span className="ml-2 font-mono text-[12px] text-ash">action_{p.n}.graph</span>
              </div>
              <div className="flex h-44 items-center bg-ink/60 px-5 sm:px-6">
                <Graph nodes={p.graph} />
              </div>
              <div className="flex flex-1 flex-col gap-4 p-7">
                <div className="flex items-baseline justify-between font-mono text-[12px] tracking-[0.16em] text-ash">
                  <span>{p.kind.toUpperCase()}</span>
                  <span>{p.year}</span>
                </div>
                <h3 className="font-display text-[clamp(42px,4.2vw,58px)] leading-none tracking-[-0.035em]">{p.name}</h3>
                <p className="text-[19px] leading-relaxed text-sand">{p.summary}</p>
                <div className="mt-auto flex items-end justify-between gap-4 pt-4">
                  <span className="font-mono text-[13px] text-ash">{p.stack.join(" · ")}</span>
                  {p.href && (
                    <a
                      href={p.href}
                      target="_blank"
                      rel="noreferrer"
                      draggable={false}
                      className="shrink-0 border-b border-bone pb-1 text-[16px] font-medium transition-colors hover:border-amber hover:text-amber"
                    >
                      View code ↗
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </DragScroll>
    </Chapter>
  );
}
