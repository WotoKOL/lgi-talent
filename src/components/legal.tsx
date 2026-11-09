import Link from "next/link";

export function LegalPage({
  title,
  intro,
  sections,
}: {
  title: string;
  intro: string;
  sections: { title: string; text: string }[];
}) {
  return (
    <article className="legal-page section-wrap">
      <span className="eyebrow">LGI / LEGAL</span>
      <h1>{title}</h1>
      <p className="legal-intro">{intro}</p>
      {sections.map((s) => (
        <section key={s.title}>
          <h2>{s.title}</h2>
          <p>{s.text}</p>
        </section>
      ))}
      <p>
        Questions? Contact <a href="mailto:linkingglobal@wotokol.com">linkingglobal@wotokol.com</a>.
      </p>
      <Link href="/contact" className="text-link">
        Get in touch ↗
      </Link>
    </article>
  );
}
