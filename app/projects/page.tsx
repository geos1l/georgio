import { projects } from "@/data/projects";
import { hackathons } from "@/data/hackathons";
import { CardItem } from "@/components/ProjectCard";
import ProjectCard from "@/components/ProjectCard";
import Divider from "@/components/Divider";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Projects — Georgio Silvea",
  description: "Everything I've built.",
};

export default function ProjectsPage() {
  const allCards: CardItem[] = [
    ...projects.map((p) => ({ ...p })),
    ...hackathons.map((h) => ({
      title: h.project ?? h.name,
      year: h.year,
      description: h.description,
      thumbnail: h.thumbnail,
      href: h.href ?? "#",
      badge: h.name,
    })),
  ].sort((a, b) => b.year - a.year);

  return (
    <>
      <section className="w-full max-w-4xl mx-auto px-6 pt-20 pb-16">
        <h1
          className="text-5xl text-[var(--fg)] leading-tight mb-16"
          style={{ fontFamily: "var(--font-instrument-serif)" }}
        >
          Projects
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {allCards.map((card) => (
            <ProjectCard key={`${card.title}-${card.year}`} data={card} />
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
