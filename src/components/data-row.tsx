import { cn } from "@/lib/utils";

/** §8.4 — provenance variants. Each colour carries real meaning. */
export type Provenance = "register" | "filed" | "estimated" | "other";

const CHIP: Record<Provenance, { className: string; label: string }> = {
  register: { className: "bg-[#dcfce7] text-[#15803d]", label: "Register" },
  filed: { className: "bg-[#dbeafe] text-[#1d4ed8]", label: "Filed" },
  estimated: { className: "bg-[#fef3c7] text-[#b45309]", label: "Est." },
  other: { className: "bg-[#f1e4e5] text-[#7d5f62]", label: "Other" },
};

export function Chip({
  variant,
  children,
  className,
}: {
  variant: Provenance;
  children?: React.ReactNode;
  className?: string;
}) {
  const chip = CHIP[variant];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5",
        "text-[10px] font-medium tracking-wide uppercase",
        chip.className,
        className,
      )}
    >
      {children ?? chip.label}
    </span>
  );
}

/** §8.5 — fixed 44px row, 20px horizontal padding, hairline bottom border. */
export function DataRow({
  name,
  value,
  variant,
  avatar,
  className,
}: {
  name: string;
  value: string;
  variant: Provenance;
  avatar?: { initials: string; color: string };
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid h-11 grid-cols-[minmax(110px,1fr)_auto_auto] items-center gap-3 px-5",
        "border-b border-navy-800 transition-colors duration-150 last:border-b-0 hover:bg-navy-850",
        className,
      )}
    >
      <span className="flex min-w-0 items-center gap-3 text-sm font-medium text-slate-200">
        {avatar && (
          <span
            aria-hidden
            className="grid size-5.5 shrink-0 place-items-center rounded-full text-[10px] font-bold text-white"
            style={{ background: avatar.color }}
          >
            {avatar.initials}
          </span>
        )}
        <span className="truncate">{name}</span>
      </span>

      {/* §8.4 — estimates carry the dashed underline as well as the chip */}
      <span
        className={cn(
          "text-sm font-semibold text-slate-100 tabular-nums",
          variant === "estimated" && "is-estimated",
        )}
      >
        {value}
      </span>

      <Chip variant={variant} />
    </div>
  );
}

/** Header strip used at the top of every panel. */
export function PanelBar({ left, right }: { left: string; right?: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-navy-800 bg-navy-850 px-5 py-2.5">
      <span className="text-xs font-semibold tracking-wide uppercase text-slate-500">{left}</span>
      {right && (
        <span className="text-xs font-semibold tracking-wide uppercase text-slate-500">{right}</span>
      )}
    </div>
  );
}
