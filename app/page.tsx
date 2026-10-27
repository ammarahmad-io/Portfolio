import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Story } from "@/components/Story";
import { Tools } from "@/components/Tools";
import { Work } from "@/components/Work";
import { Trace } from "@/components/Trace";
import { Speaking } from "@/components/Speaking";
import { Contact } from "@/components/Contact";
import { RevealObserver } from "@/components/RevealObserver";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Story />
        <Tools />
        <Work />
        <Trace />
        <Speaking />
        <Contact />
      </main>
      <RevealObserver />
    </>
  );
}
