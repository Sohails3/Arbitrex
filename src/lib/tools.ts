import { Radar, Target, type LucideIcon } from "lucide-react";

export type Tool = {
  slug: string;
  href: string;
  /** Short label used in the nav. */
  nav: string;
  Icon: LucideIcon;
  /** Full name, used as the page title. */
  name: string;
  /** Who the tool is for — one short line above the name on cards. */
  audience: string;
  /** One line, used on the home page grid. */
  summary: string;
  /** The question the tool answers, phrased as the user would ask it. */
  question: string;
  /** Three-word-ish description of what it operates on. */
  input: string;
  output: string;
};

/**
 * Single source of truth for the two tools. The nav, the home page grid and
 * each tool page all read this, so a rename happens in one place.
 *
 * These are examples of what we build, not the business itself — the site
 * should never read as though Arbitrex is one product.
 */
export const TOOLS: Tool[] = [
  {
    slug: "origination-engine",
    href: "/origination-engine",
    nav: "Origination Engine",
    Icon: Radar,
    name: "Private Equity Origination Engine",
    audience: "For private equity origination teams",
    summary:
      "Screens the register on your mandate criteria, scores what matches, and tells you when something changes.",
    question: "Which companies fit our mandate, and what moved this week?",
    input: "The companies register and filed accounts",
    output: "A live, scored shortlist that keeps itself current",
  },
  {
    slug: "strategic-fit-engine",
    href: "/strategic-fit-engine",
    nav: "Strategic Fit Engine",
    Icon: Target,
    name: "Strategic Fit Engine",
    audience: "For M&A advisers and corporate development",
    summary:
      "Derives a buyer's acquisition logic from its own deal history, then scores the universe against it.",
    question: "Who should buy this company, or what should this buyer acquire?",
    input: "A named counterparty, a sector and a geography",
    output: "A ranked, scored and sourced target or acquirer list",
  },
];

export const TOOL_BY_SLUG = Object.fromEntries(
  TOOLS.map((tool) => [tool.slug, tool]),
) as Record<string, Tool>;
