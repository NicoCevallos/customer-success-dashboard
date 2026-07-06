<script lang="ts">
  import type { Customer } from '$lib/types';
  import CustomerDialog from '../customer-dialog/CustomerDialog.svelte';
  import CustomersGrid from './CustomersGrid.svelte';
  import CustomersGridFilter from './CustomersGridFilter.svelte';
  import type { CustomersGridFilterOptions } from './CustomersGridFilterOptions';

  interface CustomersGridProps {
    customers: Customer[];
  }

  let { customers }: CustomersGridProps = $props();

  let filter = $state<CustomersGridFilterOptions>({

    healthScore: []
  });

  function applyFilterHandler(newFilter: CustomersGridFilterOptions) {
    filter = newFilter;
  }

  let selectedCustomer = $state<Customer | undefined>();

  function customerSelectedHandler(customer: Customer) {
    selectedCustomer = customer;
  }
</script>

<CustomersGridFilter onApplyFilter={applyFilterHandler} />

<CustomersGrid {customers} {filter} onCustomerSelected={customerSelectedHandler} />

<CustomerDialog bind:customer={selectedCustomer} />
