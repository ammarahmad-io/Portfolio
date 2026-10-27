import { Chapter, d } from "./Chapter";

const LINES = [
  "It started with the web. React, Next.js, interfaces people actually click.",
  "Then language models changed what software could do.",
  "So I went deeper: Python, FastAPI, Postgres, and the models themselves.",
  "Now I build agents: systems that plan, call tools and act.",
  "And I explain them on stage, to the people who will build the next ones.",
];

const PILLARS = [
  {
    k: "build",
    title: "Builds end to end",
    body: "Next.js front ends, FastAPI services and Postgres, shipped with Docker and CI/CD.",
    tools: "react · next.js · fastapi · postgres",
  },
  {
    k: "orchestrate",
    title: "Engineers agents",
    body: "Not just chatbots: LangGraph workflows, tool use, and MCP servers built with FastMCP.",
    tools: "langchain · langgraph · fastmcp",
  },
  {
    k: "explain",
    title: "Explains it clearly",
    body: "Talks at universities and conferences, and hackathons like NASCON 2026 Agentika.",
    tools: "talks · workshops · hackathons",
  },
];

export function Story() {
  return (
    <Chapter id="story" n="02" label="CONTEXT" aside="HOW I GOT HERE" title="From the web to" accent="agents.">
      <div className="mt-16 flex max-w-[1180px] flex-col gap-7 md:mt-24 md:gap-9">
        {LINES.map((line, i) => (
          <p
            key={i}
            data-reveal="line"
            className="font-display text-[clamp(32px,4.2vw,64px)] leading-[1.04] tracking-[-0.03em]"
          >
            <span className="mr-4 align-middle font-mono text-[11px] tracking-[0.2em] text-ash md:text-[12px]">0{i + 1}</span>
            {line}
          </p>
        ))}
      </div>

      <div className="mt-24 grid gap-4 md:mt-32 md:grid-cols-3">
        {PILLARS.map((p, i) => (
          <article
            key={p.k}
            data-reveal
            style={d(i * 0.12)}
            className="flex flex-col gap-5 rounded-lg border border-smoke bg-graphite p-7 transition-colors hover:border-ash"
          >
            <span className="font-mono text-[13px] tracking-[0.16em] text-ash">
              <span className="text-phosphor">●</span> pillar.{p.k}()
            </span>
            <h3 className="font-display text-[clamp(40px,3.4vw,50px)] leading-none tracking-[-0.03em]">{p.title}</h3>
            <p className="text-[19px] leading-relaxed text-sand">{p.body}</p>
            <span className="mt-auto font-mono text-[13px] text-ash">{p.tools}</span>
          </article>
        ))}
      </div>
    </Chapter>
  );
}
