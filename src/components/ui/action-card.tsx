import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface ActionCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  variant?: "default" | "primary" | "accent";
}

const variantStyles = {
  default: {
    icon: "bg-muted text-foreground",
    hover: "hover:border-primary/30",
  },
  primary: {
    icon: "bg-primary text-primary-foreground",
    hover: "hover:border-primary",
  },
  accent: {
    icon: "bg-accent text-accent-foreground",
    hover: "hover:border-accent",
  },
};

export function ActionCard({ title, description, icon: Icon, href, variant = "default" }: ActionCardProps) {
  const styles = variantStyles[variant];

  return (
    <Link to={href} className={cn("action-card block", styles.hover)}>
      <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-4", styles.icon)}>
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="font-semibold mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </Link>
  );
}
