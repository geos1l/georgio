import Link from "next/link";
import { projects } from "@/data/projects";
import ProjectCard from "./ProjectCard";

export default function ProjectsSection() {
  return (
    <section className="w-full max-w-4xl mx-auto px-6 py-16">
      <p className="text-xs font-mono text-[var(--fg-subtle)] uppercase tracking-widest mb-8">
        Shipped
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
        {projects.map((project) => (
          <ProjectCard
            key={project.title}
            data={project}
          />
        ))}
      </div>
      <Link
        href="/projects"
        className="text-xs font-mono text-[var(--fg-subtle)] uppercase tracking-widest hover:text-[var(--fg)] transition-colors"
      >
        Check out more →
      </Link>
    </section>
  );
}
