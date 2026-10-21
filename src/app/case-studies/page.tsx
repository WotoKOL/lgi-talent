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
        eyebrow="OUR WORK / BRANDS MEET CREATORS"
        title={
          <>
            GOOD CONNECTIONS.
            <br />
            <em>GREAT POSSIBILITIES.</em>
          </>
        }
        description="From the stories on your screen to the moments you show up for. We connect brands, creators, and global markets."
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
            Ways we bring
            <br />
            brands to life.
          </h2>
          <p>
            Discover our campaign formats and creator support. Tell us your
            category and we’ll share relevant partnership examples.
          </p>
        </div>
        <WorkGallery />
      </section>
      <CallToAction />
    </>
  );
}
