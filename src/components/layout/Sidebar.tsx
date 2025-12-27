import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  UserPlus,
  Package,
  ClipboardCheck,
  FileText,
  MapPin,
  Boxes,
  ChevronLeft,
  ChevronRight,
  Shield,
  Building2,
  Tent,
  Newspaper,
  PlusCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

type UserRole = "camp" | "pcdm" | "ncdm" | "public";

interface SidebarProps {
  role: UserRole;
  onRoleChange: (role: UserRole) => void;
}

const roleConfig = {
  public: {
    label: "សាធារណៈ",
    icon: Users,
    color: "bg-[hsl(40,85%,48%)]",
  },
  camp: {
    label: "បុគ្គលិកជំរុំ",
    icon: Tent,
    color: "bg-[hsl(199,89%,48%)]",
  },
  pcdm: {
    label: "គ.ជ.អ.រ ខេត្ត",
    icon: Building2,
    color: "bg-[hsl(262,83%,58%)]",
  },
  ncdm: {
    label: "គ.ជ.អ.រ ជាតិ",
    icon: Shield,
    color: "bg-[hsl(155,65%,38%)]",
  },
};

const navItems = {
  public: [
    { path: "/public/dashboard", label: "ផ្ទាំងគ្រប់គ្រង", icon: LayoutDashboard },
  ],
  camp: [
    { path: "/camp/dashboard", label: "ផ្ទាំងគ្រប់គ្រង", icon: LayoutDashboard },
    { path: "/camp/register", label: "ចុះឈ្មោះគ្រួសារ", icon: UserPlus },
    { path: "/camp/families", label: "គ្រួសារ", icon: Users },
    { path: "/camp/items", label: "សម្ភារៈ", icon: Package },
    { path: "/camp/confirm", label: "បញ្ជាក់សម្ភារៈ", icon: ClipboardCheck },
    { path: "/camp/request", label: "ស្នើសុំសម្ភារៈ", icon: FileText },
  ],
  pcdm: [
    { path: "/pcdm/dashboard", label: "ផ្ទាំងគ្រប់គ្រង", icon: LayoutDashboard },
    { path: "/pcdm/camps", label: "ទិន្នន័យជំរុំ", icon: MapPin },
    { path: "/pcdm/requests", label: "សំណើសម្ភារៈ", icon: FileText },
    { path: "/pcdm/allocate", label: "បែងចែកសម្ភារៈ", icon: Boxes },
    { path: "/pcdm/inventory", label: "ស្តុកសម្ភារៈ", icon: Package },
    { path: "/pcdm/users", label: "គ្រប់គ្រងអ្នកប្រើប្រាស់", icon: Users },
  ],
  ncdm: [
    { path: "/ncdm/dashboard", label: "ផ្ទាំងគ្រប់គ្រង", icon: LayoutDashboard },
    { path: "/ncdm/camps", label: "ទិន្នន័យជំរុំ", icon: MapPin },
    { path: "/ncdm/form-user", label: "ទម្រង់: អ្នកប្រើប្រាស់", icon: FileText },
    { path: "/ncdm/form-camp", label: "ទម្រង់: ជំរុំ", icon: FileText },
    { path: "/ncdm/form-family", label: "ទម្រង់: គ្រួសារ", icon: FileText },
    { path: "/ncdm/users", label: "គ្រប់គ្រងអ្នកប្រើប្រាស់", icon: Users },
    { path: "/ncdm/news", label: "គ្រប់គ្រងព័ត៌មាន", icon: Newspaper },
  ],
};

export function Sidebar({ role, onRoleChange }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const RoleIcon = roleConfig[role].icon;

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-screen bg-sidebar flex flex-col transition-all duration-300 z-50",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", roleConfig[role].color)}>
            <RoleIcon className="w-5 h-5 text-white" />
          </div>
          {!collapsed && (
            <div className="animate-fade-in">
              <h1 className="font-bold text-sidebar-foreground text-lg font-display">ប្រព័ន្ធសង្គ្រោះ</h1>
              <p className="text-xs text-sidebar-foreground/60">{roleConfig[role].label}</p>
            </div>
          )}
        </div>
      </div>

      {/* Role Selector */}
      {!collapsed && (
        <div className="p-3 border-b border-sidebar-border">
          <p className="text-xs text-sidebar-foreground/50 mb-2 px-1">ប្តូរតួនាទី</p>
          <div className="flex gap-1">
            {(Object.keys(roleConfig) as UserRole[]).map((r) => {
              const Icon = roleConfig[r].icon;
              return (
                <button
                  key={r}
                  onClick={() => onRoleChange(r)}
                  className={cn(
                    "flex-1 p-2 rounded-lg text-xs font-medium transition-all",
                    role === r
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground/60 hover:bg-sidebar-accent/50"
                  )}
                >
                  <Icon className="w-4 h-4 mx-auto mb-1" />
                  {r === "public" ? "សាធារណៈ" : r.toUpperCase()}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navItems[role].map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn("sidebar-nav-item", isActive && "active")}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span className="animate-fade-in">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-sidebar-border">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="sidebar-nav-item w-full"
        >
          {collapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <>
              <ChevronLeft className="w-5 h-5" />
              <span>បង្រួម</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}