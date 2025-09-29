import React from "react";
import { cn } from "./ui/utils";
import { Button } from "./ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "./ui/sidebar";
import {
  LayoutDashboard,
  Upload,
  FileText,
  CheckSquare,
  BarChart3,
  FileBarChart,
  Users,
  Settings,
  Bell,
  HelpCircle,
} from "lucide-react";

// Import your logo
import logo from "../assets/logo3d.png";

interface ProcurementSidebarProps {
  currentView: string;
  onNavigate: (view: string) => void;
}

export default function ProcurementSidebar({
  currentView,
  onNavigate,
}: ProcurementSidebarProps) {
  const menuItems = [
    {
      id: "dashboard",
      label: "RFX Dashboard",
      icon: LayoutDashboard,
      description: "Manage all RFX projects",
    },
    {
      id: "upload",
      label: "Upload Offers",
      icon: Upload,
      description: "Upload supplier offers",
    },
    {
      id: "processing",
      label: "Processing",
      icon: FileText,
      description: "File ingestion status",
    },
    {
      id: "review",
      label: "Line Item Review",
      icon: CheckSquare,
      description: "Review extracted data",
    },
    {
      id: "analysis",
      label: "Analysis Results",
      icon: BarChart3,
      description: "Comprehensive analysis",
    },
    {
      id: "report",
      label: "Executive Report",
      icon: FileBarChart,
      description: "Generate final report",
    },
    {
      id: "recommendation",
      label: "Recommendations",
      icon: Users,
      description: "Supplier recommendations",
    },
  ];

  return (
    <Sidebar className="w-65 border-r border-border">
      <SidebarHeader className="p-6">
        <div className="flex items-center space-x-3">
          {/* Replace the C with your logo */}
          <div className="w-12 h-12 flex items-center justify-center">
            <img
              src={logo}
              alt="ClarityChain Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <h2 className="font-semibold text-foreground">
              ClarityChain
            </h2>
            <p className="text-sm text-muted-foreground">
              Procurement Intelligence
            </p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.id}>
              <SidebarMenuButton
                onClick={() => onNavigate(item.id)}
                className={cn(
                  "w-full flex items-center space-x-4 p-6 min-h-20 rounded-lg transition-colors group",
                  currentView === item.id
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "hover:bg-accent text-foreground",
                )}
              >
                <item.icon
                  className={cn(
                    "w-6 h-6",
                    currentView === item.id
                      ? "text-primary-foreground"
                      : "text-muted-foreground group-hover:text-accent-foreground",
                  )}
                />
                <div className="flex-1 text-left">
                  <div className="font-medium text-base">
                    {item.label}
                  </div>
                  <div
                    className={cn(
                      "text-sm",
                      currentView === item.id
                        ? "text-primary-foreground/80"
                        : "text-muted-foreground",
                    )}
                  >
                    {item.description}
                  </div>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="p-3 space-y-2">
        <Button
          variant="ghost"
          className="w-full justify-start"
          size="sm"
        >
          <Bell className="w-4 h-4 mr-2" />
          Notifications
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start"
          size="sm"
        >
          <Settings className="w-4 h-4 mr-2" />
          Settings
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start"
          size="sm"
        >
          <HelpCircle className="w-4 h-4 mr-2" />
          Help & Support
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}