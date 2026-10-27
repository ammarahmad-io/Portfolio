import { Chapter, d } from "./Chapter";

const REGISTRY = [
  { fn: "frontend.render", names: ["React", "Next.js"], note: "Interfaces and full products" },
  { fn: "backend.serve", names: ["Python", "FastAPI"], note: "APIs and services" },
  { fn: "agents.orchestrate", names: ["LangChain", "LangGraph", "FastMCP"], note: "Agents, tools and MCP servers" },
  { fn: "data.persist", names: ["PostgreSQL"], note: "Schemas and queries" },
  { fn: "ship.deploy", names: ["Docker", "CI/CD"], note: "Containers and pipelines" },
];

const TICKER = ["react", "next.js", "python", "fastapi", "postgres", "langchain", "langgraph", "fastmcp", "docker", "ci/cd", "public speaking"];

export function Tools() {
  return (
    <Chapter id="tools" n="03" label="TOOLS" aside="REGISTERED: 5 GROUPS" title="The tools I" accent="call.">
      <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 md:mt-20">
        {REGISTRY.map((t, i) => (
          <article
            key={t.fn}
            data-reveal
            style={d(i * 0.08)}
            className={`flex flex-col gap-6 rounded-lg border border-smoke bg-graphite p-7 ${i === 2 ? "border-amber/60 lg:row-span-2" : ""}`}
          >
            <div className="flex items-center justify-between font-mono text-[13px]">
              <span className={i === 2 ? "text-amber" : "text-sand"}>{t.fn}()</span>
              <span className="text-phosphor">✓ loaded</span>
            </div>
            <ul className="flex flex-col gap-1">
              {t.names.map((n) => (
                <li key={n} className="font-display text-[clamp(46px,4.8vw,72px)] leading-[0.95] tracking-[-0.035em]">
                  {n}
                </li>
              ))}
            </ul>
            <p className="mt-auto text-[17px] text-ash">{t.note}</p>
          </article>
        ))}
      </div>

      <div aria-hidden="true" className="mt-20 overflow-hidden border-y border-smoke py-5">
        <div className="marquee gap-6 font-mono text-[17px] tracking-[0.06em] text-ash">
          {[0, 1].map((k) => (
            <div key={k} className="flex shrink-0 items-center gap-6 pr-6">
              {TICKER.map((t) => (
                <span key={t} className="flex items-center gap-6">
                  <span className={t.startsWith("lang") || t === "fastmcp" ? "text-bone" : ""}>{t}</span>
                  <span className="text-amber">→</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </Chapter>
  );
}
