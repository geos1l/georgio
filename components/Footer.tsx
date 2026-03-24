export default function Footer() {
  return (
    <footer className="w-full max-w-4xl mx-auto px-6 py-8 flex items-center justify-between">
      <p className="text-xs text-[var(--fg-subtle)] font-mono">
        © Georgio Silvea 2026
      </p>
      <div className="flex items-center gap-2">
        <a
          href="https://cs.uwatering.com/#gsilvea.com?nav=prev"
          className="text-xs text-[var(--fg-subtle)] hover:text-[var(--fg)] transition-colors"
        >
          ←
        </a>
        <a href="https://cs.uwatering.com/#gsilvea.com" target="_blank" rel="noopener noreferrer">
          <img
            src="https://cs.uwatering.com/icon.black.svg"
            alt="CS Webring"
            className="w-6 h-auto opacity-80 dark:hidden"
          />
          <img
            src="https://cs.uwatering.com/icon.white.svg"
            alt="CS Webring"
            className="w-6 h-auto opacity-80 hidden dark:block"
          />
        </a>
        <a
          href="https://cs.uwatering.com/#gsilvea.com?nav=next"
          className="text-xs text-[var(--fg-subtle)] hover:text-[var(--fg)] transition-colors"
        >
          →
        </a>
      </div>
    </footer>
  );
}
