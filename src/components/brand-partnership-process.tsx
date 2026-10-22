import Image from "next/image";
import { Reveal } from "./motion";
import { BrandProcessFlow } from "./brand-process-flow";
import "./brand-partnership-process.css";

const steps = [
  "Submit Your Brief",
  "Initial Consultation",
  "Strategy & Creator Shortlist",
  "Scope & Contracting",
  "Content & Execution",
  "Go Live & Approval",
  "Performance Recap",
];

export function BrandPartnershipProcess() {
  return (
    <section className="brand-process" aria-labelledby="brand-process-title">
      <div className="brand-process__layout">
        <Reveal className="brand-process__visual" variant="image">
          <Image
            src="/images/brand-partnership-process.png"
            alt="Five friends leaning together around a camera beneath a bright blue sky"
            fill
            unoptimized
            sizes="(max-width: 760px) 360px, 35vw"
          />
        </Reveal>

        <div className="brand-process__content">
          <Reveal className="brand-process__heading" variant="right">
            <p className="brand-process__eyebrow"><span>03</span> HOW WE WORK</p>
            <h2 id="brand-process-title">Brand Partnership<br /><span>Process</span></h2>
          </Reveal>

          <Reveal className="brand-process__path" delay={140}>
            <BrandProcessFlow steps={steps} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
