import { cn } from "@/lib/utils";

type StatusType = "pending" | "approved" | "rejected" | "urgent" | "normal" | "active" | "inactive" | "flagged";

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

const statusStyles: Record<StatusType, string> = {
  pending: "bg-warning/10 text-warning border-warning/20",
  approved: "bg-success/10 text-success border-success/20",
  rejected: "bg-destructive/10 text-destructive border-destructive/20",
  urgent: "bg-urgent/10 text-urgent border-urgent/20",
  normal: "bg-muted text-muted-foreground border-border",
  active: "bg-success/10 text-success border-success/20",
  inactive: "bg-muted text-muted-foreground border-border",
  flagged: "bg-orange-500/10 text-orange-600 border-orange-500/20",
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border capitalize",
        statusStyles[status],
        className
      )}
    >
      {status}
    </span>
  );
}
