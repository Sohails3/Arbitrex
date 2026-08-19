import { Blocks, Sparkles, Workflow, type LucideIcon } from "lucide-react";

export type Service = {
  slug: string;
  Icon: LucideIcon;
  title: string;
  /** One line, used on the home page grid. */
  summary: string;
  /** Longer positioning, used on the services page. */
  body: string;
  /** Concrete examples of the work. */
  examples: string[];
  /** How an engagement typically runs. */
  engagement: string;
};

/** Single source of truth — the home page grid and /services both read this. */
export const SERVICES: Service[] = [
  {
    slug: "bespoke-software",
    Icon: Blocks,
    title: "Bespoke software builds",
    summary:
      "Internal tools and workflow systems built for one firm, around the way that firm actually works.",
    body:
      "Off-the-shelf software makes a firm bend its process to fit the tool. For the work that defines how you operate (pipeline, portfolio monitoring, reporting), that trade is the wrong way round. We build the system around the process instead.",
    examples: [
      "Deal pipeline and origination tracking",
      "Portfolio monitoring and KPI dashboards",
      "Investor and internal reporting systems",
      "Bespoke screening and research tooling",
    ],
    engagement:
      "Scoped as a project, delivered in stages, with something usable in your hands early rather than at the end.",
  },
  {
    slug: "workflow-automation",
    Icon: Workflow,
    title: "Workflow automation",
    summary:
      "Removing the manual steps around your existing systems rather than replacing them.",
    body:
      "Most lost hours are not in the analysis. They are in the assembly around it: collecting the same data, reformatting the same figures, regenerating the same documents. That work is repetitive enough to hand to a machine, and it is the fastest thing to fix.",
    examples: [
      "Data collection and reconciliation",
      "Document and pack generation",
      "Recurring reporting cycles",
      "Integrations between tools that do not talk",
    ],
    engagement:
      "Usually the shortest engagement of the three, and the easiest place to start if you want to see how we work.",
  },
  {
    slug: "ai-implementation",
    Icon: Sparkles,
    title: "AI and agent implementation",
    summary:
      "Language models put to work where they genuinely help, and kept out of where they do not.",
    body:
      "AI is worth deploying on the parts of the job that are genuinely language work: reading long documents, synthesising research, drafting. It is not worth deploying where a wrong answer is expensive and unverifiable. We are explicit about that line, and we build so the output can always be checked against its source.",
    examples: [
      "Document and filing analysis",
      "Diligence and research synthesis",
      "First-draft memo and paper preparation",
      "Internal knowledge search across your own material",
    ],
    engagement:
      "Built with the source visible behind every output, so the work can be checked rather than taken on trust.",
  },
];
