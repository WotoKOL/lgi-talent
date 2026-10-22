import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MoveUpRight } from "lucide-react";
import { LogoSequence } from "./logo-sequence";
import { Reveal } from "./motion";
import "./creator-brand-network.css";

const brands = [
  ["samsung", "Samsung"],
  ["stanley", "Stanley"],
  ["gymshark", "Gymshark"],
  ["huawei", "Huawei"],
  ["byd", "BYD"],
  ["hisense", "Hisense"],
  ["lenovo", "Lenovo"],
  ["haier", "Haier"],
  ["tcl", "TCL"],
  ["tiktok", "TikTok"],
  ["dji", "DJI"],
  ["anker", "Anker"],
  ["alibaba", "Alibaba Group"],
  ["temu", "Temu"],
  ["oppo", "OPPO"],
  ["ugreen", "UGREEN"],
  ["xiaomi", "Xiaomi"],
] as const;

export function CreatorBrandNetwork() {
  return (
    <section id="brand-network" className="creator-brand-network" aria-labelledby="creator-brand-title">
      <div className="creator-brand-network__inner">
        <Reveal className="creator-brand-network__masthead">
          <p><span aria-hidden="true" /> IN GOOD COMPANY</p>
          <span>GLOBAL CONNECTIONS. PERSONAL POSSIBILITIES.</span>
        </Reveal>

        <div className="creator-brand-network__layout">
          <Reveal className="creator-brand-network__intro" variant="left">
            <h2 id="creator-brand-title">Trusted by<br />global brands.</h2>
            <p className="creator-brand-network__signature">
              <MoveUpRight size={22} strokeWidth={1.4} aria-hidden="true" />
              <span>Connected by LGI.</span>
            </p>
            <p className="creator-brand-network__description">
              From consumer tech and smart home to digital platforms and global
              e-commerce, LGI works with brands across industries to bring their
              products, stories, and creators to audiences around the world.
            </p>
          </Reveal>

          <div className="creator-brand-network__directory">
            <Reveal className="creator-brand-network__directory-heading">
              <p>THE BRAND NETWORK</p>
            </Reveal>
            <LogoSequence>
              {brands.map(([file, name]) => (
                <div className="creator-brand-network__logo" key={file} data-brand={file}>
                  <Image
                    src={`/logos/transparent/${file}.png`}
                    alt={name}
                    width={140}
                    height={70}
                    unoptimized
                  />
                </div>
              ))}
              <Link className="creator-brand-network__invitation" href="/contact?audience=creator">
                <ArrowUpRight size={23} strokeWidth={1.5} aria-hidden="true" />
                <span>Your Next<br />Opportunity</span>
              </Link>
            </LogoSequence>
            <Reveal className="creator-brand-network__sectors" delay={120}>
              <span>Consumer tech</span>
              <span>Smart home</span>
              <span>Digital platforms</span>
              <span>Global commerce</span>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
