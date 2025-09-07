
import { create } from 'zustand';
import { toast } from 'sonner';
import { Widget, Category, DashboardData } from '@/types/dashboard';

interface DashboardStore {
  dashboard: DashboardData;
  addWidget: (categoryId: string, widget: Omit<Widget, 'id'>) => void;
  removeWidget: (categoryId: string, widgetId: string) => void;
}

export const useDashboardStore = create<DashboardStore>((set) => ({
  dashboard: {
    categories: [
      {
        id: 'cspm',
        name: 'CSPM Executive Dashboard',
        widgets: [
          {
            id: 'cloud-accounts',
            name: 'Cloud Accounts',
            content: '<CloudAccountsChart />',
          },
          {
            id: 'risk-assessment',
            name: 'Cloud Account Risk Assessment',
            content: '<RiskAssessmentChart />',
          },
        ],
      },
      {
        id: 'cwpp',
        name: 'CWPP Dashboard',
        widgets: [
          {
            id: 'workload-alerts',
            name: 'Workload Alerts',
            content: '<WorkloadAlerts />',
          },
        ],
      },
      {
        id: 'registry',
        name: 'Registry Scan',
        widgets: [
          {
            id: 'registry-scan',
            name: 'Registry Scan',
            content: '<RegistryScan />',
          },
        ],
      },
    ],
  },
  addWidget: (categoryId, widget) =>
    set((state) => {
      const category = state.dashboard.categories.find(c => c.id === categoryId);
      if (!category) {
        toast.error('Category not found');
        return state;
      }

      if (category.widgets.some(w => w.name === widget.name)) {
        toast.error('Widget already exists in this category');
        return state;
      }

      toast.success('Widget added successfully');
      return {
        dashboard: {
          ...state.dashboard,
          categories: state.dashboard.categories.map((category) =>
            category.id === categoryId
              ? {
                  ...category,
                  widgets: [
                    ...category.widgets,
                    { ...widget, id: Math.random().toString(36).substr(2, 9) },
                  ],
                }
              : category
          ),
        },
      };
    }),
  removeWidget: (categoryId, widgetId) =>
    set((state) => {
      toast.success('Widget removed successfully');
      return {
        dashboard: {
          ...state.dashboard,
          categories: state.dashboard.categories.map((category) =>
            category.id === categoryId
              ? {
                  ...category,
                  widgets: category.widgets.filter((w) => w.id !== widgetId),
                }
              : category
          ),
        },
      };
    }),
}));
