import Image from "next/image";
import Link from "next/link";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, MoveUpRight } from "lucide-react";
import { CaseContents } from "@/components/case-contents";
import { CaseDetailLink, CaseListLink } from "@/components/case-list-link";
import { caseStudies, getCaseStudy } from "@/lib/case-studies";
import { createMetadata } from "@/lib/site";
import { caseStudiesEnabled } from "@/lib/features";
import styles from "./case-detail.module.css";

const caseHeading = localFont({
  src: "../../../../public/fonts/home-heading-black.ttf",
  weight: "900",
  variable: "--font-case-detail",
  display: "swap",
});

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return caseStudiesEnabled ? caseStudies.map(({ slug }) => ({ slug })) : [];
}

export async function generateMetadata({ params }: Props) {
  if (!caseStudiesEnabled) notFound();
  const item = getCaseStudy((await params).slug);
  if (!item) notFound();
  return createMetadata({
    title: item.headline,
    description: item.summary,
    path: `/case-studies/${item.slug}`,
    image: `/images/case-formats/${item.image}.webp`,
  });
}

export default async function CaseDetailPage({ params }: Props) {
  if (!caseStudiesEnabled) notFound();
  const item = getCaseStudy((await params).slug);
  if (!item) notFound();
  const isCreator = item.audience === "Creators";
  const isProject = item.kind === "project";
  const audienceLabel = isCreator ? "Creator opportunities" : "Brand partnerships";
  const related = caseStudies
    .filter((candidate) => candidate.audience === item.audience && candidate.slug !== item.slug)
    .sort((a, b) => Number(b.kind === "project") - Number(a.kind === "project"))
    .slice(0, 2);

  return (
    <div className={`${styles.page} ${caseHeading.variable}`}>
      <section className={styles.hero} id="main-content" aria-labelledby="case-title">
        <div className={styles.container}>
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <CaseListLink audience={item.audience}>
              <ArrowLeft size={15} aria-hidden="true" />
              {audienceLabel}
            </CaseListLink>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{item.eyebrow}</span>
          </nav>

          <div className={styles.intro}>
            <div>
              <p className={styles.eyebrow}>
                <span aria-hidden="true" />
                {isProject ? "PROJECT STORY" : isCreator ? "CREATOR COLLABORATIONS" : "CAMPAIGN APPROACH"}
              </p>
              <h1 id="case-title">{item.headline}</h1>
            </div>
            <div className={styles.summary}>
              <p>{item.summary}</p>
              <a className={styles.explore} href="#overview">
                {isProject ? "Explore the project" : "Explore the approach"}
                <ArrowDown size={16} aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className={styles.visual} data-project={item.slug} data-kind={item.kind}>
            <div className={styles.visualGrid} aria-hidden="true" />
            <span className={styles.orbit} aria-hidden="true" />
            {!isProject ? (
              <div className={styles.visualImage}>
                <Image
                  src={`/images/case-formats/${item.image}.webp`}
                  alt=""
                  fill
                  preload
                  sizes="(max-width: 700px) 45vw, 460px"
                />
              </div>
            ) : null}
            <div className={styles.visualTop}>
              <span>LGI / {item.cover.kicker}</span>
              <MoveUpRight size={26} strokeWidth={1} aria-hidden="true" />
            </div>
            <p className={styles.visualTitle}>{item.cover.title}</p>
            <div className={styles.visualBottom}>
              <span>{item.cover.line}</span>
              <span>LINKING PEOPLE. MAKING STORIES.</span>
            </div>
          </div>

          <div className={styles.tags} aria-label="Project topics">
            {item.tags.map((tag) => <span key={tag}>{tag}</span>)}
          </div>
        </div>
      </section>

      <div className={styles.story}>
        <div className={styles.container}>
          <dl className={styles.facts}>
            {item.facts.map((fact) => (
              <div key={fact.label}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>

          {item.metrics.length ? (
            <div className={styles.metrics} aria-label="Project facts and figures">
              {item.metrics.map((metric) => (
                <div key={metric.label}>
                  <strong>{metric.value}</strong>
                  <span>{metric.label}</span>
                  {metric.note ? <p>{metric.note}</p> : null}
                </div>
              ))}
            </div>
          ) : null}

          <div className={styles.articleLayout}>
            <aside className={styles.sidebar}>
              <p>IN THIS STORY</p>
              <CaseContents key={item.slug} />
              <CaseListLink audience={item.audience} className={styles.sidebarBack}>
                <ArrowLeft size={15} aria-hidden="true" /> All {isCreator ? "creator" : "brand"} cases
              </CaseListLink>
            </aside>

            <article className={styles.article} aria-label={item.headline}>
              <section id="overview" className={styles.articleSection}>
                <span className={styles.sectionLabel}>01 / THE CONTEXT</span>
                <h2>{isProject ? "The challenge behind the story." : "Where a good partnership begins."}</h2>
                <p className={styles.lead}>{item.challenge}</p>
              </section>

              <section id="approach" className={styles.articleSection}>
                <span className={styles.sectionLabel}>02 / OUR APPROACH</span>
                <h2>{isProject ? "From the first brief to the final detail." : "A clear plan. A dedicated team."}</h2>
                <ol className={styles.steps}>
                  {item.approach.map((step, index) => (
                    <li key={step.title}>
                      <span className={styles.stepNumber}>0{index + 1}</span>
                      <div><h3>{step.title}</h3><p>{step.text}</p></div>
                    </li>
                  ))}
                </ol>
              </section>

              <section id="delivery" className={styles.articleSection}>
                <span className={styles.sectionLabel}>03 / CONTENT & DELIVERY</span>
                <h2>{isCreator ? "More room for your best work." : "The work that brings it together."}</h2>
                <div className={styles.deliverables}>
                  {item.deliverables.map((deliverable, index) => (
                    <div key={deliverable.title}>
                      <span className={styles.deliveryNumber}>0{index + 1}</span>
                      <h3>{deliverable.title}</h3>
                      <p>{deliverable.text}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section id="outcome" className={styles.articleSection}>
                <span className={styles.sectionLabel}>04 / {isProject ? "THE OUTCOME" : "THE PURPOSE"}</span>
                <h2>{isProject ? "Beyond a single moment." : "Built around what comes next."}</h2>
                <p className={styles.lead}>{item.outcome}</p>
                {item.measurementNote ? <p className={styles.measurementNote}>{item.measurementNote}</p> : null}
              </section>

              <div className={styles.cta}>
                <span className={styles.sectionLabel}>LET’S MAKE A CONNECTION</span>
                <h2>{isCreator ? "Your voice. New possibilities." : "Your next project starts here."}</h2>
                <p>{isCreator ? "Bring your point of view. We’ll bring brand connections and business support." : "Tell us your market, your audience, and what you want to make happen."}</p>
                <Link href={isCreator ? "/contact?audience=creator" : "/contact"} className={styles.ctaButton}>
                  {isCreator ? "Explore creator representation" : "Plan a similar project"}
                  <ArrowUpRight size={20} aria-hidden="true" />
                </Link>
              </div>
            </article>
          </div>
        </div>
      </div>

      <section className={styles.related} aria-labelledby="related-case-heading">
        <div className={styles.container}>
          <div className={styles.relatedHeading}>
            <div><span className={styles.sectionLabel}>KEEP EXPLORING</span><h2 id="related-case-heading">More ways we connect.</h2></div>
            <CaseListLink audience={item.audience} className={styles.allCases}>
              All {isCreator ? "creator" : "brand"} cases <ArrowRight size={18} aria-hidden="true" />
            </CaseListLink>
          </div>
          <div className={styles.relatedGrid}>
            {related.map((next) => (
              <CaseDetailLink slug={next.slug} key={next.slug} className={styles.relatedCard}>
                <div className={styles.relatedImage}>
                  <Image src={`/images/case-formats/${next.image}.webp`} alt="" fill sizes="(max-width: 700px) 100vw, (max-width: 1440px) 45vw, 630px" />
                  <span className={styles.relatedArrow} aria-hidden="true"><ArrowUpRight size={24} /></span>
                </div>
                <span className={styles.relatedEyebrow}>{next.eyebrow}</span>
                <h3>{next.cardTitle}</h3>
                <p>{next.cardDescription}</p>
              </CaseDetailLink>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
