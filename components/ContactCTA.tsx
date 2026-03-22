export default function ContactCTA() {
  return (
    <section className="w-full max-w-4xl mx-auto px-6 py-16">
      <p className="text-sm text-[var(--fg-muted)]">
        Say hi :) →{" "}
        <a
          href="mailto:gsilvea@uwaterloo.ca"
          className="text-[var(--fg)] hover:underline underline-offset-4 transition-all"
        >
          gsilvea@uwaterloo.ca
        </a>
      </p>
    </section>
  );
}
