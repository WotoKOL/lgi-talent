import type { CaseAudience } from "./case-studies";

export type CaseFilter = "All" | "Online" | "Offline";

export function parseCaseAudience(value: string | string[] | undefined): CaseAudience {
  return value === "creators" ? "Creators" : "Brands";
}

export function parseCaseFilter(value: string | string[] | null | undefined): CaseFilter {
  return value === "online" ? "Online" : value === "on-site" ? "Offline" : "All";
}

export function caseListHref(audience: CaseAudience, filter: CaseFilter = "All") {
  const query = new URLSearchParams();
  if (audience === "Creators") query.set("audience", "creators");
  if (filter !== "All") query.set("format", filter === "Online" ? "online" : "on-site");
  return `/case-studies${query.size ? `?${query}` : ""}#main-content`;
}

export function caseDetailHref(slug: string, filter: CaseFilter = "All") {
  return `/case-studies/${slug}${filter === "All" ? "" : `?format=${filter === "Online" ? "online" : "on-site"}`}`;
}
