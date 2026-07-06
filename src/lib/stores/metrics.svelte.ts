import { CustomerStatus, type CustomerPlan } from '$lib/types';
import { customerPlanValues, customerStatusValues } from '$lib/utils/consts';
import { customers } from './customers.svelte';

interface NumericMetric {
  total: number;
  count: number;
  min: number;
  max: number;
}

const emptyMetric: NumericMetric = {
  total: 0,
  count: 0,
  min: 0,
  max: 0
};

function trackMetric(value: number, metric: NumericMetric): void {
  if (!metric.min || value < metric.min) {
    metric.min = value;
  }

  if (value > metric.max) {
    metric.max = value;
  }

  if (!value) {
    return;
  }

  metric.count++;

  metric.total += value;
}

export interface NumericMetricWithAverage extends NumericMetric {
  average: number;
}

export interface Metrics {
  totalCustomers: number;
  monthlyRevenue: NumericMetricWithAverage;
  users: NumericMetricWithAverage;
  healthScore: NumericMetricWithAverage;
  plans: Record<CustomerPlan, number>;
  status: Record<CustomerStatus, number>;
}

const metrics = $derived.by((): Metrics => {
  const monthlyRevenue = { ...emptyMetric };
  const users = { ...emptyMetric };
  const healthScore = { ...emptyMetric };

  const plans: Record<CustomerPlan, number> = {} as Record<CustomerPlan, number>;

  for (const planValue of customerPlanValues) {
    plans[planValue] = 0;
  }

  const status: Record<CustomerStatus, number> = {} as Record<CustomerStatus, number>;

  for (const statusValue of customerStatusValues) {
    status[statusValue] = 0;
  }

  for (const customer of customers) {
    trackMetric(customer.monthlyRevenue, monthlyRevenue);
    trackMetric(customer.users, users);
    trackMetric(customer.healthScore, healthScore);

    plans[customer.plan]++;

    status[customer.status]++;
  }

  return {
    totalCustomers: customers.length,
    monthlyRevenue: {
      ...monthlyRevenue,
      average: monthlyRevenue.count && monthlyRevenue.total / monthlyRevenue.count
    },
    users: {
      ...users,
      average: users.count && users.total / users.count
    },
    healthScore: {
      ...healthScore,
      average: healthScore.count && healthScore.total / healthScore.count
    },
    plans,
    status
  };
});

export function getMetrics() {
  return metrics;
}
