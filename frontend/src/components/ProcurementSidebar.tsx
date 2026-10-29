import React from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  useSidebar,
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
  Sparkles,
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
  const { setOpenMobile } = useSidebar();
  const menuItems = [
    {
      id: "conversational",
      label: "Clare AI ",
      icon: Sparkles,
      description: "AI procurement assistant",
      badge: "AI",
    },
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
    <Sidebar className="border-r border-border">
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
                isActive={currentView === item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setOpenMobile(false);
                }}
                className="cc-nav-item w-full flex items-center space-x-4 p-6 min-h-20 rounded-lg"
              >
                <item.icon className="cc-nav-icon w-6 h-6" />
                <div className="flex-1 text-left">
                  <div className="font-medium text-base">
                    {item.label}
                    {item.badge && (
                      <Badge variant="secondary" className="h-5 px-1.5 text-[10px]">
                        {item.badge}
                      </Badge>
                    )}
                  </div>
                  <div className="cc-nav-desc text-sm">{item.description}</div>
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