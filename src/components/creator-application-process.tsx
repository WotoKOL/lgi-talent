import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Reveal } from "./motion";
import "./creator-application-process.css";

const steps = [
  "Submit Your Profile",
  "Team Review",
  "Initial Conversation",
  "Partnership Confirmation",
  "Creator Profile Setup",
  "Brand Matching",
];

export function CreatorApplicationProcess() {
  return (
    <section
      className="creator-application"
      aria-labelledby="creator-application-title"
    >
      <div className="creator-application__inner">
        <Reveal className="creator-application__heading">
          <div>
            <p className="creator-application__eyebrow">
              <span>03</span> THE APPLICATION PROCESS
            </p>
            <h2 id="creator-application-title">
              Your path to <span>LGI.</span>
            </h2>
          </div>
          <p className="creator-application__description">
            LGI evaluates each creator based on content, audience, past brand
            partnerships, and growth goals. Submitting an application does not
            guarantee representation. If your profile fits, our team will reach
            out to discuss next steps.
          </p>
        </Reveal>

        <div className="creator-application__scene">
          <Reveal className="creator-application__image" variant="scale">
            <Image
              src="/images/creator-application-scene.png"
              alt="Black, cream, and translucent creator portfolios with black-and-white portrait photographs"
              fill
              unoptimized
              sizes="(max-width: 760px) 100vw, 92vw"
            />
          </Reveal>

          <ol className="creator-application__steps" role="list">
            {steps.map((step, index) => (
              <li className="creator-application__step" key={step}>
                <Reveal
                  className="creator-application__card"
                  delay={index * 100}
                  duration={850}
                >
                  <span className="creator-application__number" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3>{step}</h3>
                </Reveal>
                {index < steps.length - 1 ? (
                  <ArrowRight
                    className="creator-application__connector"
                    aria-hidden="true"
                    strokeWidth={1.2}
                  />
                ) : null}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
