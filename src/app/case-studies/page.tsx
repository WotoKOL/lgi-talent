import { CallToAction, PageHero, SectionLabel } from "@/components/sections";
import { WorkGallery } from "@/components/work-gallery";
import { createMetadata } from "@/lib/site";

export const metadata = createMetadata({
  title: "Brand Campaigns & Creator Partnerships",
  description:
    "Explore LGI’s approach to creator campaigns, product launches, trade shows, brand activations, and long-term creator partnerships.",
  path: "/case-studies",
});
export default function WorkPage() {
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
      />
      <section
        className="section-wrap light-section work-section"
        id="main-content"
      >
        <SectionLabel number="01">FROM STRATEGY TO EXECUTION</SectionLabel>
        <div className="section-heading">
          <h2>
            From Strategy
            <br />
            to Execution
          </h2>
          <p>
            See how each project came together — the market goals, creator
            strategy, execution, and results.
          </p>
        </div>
        <WorkGallery />
      </section>
      <CallToAction />
    </>
  );
}
