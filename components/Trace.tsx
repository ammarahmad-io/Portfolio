import { Chapter, d } from "./Chapter";

type Step = {
  id: string;
  year: string;
  title: string;
  tools?: string;
  output?: string;
  current?: boolean;
};

// [BRACKETS] mark details still to be filled in.
const STEPS: Step[] = [
  {
    id: "step_01",
    year: "2024",
    title: "[ROLE] @ [COMPANY]",
    tools: "react, next.js",
    output: "[What you shipped, ideally with a number]",
  },
  {
    id: "step_02",
    year: "2025",
    title: "[ROLE] @ [COMPANY]",
    tools: "fastapi, postgres, langchain",
    output: "[Result]",
  },
  {
    id: "event",
    year: "2026",
    title: "NASCON 2026 · Agentika hackathon",
    tools: "agents, under a deadline",
    output: "[What the team built]",
  },
  {
    id: "step_03",
    year: "2026",
    title: "[CURRENT ROLE] @ [COMPANY]",
    tools: "langgraph, fastmcp, docker",
    output: "[Result]",
    current: true,
  },
];

export function Trace() {
  return (
    <Chapter id="trace" n="05" label="TRACE" aside="EXECUTION LOG" title="Two years," accent="logged.">
      <div data-reveal className="mt-16 overflow-hidden rounded-xl border border-smoke bg-graphite md:mt-20">
        <div className="flex items-center justify-between border-b border-smoke px-5 py-3.5 font-mono text-[13px] text-ash">
          <span>$ ammar.run --trace --since=2024</span>
          <span className="hidden sm:inline">
            <span className="text-phosphor">●</span> running
          </span>
        </div>
        <ol className="flex flex-col font-mono text-[14px] leading-relaxed md:text-[16px]">
          {STEPS.map((s, i) => (
            <li
              key={s.id + s.year}
              data-reveal
              style={d(0.15 + i * 0.12)}
              className={`grid gap-x-8 gap-y-1 border-b border-smoke/70 px-5 py-7 md:grid-cols-[130px_80px_1fr] md:px-8 ${
                s.current ? "bg-amber/[0.06]" : ""
              }`}
            >
              <span className={s.current ? "text-amber" : "text-ash"}>{s.id}</span>
              <span className="text-ash">{s.year}</span>
              <div className="flex flex-col gap-1">
                <span className="font-sans text-[21px] font-medium text-bone md:text-[24px]">
                  {s.title}
                  {s.current && <span className="ml-3 align-middle font-mono text-[13px] text-phosphor">● now</span>}
                </span>
                {s.tools && (
                  <span className="text-sand">
                    <span className="text-ash">tool_calls:</span> {s.tools}
                  </span>
                )}
                {s.output && (
                  <span className="text-sand">
                    <span className="text-ash">output:</span> {s.output}
                  </span>
                )}
              </div>
            </li>
          ))}
          <li data-reveal style={d(0.7)} className="px-5 py-6 text-amber md:px-8">
            next_step: pending…
          </li>
        </ol>
      </div>
    </Chapter>
  );
}
