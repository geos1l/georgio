export interface Project {
  title: string;
  year: number;
  description: string;
  thumbnail: string;
  href: string;      // GitHub
  liveUrl?: string;  // live site / download
  tags?: string[];
}

// Shipped projects shown on home page
export const projects: Project[] = [
  {
    title: "nba career simulator",
    year: 2025,
    description: "simulate entire NBA careers for any player, projecting stats, trades, and legacy across seasons.",
    thumbnail: "/projects/NbaCareerSim-thumbnail.png",
    href: "https://github.com/geos1l/NBA-Career-Simulator",
    liveUrl: "https://github.com/geos1l/NBA-Career-Simulator",
    tags: ["TypeScript", "React", "Python"],
  },
  {
    title: "skauti",
    year: 2026,
    description: "offline-first FRC scouting PWA with QR/AirDrop P2P sync. adopted by real teams within a week.",
    thumbnail: "/projects/Skauti-thumbnail.png",
    href: "https://github.com/geos1l/skauti",
    liveUrl: "https://skauti.ca",
    tags: ["TypeScript", "PWA", "QR"],
  },
  {
    title: "incinerator",
    year: 2026,
    description: "Windows disk cleanup app — score, stage, and incinerate files with a floating drag-and-drop firepit",
    thumbnail: "/projects/Incinerator-thumbnail.png",
    href: "https://github.com/geos1l/Incinerator-Windows",
    liveUrl: "https://github.com/geos1l/Incinerator-Windows/releases/tag/v1.0.1",
    tags: ["TypeScript"],
  },
];
