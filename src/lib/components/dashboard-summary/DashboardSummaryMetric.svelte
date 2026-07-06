<script lang="ts">
  import type { NumericMetricWithAverage } from '$lib/stores/metrics.svelte';
  import { numericFormatter } from '$lib/utils/numericFormatter';
  import { ArrowDownToLine, ArrowUpToLine, Sigma, XLineTop } from '@lucide/svelte';
  import DashboardSummaryRow from './DashboardSummaryRow.svelte';
  import DashboardSummaryGroup from './DashboardSummaryGroup.svelte';
  import { criticalColor, healthyColor, warningColor } from '$lib/utils/consts';

  interface NumericMetricSummaryProps {
    title: string;
    metricItem: NumericMetricWithAverage;
  }

  let { title, metricItem }: NumericMetricSummaryProps = $props();
</script>

<DashboardSummaryGroup {title}>
  <DashboardSummaryRow Icon={Sigma} title="Total" value={numericFormatter(metricItem.total)} />
  <DashboardSummaryRow
    Icon={ArrowUpToLine}
    iconColor="var(--color-{healthyColor})"
    title="Maximum"
    value={numericFormatter(metricItem.max)}
  />
  <DashboardSummaryRow
    Icon={XLineTop}
    iconColor="var(--color-{warningColor})"
    title="Average"
    value={numericFormatter(metricItem.average, 2)}
  />
  <DashboardSummaryRow
    Icon={ArrowDownToLine}
    iconColor="var(--color-{criticalColor})"
    title="Minimum"
    value={numericFormatter(metricItem.min)}
  />
</DashboardSummaryGroup>
