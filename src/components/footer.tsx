import Link from "next/link";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { navigation } from "@/lib/content";
import { site } from "@/lib/site";
import { Brand } from "./brand";
import "./footer.css";

const footerNavigation = [
  { href: "/", label: "Home" },
  ...navigation,
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="lgi-footer" aria-label="LGI footer">
      <div className="lgi-footer__inner">
        <div className="lgi-footer__main">
          <div className="lgi-footer__identity">
            <Brand footer />
            <p className="lgi-footer__statement">
              <span>Linking brands.</span>
              <span>Empowering creators.</span>
            </p>
            <p className="lgi-footer__perspective">
              Los Angeles roots. Global connections.
            </p>
          </div>

          <nav className="lgi-footer__navigation" aria-label="Footer navigation">
            <p className="lgi-footer__label">Explore</p>
            <ul>
              {footerNavigation.map((item, index) => (
                <li key={item.href}>
                  <Link href={item.href}>
                    <span className="lgi-footer__index" aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="lgi-footer__link-label">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lgi-footer__contact">
            <p className="lgi-footer__label">Good things start with a hello</p>
            <a className="lgi-footer__email" href={`mailto:${site.email}`}>
              <span>{site.email}</span>
              <span className="lgi-footer__email-arrow" aria-hidden="true">
                <ArrowUpRight size={22} strokeWidth={1.6} />
              </span>
            </a>
            <div className="lgi-footer__location">
              <p className="lgi-footer__location-label">
                <span aria-hidden="true" /> Based in Greater Los Angeles
              </p>
              <address>
                <span>17800 Castleton St, Ste 665</span>
                <span>
                  {site.address.addressLocality}, {site.address.addressRegion}{" "}
                  {site.address.postalCode}
                </span>
                <span>United States</span>
              </address>
            </div>
          </div>
        </div>

        <div className="lgi-footer__bottom">
          <p>© {new Date().getFullYear()} LGI. All rights reserved.</p>
          <nav className="lgi-footer__legal" aria-label="Legal navigation">
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/cookies">Cookie Policy</Link>
            <Link href="/terms">Terms of Service</Link>
          </nav>
          <a className="lgi-footer__back-top" href="#top">
            <span>Back to top</span>
            <span aria-hidden="true">
              <ArrowUp size={16} strokeWidth={1.5} />
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
