import { ActionLink } from "@/components/sections";
export default function NotFound() {
  return (
    <section className="not-found section-wrap">
      <span className="eyebrow">404 / A MISSED CONNECTION</span>
      <h1>
        LET’S GET YOU
        <br />
        <em>BACK ON TRACK.</em>
      </h1>
      <p>This page has moved, or the link took a wrong turn.</p>
      <ActionLink href="/">Back to home</ActionLink>
    </section>
  );
}
