import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, X, Check, Grid2X2, BarChart3, AlertTriangle, HardDrive, Ticket } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface WidgetType {
  id: string;
  name: string;
  category: string;
  content: string;
  icon: React.ReactNode;
  description: string;
}

interface AddWidgetDialogProps {
  categoryId: string;
  onAddWidget: (categoryId: string, widget: { name: string; content: string }) => void;
  children?: React.ReactNode;
}

export function AddWidgetDialog({ categoryId, onAddWidget, children }: AddWidgetDialogProps) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedWidgets, setSelectedWidgets] = useState<string[]>([]);

  const availableWidgets: WidgetType[] = [
    { 
      id: "cloud-accounts", 
      name: "Cloud Accounts", 
      category: "CSPM", 
      content: "<CloudAccountsChart />",
      icon: <HardDrive className="h-5 w-5 text-blue-500" />,
      description: "View and manage your cloud provider accounts"
    },
    { 
      id: "risk-assessment", 
      name: "Risk Assessment", 
      category: "CSPM", 
      content: "<RiskAssessmentChart />",
      icon: <AlertTriangle className="h-5 w-5 text-orange-500" />,
      description: "Assess security risks across your cloud resources"
    },
    { 
      id: "workload-alerts", 
      name: "Workload Alerts", 
      category: "CWPP", 
      content: "<WorkloadAlerts />",
      icon: <AlertTriangle className="h-5 w-5 text-red-500" />,
      description: "Monitor and respond to workload security alerts"
    },
    { 
      id: "registry-scan", 
      name: "Registry Scan", 
      category: "Image", 
      content: "<RegistryScan />",
      icon: <Grid2X2 className="h-5 w-5 text-purple-500" />,
      description: "Scan container registries for vulnerabilities"
    },
    { 
      id: "ticket-overview", 
      name: "Ticket Overview", 
      category: "Ticket", 
      content: "<TicketOverview />",
      icon: <Ticket className="h-5 w-5 text-green-500" />,
      description: "Track and manage support tickets"
    },
  ];

  const filteredWidgets = availableWidgets.filter(widget => 
    widget.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    widget.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleWidgetToggle = (widgetId: string) => {
    setSelectedWidgets(prev => 
      prev.includes(widgetId) 
        ? prev.filter(id => id !== widgetId)
        : [...prev, widgetId]
    );
  };

  const handleConfirm = () => {
    selectedWidgets.forEach(widgetId => {
      const widget = availableWidgets.find(w => w.id === widgetId);
      if (widget) {
        onAddWidget(categoryId, {
          name: widget.name,
          content: widget.content
        });
      }
    });
    setOpen(false);
    setSelectedWidgets([]);
    setSearchQuery("");
  };

  const categories = [...new Set(availableWidgets.map(w => w.category))];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button variant="outline" size="sm" className="gap-1">
            <Plus className="h-4 w-4" />
            <span>Add Widget</span>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-3xl h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl">Add Widgets</DialogTitle>
          <div className="relative mt-2">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search widgets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </DialogHeader>
        
        <div className="flex-1 overflow-hidden">
          <Tabs defaultValue={categories[0]} className="h-full flex flex-col">
            <TabsList className="w-full justify-start">
              {categories.map(category => (
                <TabsTrigger key={category} value={category} className="px-4">
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
            
            <div className="flex-1 overflow-y-auto py-4">
              {categories.map(category => (
                <TabsContent key={category} value={category} className="m-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {filteredWidgets
                      .filter(widget => widget.category === category)
                      .map(widget => (
                        <div
                          key={widget.id}
                          onClick={() => handleWidgetToggle(widget.id)}
                          className={cn(
                            "relative p-4 rounded-lg border cursor-pointer transition-colors",
                            "hover:bg-accent/50",
                            selectedWidgets.includes(widget.id) 
                              ? "border-primary bg-primary/5 ring-1 ring-primary/20" 
                              : "border-border hover:border-primary/50"
                          )}
                        >
                          <div className="flex items-start gap-3">
                            <div className="mt-0.5">
                              {widget.icon}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium">{widget.name}</h4>
                              <p className="text-sm text-muted-foreground mt-1">
                                {widget.description}
                              </p>
                            </div>
                            <div className={cn(
                              "flex items-center justify-center h-5 w-5 rounded-full border",
                              selectedWidgets.includes(widget.id) 
                                ? "bg-primary border-primary text-primary-foreground" 
                                : "border-border"
                            )}>
                              {selectedWidgets.includes(widget.id) && (
                                <Check className="h-3.5 w-3.5" />
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </TabsContent>
              ))}
            </div>
          </Tabs>
        </div>
        
        <DialogFooter className="border-t pt-4">
          <div className="flex items-center justify-between w-full">
            <div className="text-sm text-muted-foreground">
              {selectedWidgets.length} {selectedWidgets.length === 1 ? 'widget' : 'widgets'} selected
            </div>
            <div className="space-x-2">
              <Button 
                variant="outline" 
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleConfirm}
                disabled={selectedWidgets.length === 0}
              >
                Add {selectedWidgets.length > 0 && `(${selectedWidgets.length})`}
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
