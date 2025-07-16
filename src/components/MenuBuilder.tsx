import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Edit, Trash2, DollarSign } from "lucide-react";

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

export const MenuBuilder = () => {
  const [menus, setMenus] = useState<Menu[]>([
    {
      id: "1",
      name: "Lunch Menu",
      items: [
        {
          id: "1",
          name: "Margherita Pizza",
          description: "Fresh tomato sauce, mozzarella, and basil",
          price: 14.99,
          category: "Pizza",
          available: true,
        },
        {
          id: "2",
          name: "Pepperoni Pizza",
          description: "Classic pepperoni with mozzarella cheese",
          price: 16.99,
          category: "Pizza",
          available: true,
        },
      ],
      schedule: "11:00 AM - 3:00 PM",
    },
  ]);

  const [selectedMenu, setSelectedMenu] = useState<Menu | null>(menus[0]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    price: 0,
    category: "Pizza",
  });

  const categories = ["Pizza", "Appetizers", "Salads", "Desserts", "Beverages"];

  const handleCreateItem = () => {
    if (!selectedMenu || !newItem.name) return;

    const item: MenuItem = {
      id: Date.now().toString(),
      ...newItem,
      available: true,
    };

    const updatedMenu = {
      ...selectedMenu,
      items: [...selectedMenu.items, item],
    };

    setMenus(menus.map(m => m.id === selectedMenu.id ? updatedMenu : m));
    setSelectedMenu(updatedMenu);
    setNewItem({ name: "", description: "", price: 0, category: "Pizza" });
    setIsCreateDialogOpen(false);
  };

  const handleDeleteItem = (itemId: string) => {
    if (!selectedMenu) return;

    const updatedMenu = {
      ...selectedMenu,
      items: selectedMenu.items.filter(item => item.id !== itemId),
    };

    setMenus(menus.map(m => m.id === selectedMenu.id ? updatedMenu : m));
    setSelectedMenu(updatedMenu);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Menu Builder</h2>
          <p className="text-muted-foreground">Create and manage your pizza menus</p>
        </div>
        
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="hero" className="shadow-warm">
              <Plus className="h-4 w-4 mr-2" />
              Add Menu Item
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gradient-card">
            <DialogHeader>
              <DialogTitle>Create New Menu Item</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Item name"
                value={newItem.name}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              />
              <Textarea
                placeholder="Description"
                value={newItem.description}
                onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
              />
              <div className="flex gap-2">
                <Input
                  type="number"
                  step="0.01"
                  placeholder="Price"
                  value={newItem.price || ""}
                  onChange={(e) => setNewItem({ ...newItem, price: parseFloat(e.target.value) || 0 })}
                />
                <select
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2"
                  value={newItem.category}
                  onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <Button onClick={handleCreateItem} className="w-full" variant="pizza">
                Create Item
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Menu Selection */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Menus</h3>
          <div className="space-y-2">
            {menus.map((menu) => (
              <Card
                key={menu.id}
                className={`cursor-pointer transition-all hover:shadow-soft ${
                  selectedMenu?.id === menu.id ? "bg-gradient-accent shadow-warm" : ""
                }`}
                onClick={() => setSelectedMenu(menu)}
              >
                <CardContent className="p-4">
                  <h4 className="font-medium">{menu.name}</h4>
                  <p className="text-sm text-muted-foreground">{menu.schedule}</p>
                  <p className="text-sm text-pizza-brown">{menu.items.length} items</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Menu Items */}
        <div className="lg:col-span-2">
          {selectedMenu && (
            <>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">{selectedMenu.name} Items</h3>
                <Badge variant="secondary">{selectedMenu.items.length} items</Badge>
              </div>
              
              <div className="grid gap-4">
                {selectedMenu.items.map((item) => (
                  <Card key={item.id} className="bg-gradient-card hover:shadow-soft transition-all">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold text-foreground">{item.name}</h4>
                            <Badge variant="outline">{item.category}</Badge>
                          </div>
                          <p className="text-muted-foreground text-sm mb-2">{item.description}</p>
                          <div className="flex items-center gap-1 text-pizza-red font-semibold">
                            <DollarSign className="h-4 w-4" />
                            {item.price.toFixed(2)}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};