import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Pizza,
  Calendar,
  Clock,
  Settings,
  BarChart3,
  Menu as MenuIcon,
  Plus,
  Eye
} from "lucide-react";
import pizzaLogo from "@/assets/pizza-logo.png";

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

export const Sidebar = ({ activeView, onViewChange }: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { id: "menus", label: "Menus", icon: Pizza },
    { id: "schedule", label: "Schedule", icon: Calendar },
    { id: "preview", label: "Preview", icon: Eye },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className={`${isCollapsed ? "w-16" : "w-64"} transition-all duration-300 h-screen bg-gradient-card border-r border-border`}>
      <div className="p-4">
        {!isCollapsed && (
          <div className="flex items-center gap-3 mb-8">
            <img src={pizzaLogo} alt="Pizza Menu Pro" className="w-8 h-8" />
            <h1 className="font-bold text-xl bg-gradient-hero bg-clip-text text-transparent">
              Pizza Menu Pro
            </h1>
          </div>
        )}
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="mb-4 w-full justify-start"
        >
          <MenuIcon className="h-4 w-4" />
          {!isCollapsed && <span className="ml-2">Collapse</span>}
        </Button>
      </div>

      <nav className="px-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          
          return (
            <Button
              key={item.id}
              variant={isActive ? "pizza" : "ghost"}
              className={`w-full mb-1 justify-start ${isCollapsed ? "px-2" : "px-4"}`}
              onClick={() => onViewChange(item.id)}
            >
              <Icon className="h-4 w-4" />
              {!isCollapsed && <span className="ml-3">{item.label}</span>}
            </Button>
          );
        })}
      </nav>

      <div className="absolute bottom-4 left-2 right-2">
        <Button
          variant="hero"
          className={`w-full ${isCollapsed ? "px-2" : "px-4"}`}
          onClick={() => onViewChange("create")}
        >
          <Plus className="h-4 w-4" />
          {!isCollapsed && <span className="ml-2">New Menu</span>}
        </Button>
      </div>
    </div>
  );
};