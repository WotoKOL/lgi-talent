import { Reveal } from "./motion";
import "./creator-application-process.css";

const steps = [
  {
    title: "Submit Your Profile",
    text: "Share your channels, audience, and what you want to build next.",
  },
  {
    title: "Team Review",
    text: "We review your content, past partnerships, and growth goals.",
  },
  {
    title: "Initial Conversation",
    text: "Let’s talk about your creative direction and the support you need.",
  },
  {
    title: "Partnership Confirmation",
    text: "We discuss the terms and make sure the partnership is the right fit.",
  },
  {
    title: "Creator Profile Setup",
    text: "We get to know your content and prepare your profile for brand opportunities.",
  },
  {
    title: "Brand Matching",
    text: "We connect your voice with relevant brands and partnership opportunities.",
  },
];

export function CreatorApplicationProcess() {
  return (
    <section
      className="creator-application"
      aria-labelledby="creator-application-title"
    >
      <div className="creator-application__inner">
        <Reveal className="creator-application__heading">
          <p className="creator-application__eyebrow">
            <span>03</span> THE APPLICATION PROCESS
          </p>
          <h2 id="creator-application-title">
            Your path to <span>LGI.</span>
          </h2>
          <p className="creator-application__description">
            A thoughtful process to find the right fit, from your first hello
            to your next brand partnership.
          </p>
        </Reveal>

        <ol className="creator-application__steps" role="list">
          {steps.map((step, index) => (
            <li className="creator-application__step" key={step.title}>
              <Reveal
                className="creator-application__entry"
                delay={(index % 3) * 80}
                duration={850}
              >
                <span className="creator-application__number" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>

        <p className="creator-application__note">
          Applying does not guarantee representation. If your profile fits,
          our team will be in touch to discuss next steps.
        </p>
      </div>
    </section>
  );
}
