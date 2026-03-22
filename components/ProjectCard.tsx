import Image from "next/image";
import { ExternalLink, Github } from "lucide-react";

export interface CardItem {
  title: string;
  year: number;
  description: string;
  thumbnail?: string;
  href: string;      // GitHub — main card click
  liveUrl?: string;  // live site / download
  badge?: string;    // optional label e.g. "hackathon"
}

export default function ProjectCard({ data }: { data: CardItem }) {
  return (
    <div className="group flex flex-col gap-3">
      <a
        href={data.href}
        target="_blank"
        rel="noopener noreferrer"
        className="block transition-transform duration-200 hover:scale-[1.02]"
      >
        <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-[var(--border)]">
          {data.thumbnail && (
            <Image
              src={data.thumbnail}
              alt={data.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          )}
        </div>
      </a>

      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <a
              href={data.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-[var(--fg)] hover:underline underline-offset-4 truncate"
            >
              {data.title}
            </a>
            {data.badge && (
              <span className="text-xs font-mono text-[var(--fg-subtle)] uppercase tracking-wider shrink-0">
                {data.badge}
              </span>
            )}
          </div>
          <p className="text-xs text-[var(--fg-muted)] mt-1 leading-relaxed">
            {data.description}
          </p>
          {data.liveUrl && (
            <a
              href={data.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 mt-2 text-xs text-[var(--fg-subtle)] hover:text-[var(--fg)] transition-colors"
            >
              <ExternalLink size={11} strokeWidth={1.5} />
              live
            </a>
          )}
        </div>
        <span className="text-xs font-mono text-[var(--fg-subtle)] shrink-0 mt-0.5">
          {data.year}
        </span>
      </div>
    </div>
  );
}
