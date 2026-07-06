import type { CustomerHealthScore, CustomerPlan, CustomerStatus } from '$lib/types';

export interface CustomersGridFilterOptions {
  companyName?: string;
  plan?: CustomerPlan | '';
  status?: CustomerStatus | '';
  users?: number,
  monthlyRevenue?: number,
  healthScore: CustomerHealthScore[];
}
