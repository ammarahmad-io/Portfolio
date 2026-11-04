import { Chapter, d } from "./Chapter";
import { DragScroll } from "./DragScroll";
import { GITHUB } from "@/lib/links";

type Project = {
  n: string;
  name: string;
  kind: string;
  year?: string;
  summary: string;
  stack?: string[];
  graph: string[];
  href?: string;
};

const PROJECTS: Project[] = [
  {
    n: "01",
    name: "YT-Autopilot",
    kind: "In progress · YouTube automation",
    year: "Now",
    summary:
      "Fully automates a YouTube channel in your niche: finds the hot topics, researches them in depth, generates the voice, makes the full video and uploads it, then learns from past mistakes. A human stays in the loop at every step, and it works the way a human creator would.",
    graph: ["hot topics", "research", "voice & video", "upload"],
  },
  {
    n: "02",
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
    n: "03",
    name: "Outpilot",
    kind: "AI outreach agent · NASCON",
    year: "2026",
    summary:
      "Built with my team at NASCON 2026, FAST University. An AI outreach agent that works 24/7: it finds leads, verifies their emails, writes and sends outreach, then reads the replies and classifies them.",
    graph: ["find leads", "verify", "write & send", "classify"],
  },
  {
    n: "04",
    name: "It's Story Time",
    kind: "Storytelling agent for kids",
    summary:
      "An agent that writes stories for kids and generates the pictures to go with them, shaped by what each child wants to hear.",
    stack: ["Python"],
    graph: ["kid's wish", "story agent", "images", "story"],
    href: `${GITHUB}/Its-story-time`,
  },
  {
    n: "05",
    name: "Agentic Store",
    kind: "AI-powered full-stack store",
    summary:
      "A full-stack store run with AI on both sides: customers use the user panel and store owners use the admin panel, and both can control the store just by asking its agent.",
    graph: ["user / admin", "store agent", "actions", "store"],
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
                  {p.year && <span>{p.year}</span>}
                </div>
                <h3 className="font-display text-[clamp(42px,4.2vw,58px)] leading-none tracking-[-0.035em]">{p.name}</h3>
                <p className="text-[19px] leading-relaxed text-sand">{p.summary}</p>
                <div className="mt-auto flex items-end justify-between gap-4 pt-4">
                  <span className="font-mono text-[13px] text-ash">{p.stack?.join(" · ")}</span>
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
