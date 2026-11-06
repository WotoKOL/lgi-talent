"use client";

import { Suspense, type ReactNode } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { CaseAudience } from "@/lib/case-studies";
import { caseDetailHref, caseListHref, parseCaseFilter } from "@/lib/case-study-navigation";

type Props = { audience: CaseAudience; className?: string; children: ReactNode };

function ResolvedCaseListLink({ audience, className, children }: Props) {
  const params = useSearchParams();
  return (
    <Link href={caseListHref(audience, parseCaseFilter(params.get("format")))} className={className}>
      {children}
    </Link>
  );
}

export function CaseListLink(props: Props) {
  return (
    <Suspense fallback={<Link href={caseListHref(props.audience)} className={props.className}>{props.children}</Link>}>
      <ResolvedCaseListLink {...props} />
    </Suspense>
  );
}

type DetailProps = { slug: string; className?: string; children: ReactNode };

function ResolvedCaseDetailLink({ slug, className, children }: DetailProps) {
  const params = useSearchParams();
  return (
    <Link href={caseDetailHref(slug, parseCaseFilter(params.get("format")))} className={className}>
      {children}
    </Link>
  );
}

export function CaseDetailLink(props: DetailProps) {
  return (
    <Suspense fallback={<Link href={caseDetailHref(props.slug)} className={props.className}>{props.children}</Link>}>
      <ResolvedCaseDetailLink {...props} />
    </Suspense>
  );
}
