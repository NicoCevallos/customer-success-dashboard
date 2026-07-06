<script lang="ts">
  import DashboardSummary from '$lib/components/dashboard-summary/DashboardSummary.svelte';
  import CustomersGridWithFilter from '$lib/components/customers-grid/CustomersGridWithFilter.svelte';
  import { customers } from '$lib/stores/customers.svelte';
  import { getMetrics } from '$lib/stores/metrics.svelte';

  let metrics = getMetrics();
</script>

<main class="mx-4">
  <DashboardSummary {metrics} />

  <CustomersGridWithFilter {customers} />
</main>
