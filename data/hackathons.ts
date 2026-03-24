export interface Hackathon {
  name: string;
  slug: string;
  year: number;
  result: string;
  description: string;
  story: string;
  thumbnail: string;
  demoMedia?: string;
  demoIsVideo?: boolean;
  href?: string;
  project?: string;
  tags?: string[];
  gallery?: string[];
}

export const hackathons: Hackathon[] = [
  {
    name: "HackCanada",
    slug: "hackcanada-2026",
    year: 2026,
    result: "built scorched",
    description: "geospatial ML pipeline for urban heat prediction across Toronto.",
    story: "Built Scorched over 36 hours at HackCanada 2026. The idea came from noticing how unevenly heat distributes across Toronto during summer — some neighbourhoods run 4–5°C hotter than others purely due to land cover and density. We scraped satellite imagery, weather station data, and urban land-use classifications, then trained an XGBoost + PyTorch ensemble to predict surface temperatures at a 30m resolution. The final model hit 1.46°C MAE and 0.80 R² on holdout data. Built a FastAPI backend and a Mapbox-powered frontend to visualize the predictions as an interactive heatmap.",
    thumbnail: "/projects/Scorched-Thumbnail.png",
    demoMedia: "/projects/hackcanada-demo.png",
    demoIsVideo: false,
    href: "https://github.com/geos1l/scorched",
    project: "scorched",
    tags: ["PyTorch", "XGBoost", "FastAPI", "Mapbox", "Python"],
    gallery: [
      "/projects/hackcanada-gallery-1.png",
      "/projects/hackcanada-gallery-2.png",
      "/projects/hackcanada-gallery-3.png",
    ],
  },
  {
    name: "UTRA Hacks",
    slug: "utra-hacks",
    year: 2026,
    result: "built match overlay",
    description: "real-time scoreboard + live LLM commentary system for robotics track race.",
    story: "At UTRA Hacks we built Match Overlay — a system that injects AI commentary directly into a live sports stream. We captured game state in real time (score, player positions, key events), fed it into an LLM with a prompt tuned for colour commentary, and pushed the generated text as an overlay onto the video feed with sub-second latency. The hardest part was keeping the commentary coherent across multiple LLM calls without it sounding repetitive — we ended up building a rolling context window that summarised recent commentary before each new generation.",
    thumbnail: "/projects/UTRA-thumbnail.png",
    demoMedia: "/projects/utrahacks-demo.png",
    demoIsVideo: false,
    href: "https://github.com/geos1l/utra_software_part",
    project: "match overlay",
    tags: ["TypeScript", "WebSockets", "OpenAI", "FFmpeg", "Node.js"],
    gallery: [
      "/projects/utrahacks-gallery-1.png",
      "/projects/utrahacks-gallery-2.png",
      "/projects/utrahacks-gallery-3.png",
    ],
  },
  {
    name: "HackHive",
    slug: "hackhive",
    year: 2026,
    result: "built aaang",
    description: "AI voice assistant that classifies prompts with Gemini and routes them to the best LLM using benchmark scoring.",
    story: "AAANG (Adaptive AI Agent for Next-gen queries) was our answer to a simple question: why use one LLM for everything when different models are best at different tasks? We built a voice-first interface that records your prompt, transcribes it, classifies it by task type using Gemini, then queries an internal benchmark database to pick the highest-scoring model for that category. Coding questions go to one model, reasoning tasks to another, creative writing to a third. The routing logic cut average benchmark error by ~18% over always using the same model.",
    thumbnail: "/projects/AAANG-thumbnail.png",
    demoMedia: "/projects/hackhive-demo.png",
    demoIsVideo: false,
    href: "https://github.com/geos1l/Hackhive-2026",
    project: "aaang",
    tags: ["Gemini", "Python", "Voice", "React", "FastAPI"],
    gallery: [
      "/projects/hackhive-gallery-1.png",
      "/projects/hackhive-gallery-2.png",
      "/projects/hackhive-gallery-3.png",
    ],
  },
];
