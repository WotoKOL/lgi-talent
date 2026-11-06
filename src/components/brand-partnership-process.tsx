import Image from "next/image";
import { Reveal } from "./motion";
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
      <Reveal className="brand-process__heading">
        <p className="brand-process__eyebrow">03 / HOW WE WORK</p>
        <h2 id="brand-process-title">Brand Partnership Process</h2>
      </Reveal>
      <div className="brand-process__journey">
        <Image
          src="/images/brand-partnership-process.webp"
          alt="People moving through a bright public space"
          fill
          sizes="100vw"
        />
        <div className="brand-process__shade" aria-hidden="true" />
        <Reveal className="brand-process__flow-content">
          <ol className="brand-process__steps">
            {steps.map((step, index) => (
              <li className="brand-process__step" key={step}>
                <span className="brand-process__number">{String(index + 1).padStart(2, "0")}</span>
                <h3>{step}</h3>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
