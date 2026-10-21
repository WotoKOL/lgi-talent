import Link from "next/link";
import Image from "next/image";

export function Brand({ footer = false }: { footer?: boolean }) {
  return (
    <Link
      href="/"
      className={`brand ${footer ? "brand-footer" : ""}`}
      aria-label="LGI home"
    >
      <Image src="/logos/lgi-mark.png" width={40} height={40} alt="" />
      <span>
        LGI<span className="brand-period">.</span>
      </span>
      {footer ? (
        <small>
          LINKING GLOBAL
          <br />
          INFLUENCERS
        </small>
      ) : null}
    </Link>
  );
}
