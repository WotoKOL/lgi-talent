import Link from "next/link";
import Image from "next/image";
import type { MouseEventHandler } from "react";
import { site } from "@/lib/site";

export function Brand({ footer = false, onClick }: {
  footer?: boolean;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}) {
  return (
    <Link
      href="/"
      className={`brand ${footer ? "brand-footer" : ""}`}
      aria-label={`${site.fullName} home`}
      onClick={onClick}
    >
      <Image
        className="brand-image"
        src="/logos/lgi-wordmark.png"
        width={1000}
        height={358}
        alt=""
        loading={footer ? "lazy" : "eager"}
      />
    </Link>
  );
}
