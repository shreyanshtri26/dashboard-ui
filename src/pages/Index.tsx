import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { useDashboardStore } from "@/store/dashboardData";
import { AddWidgetDialog } from "@/components/dashboard/AddWidgetDialog";
import { X, Plus, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CloudAccountsChart } from "@/components/dashboard/CloudAccountsChart";
import { RiskAssessmentChart } from "@/components/dashboard/RiskAssessmentChart";
import { WorkloadAlerts } from "@/components/dashboard/WorkloadAlerts";
import RegistryScan from "@/components/dashboard/RegistryScan";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import React from "react";

// Error Boundary Component
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-screen p-4">
          <Alert variant="destructive" className="max-w-md">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Something went wrong. Please try refreshing the page.
            </AlertDescription>
          </Alert>
        </div>
      );
    }

    return this.props.children;
  }
}

const WidgetContent = ({ content, loading = false }: { content: string; loading?: boolean }) => {
  if (loading) {
    return (
      <div className="space-y-2 mt-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    );
  }

  try {
    switch (content) {
      case '<CloudAccountsChart />':
        return <CloudAccountsChart />;
      case '<RiskAssessmentChart />':
        return <RiskAssessmentChart />;
      case '<WorkloadAlerts />':
        return <WorkloadAlerts />;
      case '<RegistryScan />':
        return <RegistryScan />;
      default:
        return (
          <div className="flex items-center justify-center h-32 text-muted-foreground">
            No content available
          </div>
        );
    }
  } catch (error) {
    console.error(`Error rendering widget content: ${content}`, error);
    return (
      <div className="flex flex-col items-center justify-center h-32 text-destructive p-4 text-center">
        <AlertCircle className="h-6 w-6 mb-2" />
        <p>Failed to load widget</p>
      </div>
    );
  }
};

const WidgetCard = ({
  widget,
  onRemove,
  loading = false,
}: {
  widget: { id: string; name: string; content: string };
  onRemove: () => void;
  loading?: boolean;
}) => (
  <Card className="h-full flex flex-col hover:shadow-md transition-shadow duration-200">
    <CardHeader className="pb-2">
      <div className="flex items-center justify-between">
        <CardTitle className="text-lg font-semibold">{widget.name}</CardTitle>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full hover:bg-destructive/10 hover:text-destructive"
              onClick={(e) => {
                e.stopPropagation();
                onRemove();
              }}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Remove widget</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Remove widget</TooltipContent>
        </Tooltip>
      </div>
    </CardHeader>
    <CardContent className="flex-1 p-6 pt-0">
      <ErrorBoundary>
        <WidgetContent content={widget.content} loading={loading} />
      </ErrorBoundary>
    </CardContent>
  </Card>
);

const CategorySection = ({
  category,
  onAddWidget,
  onRemoveWidget,
}: {
  category: { id: string; name: string; widgets: any[] };
  onAddWidget: (categoryId: string) => void;
  onRemoveWidget: (categoryId: string, widgetId: string) => void;
}) => (
  <div key={category.id} className="mb-12">
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center space-x-4">
        <h2 className="text-2xl font-bold tracking-tight">{category.name}</h2>
        <Badge variant="outline" className="text-sm font-normal">
          {category.widgets.length} {category.widgets.length === 1 ? 'widget' : 'widgets'}
        </Badge>
      </div>
      <AddWidgetDialog categoryId={category.id} onAddWidget={onAddWidget}>
        <Button size="sm" className="gap-1">
          <Plus className="h-4 w-4" />
          Add Widget
        </Button>
      </AddWidgetDialog>
    </div>
    
    {category.widgets.length > 0 ? (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {category.widgets.map((widget) => (
          <ErrorBoundary key={widget.id}>
            <WidgetCard
              widget={widget}
              onRemove={() => onRemoveWidget(category.id, widget.id)}
            />
          </ErrorBoundary>
        ))}
      </div>
    ) : (
      <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-lg">
        <p className="text-muted-foreground mb-4">No widgets added yet</p>
        <AddWidgetDialog categoryId={category.id} onAddWidget={onAddWidget}>
          <Button variant="outline" size="sm" className="gap-1">
            <Plus className="h-4 w-4" />
            Add your first widget
          </Button>
        </AddWidgetDialog>
      </div>
    )}
  </div>
);

const Index = () => {
  const { dashboard, addWidget, removeWidget } = useDashboardStore();
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    try {
      // Simulate loading state
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      
      return () => clearTimeout(timer);
    } catch (err) {
      console.error("Error in Index component:", err);
      setError("Failed to load dashboard. Please try refreshing the page.");
      setIsLoading(false);
    }
  }, []);

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <Alert variant="destructive" className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <ScrollArea className="h-[calc(100vh-4rem)]">
        <main className="container mx-auto px-4 py-8">
          {isLoading ? (
            <div className="space-y-12">
              {[1, 2].map((i) => (
                <div key={i} className="space-y-6">
                  <Skeleton className="h-8 w-48" />
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                    {[1, 2].map((j) => (
                      <Card key={j} className="p-6">
                        <Skeleton className="h-6 w-32 mb-4" />
                        <Skeleton className="h-40 w-full" />
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <ErrorBoundary>
              {dashboard?.categories?.map((category) => (
                <CategorySection
                  key={category.id}
                  category={category}
                  onAddWidget={addWidget}
                  onRemoveWidget={removeWidget}
                />
              ))}
            </ErrorBoundary>
          )}
        </main>
      </ScrollArea>
    </div>
  );
};

export default Index;
