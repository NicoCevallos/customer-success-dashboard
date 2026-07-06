import type { Metrics } from '$lib/stores/metrics.svelte';
import type { Customer } from '$lib/types';
import { customerHealthScoreScale, customerHealthScoreValues } from '$lib/utils/consts';
import type { CustomersGridFilterOptions } from './CustomersGridFilterOptions';

export function hasToApplyFilter(filter: CustomersGridFilterOptions): boolean {
  return !!(
    filter.companyName ||
    filter.plan ||
    filter.status ||
    filter.users ||
    filter.monthlyRevenue ||
    filter.healthScore.length
  );
}

function compareWithAverage(comparisonType: number, value: number, average: number) {
  if (comparisonType > 0 && value > average) {
    return true;
  }

  if (comparisonType < 0 && value < average) {
    return true;
  }

  return false;
}

export function filterPass(
  customer: Customer,
  filter: CustomersGridFilterOptions,
  metrics: Metrics
): boolean {
  if (
    filter.companyName &&
    !customer.companyName.toLocaleLowerCase().includes(filter.companyName.toLocaleLowerCase())
  ) {
    return false;
  }

  if (filter.plan && customer.plan !== filter.plan) {
    return false;
  }

  if (filter.status && customer.status !== filter.status) {
    return false;
  }

  if (filter.healthScore?.length) {
    for (const customerHealthScoreValue of customerHealthScoreValues) {
      if (customer.healthScore >= customerHealthScoreScale[customerHealthScoreValue]) {
        if (!filter.healthScore.includes(customerHealthScoreValue)) {
          return false;
        }
        break;
      }
    }
  }

  if (filter.users) {
    if (!compareWithAverage(filter.users, customer.users, metrics.users.average)) {
      return false;
    }
  }

  if (filter.monthlyRevenue) {
    if (
      !compareWithAverage(
        filter.monthlyRevenue,
        customer.monthlyRevenue,
        metrics.monthlyRevenue.average
      )
    ) {
      return false;
    }
  }

  return true;
}
