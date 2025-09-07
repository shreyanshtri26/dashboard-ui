import { Button } from "@/components/ui/button";
import { Settings, Plus, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { AddWidgetDialog } from "./AddWidgetDialog";
import { useDashboardStore } from "@/store/dashboardData";

const DashboardHeader = () => {
  const { dashboard, addWidget } = useDashboardStore();
  const { theme, setTheme } = useTheme();
  
  // Get the first category to add widgets to from the header
  const firstCategoryId = dashboard.categories.length > 0 ? dashboard.categories[0].id : '';
  
  return (
    <header className="sticky top-0 z-10 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div>
          <h1 className="text-xl font-semibold">CNAPP Dashboard</h1>
          <p className="text-sm text-muted-foreground">CSPM Executive Dashboard</p>
        </div>
        
        <div className="flex items-center gap-2">
          {firstCategoryId && (
            <AddWidgetDialog categoryId={firstCategoryId} onAddWidget={addWidget} />
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="h-9 w-9"
            aria-label="Toggle theme"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
          
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <Settings className="h-4 w-4" />
            <span className="sr-only">Settings</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
