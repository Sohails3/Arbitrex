/**
 * Two worked runs of the Strategic Fit Engine, used to demonstrate the tool.
 *
 * The figures are taken from real runs — Duolingo in buy mode, Wayflyer in
 * sell mode — and are illustrative of the output shape rather than live data.
 * Anything the engine itself would flag as model-derived is flagged here too.
 */

export type Criterion = { id: string; name: string; why: string };
export type Ranked = { rank: number; name: string; meta: string; score: number };
export type ScoreLine = { id: string; label: string; score: number };

export type Run = {
  mode: "buy" | "sell";
  /** Label on the toggle. */
  tab: string;
  /** The one-line framing of what this mode does. */
  premise: string;
  counterpartyRole: string;
  counterparty: string;
  sector: string;
  geography: string;
  /** What the engine goes looking for. */
  universeLabel: string;
  /** Step 1 output — what the engine read the counterparty's logic to be. */
  dnaHeadline: string;
  dnaPoints: { label: string; value: string }[];
  /** The four criteria derived from the counterparty, not from a template. */
  criteria: Criterion[];
  ranked: Ranked[];
  /** Full breakdown for the top-ranked name. */
  top: {
    name: string;
    meta: string;
    total: number;
    scores: ScoreLine[];
    summary: string;
    risk: string;
  };
};

const GENERIC_CRITERIA = [
  "Technology & IP",
  "Market position",
  "Team & talent",
  "Legal & regulatory",
];

export const RUNS: Run[] = [
  {
    mode: "buy",
    tab: "Buy-side",
    premise:
      "A strategic buyer wants to know what to acquire. The engine reads the buyer's own deal history first, then scores the market against it.",
    counterpartyRole: "Buyer",
    counterparty: "Duolingo",
    sector: "Coding education and developer learning",
    geography: "Europe: UK, Germany, France, Nordics, Netherlands",
    universeLabel: "targets",
    dnaHeadline:
      "Three sub-$50m acqui-hires of creative and gaming studios: a product-first buyer, not a revenue buyer.",
    dnaPoints: [
      { label: "Acquisitions read", value: "NextBeat 2025 · Hobbes 2024 · Gunner 2022" },
      { label: "Pattern", value: "Talent and IP tuck-ins under $50m" },
      { label: "Deal range", value: "$20m floor · $50–200m sweet spot" },
      { label: "Gap identified", value: "No presence in coding education" },
    ],
    criteria: [
      {
        id: "C1",
        name: "Mobile-native code execution",
        why: "Codecademy remains desktop-first; a mobile code runtime would leapfrog the market leader's core weakness.",
      },
      {
        id: "C2",
        name: "Breadth of language coverage",
        why: "Codecademy's 40-language catalogue is its main defensibility; entering narrow means entering behind.",
      },
      {
        id: "C3",
        name: "AI tutoring integration readiness",
        why: "A target already running LLM feedback slots into Duolingo Max without a rebuild.",
      },
      {
        id: "C4",
        name: "Gamification loop alignment",
        why: "Streaks, XP and bite-sized lessons are the buyer's actual product architecture, not a nice-to-have.",
      },
    ],
    ranked: [
      { rank: 1, name: "Mimo", meta: "Germany · Series B · $10m ARR", score: 30 },
      { rank: 2, name: "Enki", meta: "United Kingdom · Series A · $0.5m ARR", score: 28 },
      { rank: 3, name: "CoderPad", meta: "France · Series B · €18m ARR", score: 24 },
      { rank: 4, name: "Coderize", meta: "Germany · Seed · €1m ARR", score: 24 },
      { rank: 5, name: "Codecademy Europe / Qualified.io", meta: "United Kingdom · Growth", score: 23 },
      { rank: 6, name: "Scrimba", meta: "Netherlands · Bootstrapped · $1.9m ARR", score: 22 },
      { rank: 7, name: "Codio", meta: "United Kingdom · Growth · $9m ARR", score: 22 },
      { rank: 8, name: "Checkio", meta: "Netherlands · Series A · $4m ARR", score: 22 },
      { rank: 9, name: "Futurice Learning", meta: "Finland · Bootstrapped", score: 20 },
      { rank: 10, name: "Hackages", meta: "France · Seed", score: 18 },
    ],
    top: {
      name: "Mimo",
      meta: "Germany · Series B · $10m ARR · $28.6m raised",
      total: 30,
      scores: [
        { id: "C1", label: "Mobile-native code execution", score: 4 },
        { id: "C2", label: "Breadth of language coverage", score: 3 },
        { id: "C3", label: "AI tutoring integration readiness", score: 2 },
        { id: "C4", label: "Gamification loop alignment", score: 5 },
        { id: "C5", label: GENERIC_CRITERIA[0], score: 4 },
        { id: "C6", label: GENERIC_CRITERIA[1], score: 4 },
        { id: "C7", label: GENERIC_CRITERIA[2], score: 4 },
        { id: "C8", label: GENERIC_CRITERIA[3], score: 4 },
      ],
      summary:
        "Mimo is the closest structural match to how Duolingo already builds: a mobile-first, gamified daily-lesson product with in-app code execution and 15m downloads on $28.6m raised. It scores top of the list on the criterion the buyer cannot compromise on, and lowest on the one it can build.",
      risk: "No AI tutoring layer to inherit; that gap is a six-to-nine month post-close build, not a day-one capability.",
    },
  },
  {
    mode: "sell",
    tab: "Sell-side",
    premise:
      "A seller wants to know who should buy them. Same engine, inverted: it derives what would make an acquirer want this asset, then scores the acquirer universe.",
    counterpartyRole: "Seller",
    counterparty: "Wayflyer",
    sector: "FinTech SaaS: embedded SMB capital",
    geography: "UK, Ireland and Europe",
    universeLabel: "acquirers",
    dnaHeadline:
      "A proprietary multi-source underwriting engine that the largest banks chose to fund rather than replicate.",
    dnaPoints: [
      { label: "Core asset", value: "Real-time ad, POS and banking underwriting" },
      { label: "Market proof", value: "$300m JPMorgan debt line" },
      { label: "Deal range", value: "$1.8bn–$3.0bn expectation" },
      { label: "Constraint", value: "Buyer must absorb $1bn+ debt facilities" },
    ],
    criteria: [
      {
        id: "C1",
        name: "Underwriting capability gap",
        why: "Scores highest where the acquirer has no real-time SMB credit model and relies on bureau scoring.",
      },
      {
        id: "C2",
        name: "Balance sheet and M&A firepower",
        why: "At a $1.8bn–$3.0bn expectation, only acquirers with $1bn+ deal precedent are credible without a consortium.",
      },
      {
        id: "C3",
        name: "Embedded finance urgency",
        why: "Every month of delay locks the best distribution into a competitor; urgency is itself a valuation input.",
      },
      {
        id: "C4",
        name: "Commerce data and distribution synergy",
        why: "Merchant-base overlap decides whether the underwriting engine gets fed on day one or in year two.",
      },
    ],
    ranked: [
      { rank: 1, name: "Shopify", meta: "Canada · 2m+ merchants", score: 32 },
      { rank: 2, name: "Stripe", meta: "United States · private", score: 32 },
      { rank: 3, name: "Adyen", meta: "Netherlands · listed", score: 30 },
      { rank: 4, name: "Salesforce", meta: "United States · listed", score: 29 },
      { rank: 5, name: "Intuit", meta: "United States · listed", score: 29 },
      { rank: 6, name: "PayPal Holdings", meta: "United States · listed", score: 27 },
      { rank: 7, name: "Mastercard", meta: "United States · listed", score: 25 },
      { rank: 8, name: "Block (Square)", meta: "United States · listed", score: 25 },
      { rank: 9, name: "Worldline", meta: "France · listed", score: 25 },
      { rank: 10, name: "Klarna", meta: "Sweden · listed", score: 24 },
    ],
    top: {
      name: "Shopify",
      meta: "Canada · 2m+ merchants · $2.1bn Deliverr precedent",
      total: 32,
      scores: [
        { id: "C1", label: "Underwriting capability gap", score: 3 },
        { id: "C2", label: "Balance sheet and M&A firepower", score: 5 },
        { id: "C3", label: "Embedded finance urgency", score: 2 },
        { id: "C4", label: "Commerce data and distribution synergy", score: 5 },
        { id: "C5", label: GENERIC_CRITERIA[0], score: 4 },
        { id: "C6", label: GENERIC_CRITERIA[1], score: 5 },
        { id: "C7", label: GENERIC_CRITERIA[2], score: 4 },
        { id: "C8", label: GENERIC_CRITERIA[3], score: 4 },
      ],
      summary:
        "Shopify is the highest-conviction acquirer: its merchant base is Wayflyer's borrower profile, Shopify Capital is the product the underwriting engine would immediately upgrade, and the Deliverr deal proves it can execute at this size. The deal logic is defensible to a board in one sentence.",
      risk: "Shopify Capital is already live in its core markets, which lowers urgency; the argument has to be built on model quality, not on absence.",
    },
  },
];

/** The four steps the engine runs, in order. Same in both modes. */
export const STEPS = [
  {
    title: "Read the counterparty first",
    text: "Before any names are gathered, the engine works through the counterparty's own acquisition history, earnings commentary and stated strategy: what they have actually bought, at what size, and to fill which gap.",
  },
  {
    title: "Derive the rubric from that",
    text: "Four criteria come out of that reading, specific to this counterparty and traceable to something they did. Four generic criteria (technology, market, team, legal) complete the scoring frame.",
  },
  {
    title: "Discover and score the universe",
    text: "Companies are gathered against the brief and scored 1–5 on all eight criteria, with a sentence of reasoning per score. Totals are recalculated arithmetically rather than trusted from the model.",
  },
  {
    title: "Output the argument, not the list",
    text: "A ranked table, a full breakdown per shortlisted name, deal-breaker risks stated explicitly, and a disclaimer separating what was verified from what was model-derived, delivered as HTML and as a deck.",
  },
] as const;
