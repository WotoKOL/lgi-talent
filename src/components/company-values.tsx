import Image from "next/image";
import type { CSSProperties } from "react";
import { Reveal } from "./motion";
import "./company-values.css";

const values = [
  { title: "Authenticity", x: "17%", y: "49%" },
  { title: "Professionalism", x: "35%", y: "38%" },
  { title: "Respect", x: "57%", y: "30%" },
  { title: "Long-Term Cooperation", x: "78%", y: "47%" },
  { title: "Global Perspective", x: "97%", y: "14.5%" },
];

export function CompanyValues() {
  return (
    <section className="company-values" aria-labelledby="company-values-title">
      <div className="company-values__exhibit">
        <div className="company-values__scene">
          <Reveal className="company-values__image" variant="image">
            <Image
              src="/images/about-values-pillars.png"
              alt="Five concrete pillars of different heights casting long shadows across a monochrome architectural landscape"
              fill
              unoptimized
              sizes="100vw"
            />
          </Reveal>

          <Reveal className="company-values__heading">
            <p className="company-values__eyebrow" aria-hidden="true">02</p>
            <h2 id="company-values-title">Our <span>Values</span></h2>
          </Reveal>

          <div className="company-values__markers" aria-hidden="true">
            {values.map((value, index) => (
              <span
                className="company-values__marker"
                key={value.title}
                style={{ "--pillar-x": value.x, "--pillar-y": value.y } as CSSProperties}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
            ))}
          </div>
        </div>

        <ol className="company-values__list" role="list">
          {values.map((value, index) => (
            <li className="company-values__item" key={value.title}>
              <Reveal className="company-values__entry" delay={index * 90} duration={850}>
                <span className="company-values__index" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{value.title}</h3>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
