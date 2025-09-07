export interface Widget {
  id: string;
  name: string;
  content: string;
}

export interface Category {
  id: string;
  name: string;
  widgets: Widget[];
}

export interface DashboardData {
  categories: Category[];
}

export interface DashboardState {
  data: DashboardData | null;
  error: string | null;
  isLoading: boolean;
}

export interface DashboardStore {
  state: DashboardState;
  actions: {
    loadDashboard: () => void;
    updateDashboard: (data: DashboardData) => void;
    setError: (error: string) => void;
  };
}
