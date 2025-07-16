import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Pizza, 
  Calendar, 
  Clock, 
  TrendingUp, 
  Users, 
  DollarSign,
  Star,
  Eye
} from "lucide-react";

export const Dashboard = () => {
  const stats = [
    {
      title: "Active Menus",
      value: "6",
      icon: Pizza,
      change: "+2 this week",
      color: "text-pizza-red",
    },
    {
      title: "Scheduled Items",
      value: "24",
      icon: Calendar,
      change: "3 expiring soon",
      color: "text-pizza-orange",
    },
    {
      title: "Daily Views",
      value: "1,247",
      icon: Eye,
      change: "+12% from yesterday",
      color: "text-pizza-gold",
    },
    {
      title: "Revenue",
      value: "$3,450",
      icon: DollarSign,
      change: "+8% this month",
      color: "text-pizza-red",
    },
  ];

  const recentMenus = [
    { name: "Summer Special", status: "Active", items: 8, schedule: "12:00 PM - 8:00 PM" },
    { name: "Breakfast Menu", status: "Active", items: 6, schedule: "7:00 AM - 11:00 AM" },
    { name: "Weekend Deluxe", status: "Scheduled", items: 12, schedule: "Fri-Sun 5:00 PM - 10:00 PM" },
  ];

  const upcomingSchedules = [
    { menu: "Holiday Special", date: "Dec 24, 2024", time: "All Day" },
    { menu: "New Year Menu", date: "Dec 31, 2024", time: "6:00 PM - 2:00 AM" },
    { menu: "Winter Warmers", date: "Jan 1, 2025", time: "11:00 AM - 9:00 PM" },
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Welcome back, Tony! 👋
        </h1>
        <p className="text-muted-foreground">
          Here's what's happening with your pizza menus today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="bg-gradient-card hover:shadow-soft transition-all">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className={`text-xs ${stat.color}`}>{stat.change}</p>
                  </div>
                  <Icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Recent Menus */}
        <Card className="bg-gradient-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Pizza className="h-5 w-5 text-pizza-red" />
              Recent Menus
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentMenus.map((menu, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-pizza-cream/50 transition-colors">
                  <div>
                    <h4 className="font-medium text-foreground">{menu.name}</h4>
                    <p className="text-sm text-muted-foreground">{menu.items} items • {menu.schedule}</p>
                  </div>
                  <Badge variant={menu.status === "Active" ? "default" : "secondary"}>
                    {menu.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Schedules */}
        <Card className="bg-gradient-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-pizza-orange" />
              Upcoming Schedules
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingSchedules.map((schedule, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-pizza-cream/50 transition-colors">
                  <div>
                    <h4 className="font-medium text-foreground">{schedule.menu}</h4>
                    <p className="text-sm text-muted-foreground">{schedule.date}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-sm text-pizza-brown">
                      <Clock className="h-4 w-4 mr-1" />
                      {schedule.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bg-gradient-accent">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="hero" className="h-auto py-4 flex-col gap-2">
              <Pizza className="h-6 w-6" />
              <span>Create New Menu</span>
            </Button>
            <Button variant="pizza" className="h-auto py-4 flex-col gap-2">
              <Calendar className="h-6 w-6" />
              <span>Schedule Menu</span>
            </Button>
            <Button variant="menu" className="h-auto py-4 flex-col gap-2">
              <Eye className="h-6 w-6" />
              <span>Preview Menus</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};