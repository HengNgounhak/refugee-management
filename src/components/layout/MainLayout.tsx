import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

type UserRole = "camp" | "pcdm" | "ncdm" | "public";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const [role, setRole] = useState<UserRole>("public");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Determine role from URL
    if (location.pathname.startsWith("/public")) {
      setRole("public");
    } else if (location.pathname.startsWith("/camp")) {
      setRole("camp");
    } else if (location.pathname.startsWith("/pcdm")) {
      setRole("pcdm");
    } else if (location.pathname.startsWith("/ncdm")) {
      setRole("ncdm");
    }
  }, [location.pathname]);

  const handleRoleChange = (newRole: UserRole) => {
    setRole(newRole);
    navigate(`/${newRole}/dashboard`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar role={role} onRoleChange={handleRoleChange} />
      
      <div className={`transition-all duration-300 ${sidebarCollapsed ? "ml-16" : "ml-64"}`}>
        {/* Top Bar */}
        <header className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b px-6 py-3">
          <div className="flex items-center justify-end gap-3">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-urgent text-urgent-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                3
              </span>
            </Button>
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                <User className="w-4 h-4" />
              </AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
