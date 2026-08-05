/**
 * A template (rather than a layout) remounts on every navigation, so the enter
 * animation replays each time you move between pages. Without this, routes
 * swap instantly and read like a jump-scroll on one long page.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
