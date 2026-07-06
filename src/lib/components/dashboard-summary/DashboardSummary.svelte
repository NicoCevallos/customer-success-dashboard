<script lang="ts">
  import type { Metrics } from '$lib/stores/metrics.svelte';
  import { criticalColor, healthyColor, warningColor } from '$lib/utils/consts';
  import SimpleAccordionCard from '../ui-custom/accordion-card/SimpleAccordionCard.svelte';
  import { User } from '@lucide/svelte';
  import { CustomerStatus } from '$lib/types';
  import DashboardSummaryRow from './DashboardSummaryRow.svelte';
  import DashboardSummaryGroup from './DashboardSummaryGroup.svelte';
  import DashboardSummaryMetric from './DashboardSummaryMetric.svelte';

  interface DashboardSummaryProps {
    metrics: Metrics;
  }

  let { metrics }: DashboardSummaryProps = $props();
</script>

<SimpleAccordionCard title="Summary">
  <div class="grid md:grid-cols-4 lg:gap-16">
    <div>
      <DashboardSummaryGroup title="Customers">
        <DashboardSummaryRow Icon={User} title="Total" value={metrics.totalCustomers} />
        <DashboardSummaryRow
          Icon={User}
          iconColor="var(--color-{healthyColor})"
          title="Active"
          value={metrics.status[CustomerStatus.Active]}
        />
        <DashboardSummaryRow
          Icon={User}
          iconColor="var(--color-{warningColor})"
          title="At Risk"
          value={metrics.status[CustomerStatus.At_Risk]}
        />
        <DashboardSummaryRow
          Icon={User}
          iconColor="var(--color-{criticalColor})"
          title="Churned"
          value={metrics.status[CustomerStatus.Churned]}
        />
      </DashboardSummaryGroup>
    </div>
    <div>
      <DashboardSummaryMetric title="Users" metricItem={metrics.users} />
    </div>
    <div>
      <DashboardSummaryMetric title="Monthly Revenue" metricItem={metrics.monthlyRevenue} />
    </div>
    <div>
      <DashboardSummaryMetric title="Health Score" metricItem={metrics.healthScore} />
    </div>
  </div>
</SimpleAccordionCard>
