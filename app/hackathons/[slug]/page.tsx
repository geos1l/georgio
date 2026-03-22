import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Github } from "lucide-react";
import { hackathons } from "@/data/hackathons";
import Divider from "@/components/Divider";
import Footer from "@/components/Footer";

export function generateStaticParams() {
  return hackathons.map((h) => ({ slug: h.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const hackathon = hackathons.find((h) => h.slug === params.slug);
  if (!hackathon) return {};
  return {
    title: `${hackathon.project ?? hackathon.name} — Georgio Silvea`,
    description: hackathon.description,
  };
}

export default function HackathonDetail({ params }: { params: { slug: string } }) {
  const hackathon = hackathons.find((h) => h.slug === params.slug);
  if (!hackathon) notFound();

  return (
    <>
      <article className="w-full max-w-4xl mx-auto px-6 pt-20 pb-16">
        {/* Header */}
        <div className="mb-12">
          <Link
            href="/hackathons"
            className="text-xs font-mono text-[var(--fg-subtle)] uppercase tracking-widest hover:text-[var(--fg)] transition-colors mb-6 block"
          >
            ← Hackathons
          </Link>
          <h1
            className="text-5xl text-[var(--fg)] leading-tight mb-4"
            style={{ fontFamily: "var(--font-instrument-serif)" }}
          >
            {hackathon.project ?? hackathon.name}
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-[var(--fg-subtle)] uppercase tracking-widest">
              {hackathon.name} · {hackathon.year}
            </span>
            <span className="text-xs font-mono text-[var(--fg-subtle)]">
              {hackathon.result}
            </span>
          </div>
          {hackathon.tags && (
            <div className="flex flex-wrap gap-2 mt-4">
              {hackathon.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-mono text-[var(--fg-subtle)] border border-[var(--border)] px-2 py-0.5 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Demo media */}
        {hackathon.demoMedia && (
          <div className="mb-12">
            {hackathon.demoIsVideo ? (
              <video
                src={hackathon.demoMedia}
                controls
                className="w-full rounded-xl aspect-video bg-[var(--border)]"
              />
            ) : (
              <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-[var(--border)]">
                <Image
                  src={hackathon.demoMedia}
                  alt={`${hackathon.project} demo`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 896px) 100vw, 896px"
                />
              </div>
            )}
          </div>
        )}

        {/* Story */}
        <div className="mb-12">
          <p className="text-xs font-mono text-[var(--fg-subtle)] uppercase tracking-widest mb-4">
            The build
          </p>
          <p className="text-sm text-[var(--fg-muted)] leading-7 max-w-2xl">
            {hackathon.story}
          </p>
        </div>

        {/* GitHub link */}
        {hackathon.href && (
          <div className="mb-16">
            <a
              href={hackathon.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-[var(--fg)] border border-[var(--border)] px-4 py-2 rounded-lg hover:border-[var(--fg-muted)] transition-colors"
            >
              <Github size={14} strokeWidth={1.5} />
              View on GitHub
            </a>
          </div>
        )}

        <Divider />

        {/* Photo gallery */}
        {hackathon.gallery && hackathon.gallery.length > 0 && (
          <div className="mt-16">
            <p className="text-xs font-mono text-[var(--fg-subtle)] uppercase tracking-widest mb-8">
              Scenes
            </p>
            <div className="columns-2 sm:columns-3 gap-4 space-y-4">
              {hackathon.gallery.map((src, i) => (
                <div
                  key={i}
                  className="break-inside-avoid relative overflow-hidden rounded-lg bg-[var(--border)]"
                  style={{ aspectRatio: i % 3 === 1 ? "4/5" : "4/3" }}
                >
                  <Image
                    src={src}
                    alt={`${hackathon.project} scene ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </article>
      <div className="max-w-4xl mx-auto px-6">
        <Divider />
      </div>
      <Footer />
    </>
  );
}
