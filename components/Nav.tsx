"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/gallery", label: "Gallery" },
];

const socialLinks = [
  {
    href: "https://x.com/geos1l",
    icon: Twitter,
    label: "Twitter",
  },
  {
    href: "https://linkedin.com/in/georgio-silvea/",
    icon: Linkedin,
    label: "LinkedIn",
  },
  {
    href: "https://github.com/geos1l",
    icon: Github,
    label: "GitHub",
  },
  {
    href: "mailto:gsilvea@uwaterloo.ca",
    icon: Mail,
    label: "Email",
  },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-sm bg-[var(--bg)]/80 border-b border-[var(--border)]">
      <div className="max-w-4xl mx-auto px-6 h-12 flex items-center justify-between">
        <div className="flex items-center gap-6">
{navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm transition-colors ${
                pathname === link.href
                  ? "text-[var(--fg)]"
                  : "text-[var(--fg-muted)] hover:text-[var(--fg)]"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          {socialLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.href}
                href={link.href}
                target={link.href.startsWith("mailto") ? undefined : "_blank"}
                rel={link.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                aria-label={link.label}
                className="text-[var(--fg-subtle)] hover:text-[var(--fg)] transition-colors"
              >
                <Icon size={15} strokeWidth={1.5} />
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
