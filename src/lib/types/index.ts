export enum CustomerPlan {
  'Free' = 'Free',
  'Pro' = 'Pro',
  'Enterprise' = 'Enterprise'
}

export enum CustomerStatus {
  'Active' = 'Active',
  'At_Risk' = 'At Risk',
  'Churned' = 'Churned'
}

export interface Customer {
  id: string;
  companyName: string;
  plan: CustomerPlan;
  users: number;
  monthlyRevenue: number;
  healthScore: number; // 0-100
  lastActiveAt: string;
  status: CustomerStatus;
}

export enum CustomerHealthScore {
  'Healthy' = 'Healthy',
  'Warning' = 'Warning',
  'Critical' = 'Critical'
}