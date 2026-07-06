import { CustomerHealthScore, CustomerPlan, CustomerStatus } from '$lib/types';

export const customerPlanValues = Object.values(CustomerPlan);
export const customerStatusValues = Object.values(CustomerStatus);
export const customerHealthScoreValues = Object.values(CustomerHealthScore);

export const customerHealthScoreScale: Record<CustomerHealthScore, number> = {
  [CustomerHealthScore.Healthy]: 80,
  [CustomerHealthScore.Warning]: 50,
  [CustomerHealthScore.Critical]: 0
};

export const healthyColor = 'green-600';
export const warningColor = 'yellow-500';
export const criticalColor = 'red-600';

export const customerHealthScoreBgClass: Record<CustomerHealthScore, string> = {
  [CustomerHealthScore.Healthy]: healthyColor,
  [CustomerHealthScore.Warning]: warningColor,
  [CustomerHealthScore.Critical]: criticalColor
};
