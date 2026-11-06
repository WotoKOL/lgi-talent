import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import NotFound from "@/app/not-found";
import { caseStudiesEnabled } from "@/lib/features";

export default function CaseNotFound() {
  if (!caseStudiesEnabled) return <NotFound />;
  return (
    <section className="not-found section-wrap">
      <span className="eyebrow">CASE STUDIES / 404</span>
      <h1>This story<br />isn’t here.</h1>
      <p>Explore our projects and collaboration approaches to find your next connection.</p>
      <Link href="/case-studies#main-content" className="button button-primary">
        <ArrowLeft size={18} aria-hidden="true" /> Back to case studies
      </Link>
    </section>
  );
}
