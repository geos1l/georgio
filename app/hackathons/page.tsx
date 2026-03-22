import { hackathons } from "@/data/hackathons";
import ProjectCard from "@/components/ProjectCard";
import Divider from "@/components/Divider";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Hackathons — Georgio Silvea",
  description: "Hackathons I've competed in.",
};

export default function HackathonsPage() {
  return (
    <>
      <section className="w-full max-w-4xl mx-auto px-6 pt-20 pb-16">
        <h1
          className="text-5xl text-[var(--fg)] leading-tight mb-10"
          style={{ fontFamily: "var(--font-instrument-serif)" }}
        >
          Hackathons
        </h1>
        <p className="text-xs font-mono text-[var(--fg-subtle)] uppercase tracking-widest mb-8">
          {hackathons.length} events
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {hackathons.map((hackathon) => (
            <ProjectCard
              key={hackathon.name}
              data={{
                title: hackathon.project ?? hackathon.name,
                year: hackathon.year,
                description: hackathon.description,
                thumbnail: hackathon.thumbnail,
                href: hackathon.href ?? "#",
                badge: hackathon.result,
              }}
            />
          ))}
        </div>
      </section>
      <div className="max-w-4xl mx-auto px-6">
        <Divider />
      </div>
      <Footer />
    </>
  );
}
