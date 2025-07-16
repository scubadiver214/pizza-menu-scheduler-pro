import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Dashboard } from "@/components/Dashboard";
import { MenuBuilder } from "@/components/MenuBuilder";
import { MenuScheduler } from "@/components/MenuScheduler";
import { MenuPreview } from "@/components/MenuPreview";

const Index = () => {
  const [activeView, setActiveView] = useState("dashboard");

  const renderContent = () => {
    switch (activeView) {
      case "menus":
      case "create":
        return <MenuBuilder />;
      case "schedule":
        return <MenuScheduler />;
      case "preview":
        return <MenuPreview />;
      case "analytics":
        return <Dashboard />;
      case "settings":
        return <Dashboard />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar activeView={activeView} onViewChange={setActiveView} />
      <main className="flex-1 overflow-auto">
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;
