import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, Smartphone, Monitor, Tablet, DollarSign } from "lucide-react";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  available: boolean;
}

interface Menu {
  id: string;
  name: string;
  items: MenuItem[];
  schedule: string;
}

export const MenuPreview = () => {
  const [viewMode, setViewMode] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [selectedMenu, setSelectedMenu] = useState("lunch");

  const sampleMenu: Menu = {
    id: "1",
    name: "Lunch Menu",
    items: [
      {
        id: "1",
        name: "Margherita Pizza",
        description: "Fresh tomato sauce, mozzarella cheese, and fresh basil leaves",
        price: 14.99,
        category: "Pizza",
        available: true,
      },
      {
        id: "2",
        name: "Pepperoni Pizza",
        description: "Classic pepperoni with mozzarella cheese and tomato sauce",
        price: 16.99,
        category: "Pizza",
        available: true,
      },
      {
        id: "3",
        name: "Caesar Salad",
        description: "Crisp romaine lettuce with parmesan cheese and croutons",
        price: 9.99,
        category: "Salads",
        available: true,
      },
      {
        id: "4",
        name: "Garlic Bread",
        description: "Freshly baked bread with garlic butter and herbs",
        price: 5.99,
        category: "Appetizers",
        available: true,
      },
    ],
    schedule: "11:00 AM - 3:00 PM",
  };

  const groupedItems = sampleMenu.items.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, MenuItem[]>);

  const getViewportClass = () => {
    switch (viewMode) {
      case "mobile":
        return "max-w-sm mx-auto";
      case "tablet":
        return "max-w-2xl mx-auto";
      default:
        return "max-w-4xl mx-auto";
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Menu Preview</h2>
          <p className="text-muted-foreground">See how your menus will appear to customers</p>
        </div>
        
        <div className="flex gap-2">
          <Button
            variant={viewMode === "desktop" ? "pizza" : "outline"}
            size="sm"
            onClick={() => setViewMode("desktop")}
          >
            <Monitor className="h-4 w-4 mr-2" />
            Desktop
          </Button>
          <Button
            variant={viewMode === "tablet" ? "pizza" : "outline"}
            size="sm"
            onClick={() => setViewMode("tablet")}
          >
            <Tablet className="h-4 w-4 mr-2" />
            Tablet
          </Button>
          <Button
            variant={viewMode === "mobile" ? "pizza" : "outline"}
            size="sm"
            onClick={() => setViewMode("mobile")}
          >
            <Smartphone className="h-4 w-4 mr-2" />
            Mobile
          </Button>
        </div>
      </div>

      {/* Preview Container */}
      <div className="border-2 border-dashed border-border rounded-lg p-4 bg-muted/30">
        <div className={`${getViewportClass()} transition-all duration-300`}>
          {/* Customer Menu Display */}
          <div className="bg-gradient-card rounded-lg shadow-warm overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-hero text-primary-foreground p-6">
              <h1 className="text-2xl font-bold text-center">Tony's Pizza Palace</h1>
              <p className="text-center text-primary-foreground/80 mt-1">
                Authentic Italian Pizza Since 1985
              </p>
            </div>

            {/* Menu Info */}
            <div className="p-4 border-b border-border">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-foreground">{sampleMenu.name}</h2>
                <Badge variant="outline" className="text-pizza-orange border-pizza-orange">
                  {sampleMenu.schedule}
                </Badge>
              </div>
            </div>

            {/* Menu Items */}
            <div className="p-4">
              {Object.entries(groupedItems).map(([category, items]) => (
                <div key={category} className="mb-6">
                  <h3 className="text-lg font-semibold text-pizza-brown mb-3 border-b border-pizza-cream pb-2">
                    {category}
                  </h3>
                  <div className="space-y-3">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between items-start p-3 hover:bg-pizza-cream/50 rounded-lg transition-colors cursor-pointer"
                      >
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground">{item.name}</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            {item.description}
                          </p>
                        </div>
                        <div className="ml-4 text-right">
                          <div className="flex items-center text-pizza-red font-semibold">
                            <DollarSign className="h-4 w-4" />
                            {item.price.toFixed(2)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="bg-muted p-4 text-center text-sm text-muted-foreground">
              <p>All prices include tax • Ask about our daily specials</p>
            </div>
          </div>
        </div>
      </div>

      {/* Preview Info */}
      <div className="mt-6">
        <Card className="bg-gradient-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Eye className="h-4 w-4" />
              <span>
                This is how your "{sampleMenu.name}" will appear to customers on {viewMode} devices
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};