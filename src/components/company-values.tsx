import Image from "next/image";
import { Reveal } from "./motion";
import "./company-values.css";

const values = [
  "Authenticity",
  "Professionalism",
  "Respect",
  "Long-Term Cooperation",
  "Global Perspective",
];

export function CompanyValues() {
  return (
    <section className="company-values" aria-labelledby="company-values-title">
      <div className="company-values__inner">
        <Reveal className="company-values__heading">
          <p className="company-values__eyebrow"><span>02</span> WHAT GUIDES US</p>
          <h2 id="company-values-title">Our Values</h2>
        </Reveal>

        <Reveal className="company-values__architecture" variant="image">
          <Image
            src="/images/about-values-pillars.webp"
            alt="Minimal concrete architecture with clean lines and a circular opening in a monochrome landscape"
            fill
            sizes="100vw"
          />
        </Reveal>

        <ol className="company-values__list" role="list">
          {values.map((value, index) => (
            <li className="company-values__item" key={value}>
              <Reveal className="company-values__entry" delay={index * 80} duration={850}>
                <span className="company-values__index" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{value}</h3>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
