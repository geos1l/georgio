import Image from "next/image";

export default function Hero() {
  return (
    <section className="w-full max-w-4xl mx-auto px-6 pt-20 pb-16">
      <h1
        className="text-5xl text-[var(--fg)] leading-tight mb-10"
        style={{ fontFamily: "var(--font-instrument-serif)" }}
      >
        Georgio Silvea
      </h1>
      <div className="flex flex-col gap-1.5">
        <p className="text-sm text-[var(--fg-muted)]">
          —{" "}
          <a
            href="https://uwaterloo.ca"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 hover:text-[var(--fg)] transition-colors"
          >
            CS @ University of Waterloo
            <Image src="/waterloo-logo.png" alt="Waterloo" width={16} height={16} className="inline-block" />
          </a>
        </p>
        <p className="text-sm text-[var(--fg-muted)]">
          — aspiring ml engineer
        </p>
        <p className="text-sm text-[var(--fg-muted)]">
          — currently building cool stuff
        </p>

      </div>
    </section>
  );
}
