import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Calendar, Clock, Plus, Edit, Trash2 } from "lucide-react";

interface Schedule {
  id: string;
  menuName: string;
  timeSlot: string;
  days: string[];
  startDate: string;
  endDate: string;
  active: boolean;
}

export const MenuScheduler = () => {
  const [schedules, setSchedules] = useState<Schedule[]>([
    {
      id: "1",
      menuName: "Breakfast Special",
      timeSlot: "7:00 AM - 11:00 AM",
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      active: true,
    },
    {
      id: "2",
      menuName: "Lunch Menu",
      timeSlot: "11:00 AM - 3:00 PM",
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      active: true,
    },
    {
      id: "3",
      menuName: "Dinner Special",
      timeSlot: "5:00 PM - 10:00 PM",
      days: ["Friday", "Saturday", "Sunday"],
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      active: true,
    },
  ]);

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newSchedule, setNewSchedule] = useState({
    menuName: "",
    timeSlot: "",
    days: [] as string[],
    startDate: "",
    endDate: "",
  });

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  const handleCreateSchedule = () => {
    if (!newSchedule.menuName || !newSchedule.timeSlot) return;

    const schedule: Schedule = {
      id: Date.now().toString(),
      ...newSchedule,
      active: true,
    };

    setSchedules([...schedules, schedule]);
    setNewSchedule({
      menuName: "",
      timeSlot: "",
      days: [],
      startDate: "",
      endDate: "",
    });
    setIsCreateDialogOpen(false);
  };

  const toggleDay = (day: string) => {
    const updatedDays = newSchedule.days.includes(day)
      ? newSchedule.days.filter(d => d !== day)
      : [...newSchedule.days, day];
    
    setNewSchedule({ ...newSchedule, days: updatedDays });
  };

  const toggleScheduleActive = (scheduleId: string) => {
    setSchedules(schedules.map(s => 
      s.id === scheduleId ? { ...s, active: !s.active } : s
    ));
  };

  const deleteSchedule = (scheduleId: string) => {
    setSchedules(schedules.filter(s => s.id !== scheduleId));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Menu Scheduler</h2>
          <p className="text-muted-foreground">Schedule menus for different times and dates</p>
        </div>
        
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="hero" className="shadow-warm">
              <Plus className="h-4 w-4 mr-2" />
              Create Schedule
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gradient-card max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Schedule</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Menu name"
                value={newSchedule.menuName}
                onChange={(e) => setNewSchedule({ ...newSchedule, menuName: e.target.value })}
              />
              <Input
                placeholder="Time slot (e.g., 11:00 AM - 3:00 PM)"
                value={newSchedule.timeSlot}
                onChange={(e) => setNewSchedule({ ...newSchedule, timeSlot: e.target.value })}
              />
              
              <div>
                <label className="text-sm font-medium mb-2 block">Days of Week</label>
                <div className="grid grid-cols-2 gap-2">
                  {daysOfWeek.map((day) => (
                    <Button
                      key={day}
                      variant={newSchedule.days.includes(day) ? "pizza" : "outline"}
                      size="sm"
                      onClick={() => toggleDay(day)}
                      className="text-xs"
                    >
                      {day.slice(0, 3)}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-sm font-medium mb-1 block">Start Date</label>
                  <Input
                    type="date"
                    value={newSchedule.startDate}
                    onChange={(e) => setNewSchedule({ ...newSchedule, startDate: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">End Date</label>
                  <Input
                    type="date"
                    value={newSchedule.endDate}
                    onChange={(e) => setNewSchedule({ ...newSchedule, endDate: e.target.value })}
                  />
                </div>
              </div>

              <Button onClick={handleCreateSchedule} className="w-full" variant="pizza">
                Create Schedule
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {schedules.map((schedule) => (
          <Card key={schedule.id} className="bg-gradient-card hover:shadow-soft transition-all">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-xl font-semibold text-foreground">{schedule.menuName}</h3>
                    <Badge variant={schedule.active ? "default" : "secondary"}>
                      {schedule.active ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-pizza-orange" />
                      <span className="text-sm text-muted-foreground">{schedule.timeSlot}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-pizza-orange" />
                      <span className="text-sm text-muted-foreground">
                        {schedule.startDate} to {schedule.endDate}
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {schedule.days.map((day) => (
                        <Badge key={day} variant="outline" className="text-xs">
                          {day.slice(0, 3)}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    variant={schedule.active ? "outline" : "pizza"}
                    size="sm"
                    onClick={() => toggleScheduleActive(schedule.id)}
                  >
                    {schedule.active ? "Deactivate" : "Activate"}
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deleteSchedule(schedule.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {schedules.length === 0 && (
        <Card className="text-center py-12 bg-gradient-card">
          <CardContent>
            <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No schedules created yet</h3>
            <p className="text-muted-foreground mb-4">
              Create your first menu schedule to get started
            </p>
            <Button variant="hero" onClick={() => setIsCreateDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Schedule
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};