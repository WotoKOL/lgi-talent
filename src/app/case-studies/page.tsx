import localFont from "next/font/local";
import { notFound } from "next/navigation";
import { CallToAction, PageHero } from "@/components/sections";
import { WorkGallery } from "@/components/work-gallery";
import { createMetadata } from "@/lib/site";
import { caseStudiesEnabled } from "@/lib/features";
import { parseCaseAudience, parseCaseFilter } from "@/lib/case-study-navigation";
import styles from "./case-studies.module.css";

const caseHeading = localFont({
  src: "../../../public/fonts/home-heading-black.ttf",
  weight: "900",
  variable: "--font-case-heading",
  display: "swap",
});

export const metadata = caseStudiesEnabled ? createMetadata({
  title: "Brand Campaigns & Creator Partnerships",
  description:
    "Explore LGI’s approach to creator campaigns, product launches, trade shows, brand activations, and long-term creator partnerships.",
  path: "/case-studies",
}) : { robots: { index: false, follow: false } };
export default async function WorkPage({
  searchParams,
}: {
  searchParams: Promise<{ audience?: string | string[]; format?: string | string[] }>;
}) {
  if (!caseStudiesEnabled) notFound();
  const query = await searchParams;
  const audience = parseCaseAudience(query.audience);
  const filter = parseCaseFilter(query.format);
  return (
    <>
      <PageHero
        title={
          <>
            Growing Brands.
            <br />
            <em>Empowering Creators.</em>
          </>
        }
        description="From brand marketing campaigns to creator partnership stories — see how LGI connects brands, creators, and global markets."
        image="case-tcl"
        alt="Creators and a consumer technology brand at a live event"
        grayscale
      />
      <section
        className={`${styles.section} ${caseHeading.variable}`}
        id="main-content"
        aria-labelledby="case-studies-heading"
      >
        <div className={styles.inner}>
          <div className={styles.header}>
            <h2 id="case-studies-heading" className={styles.heading}>
              From strategy to execution.
            </h2>
            <p className={styles.description}>
              Explore project goals, creator strategy, execution, and results.
            </p>
          </div>
          <WorkGallery key={`${audience}-${filter}`} initialAudience={audience} initialFilter={filter} />
        </div>
      </section>
      <CallToAction />
    </>
  );
}
