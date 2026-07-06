<script lang="ts">
  import type { Customer } from '$lib/types';
  import {
    AllCommunityModule,
    ModuleRegistry,
    type GridApi,
    type GridOptions,
    type IRowNode,
    type RowSelectedEvent,
    type ValueFormatterParams
  } from 'ag-grid-community';
  import type { CustomersGridFilterOptions } from './CustomersGridFilterOptions';
  import { numericFormatter } from '$lib/utils/numericFormatter';
  import { dateFormatter } from '$lib/utils/dateFormatter';
  import { filterPass, hasToApplyFilter } from './helpers';
  import StyledGrid from '../ui-custom/grid/StyledGrid.svelte';
  import { getMetrics } from '$lib/stores/metrics.svelte';

  interface CustomersGridProps {
    customers: Customer[];
    filter: CustomersGridFilterOptions;
    onCustomerSelected: (customer: Customer) => void;
  }

  let { customers, filter, onCustomerSelected }: CustomersGridProps = $props();

  let gridApi = $state<GridApi<Customer> | undefined>();

  let metrics = getMetrics();

  ModuleRegistry.registerModules([AllCommunityModule]);

  function onRowSelected(event: RowSelectedEvent) {
    if (event.node.isSelected()) {
      onCustomerSelected(event.node.data);
      event.node.setSelected(false);
    }
  }

  function isExternalFilterPresent(): boolean {
    return hasToApplyFilter(filter);
  }

  function doesExternalFilterPass(node: IRowNode<Customer>): boolean {
    if (!node.data) {
      return true;
    }

    return filterPass(node.data, filter, metrics);
  }

  const gridOptions = $derived({
    columnTypes: {
      numeric: {
        valueFormatter: (params: ValueFormatterParams) => numericFormatter(params.value),
        cellClass: 'ag-right-aligned-cell'
      },
      date: {
        valueFormatter: (params: ValueFormatterParams) => dateFormatter(params.value),
        cellClass: 'ag-right-aligned-cell'
      }
    },
    columnDefs: [
      { field: 'companyName', sortable: true },
      { field: 'plan', sortable: true },
      { field: 'users', sortable: true, type: 'numeric' },
      { field: 'monthlyRevenue', sortable: true, type: 'numeric' },
      { field: 'healthScore', sortable: true, type: 'numeric' },
      { headerName: 'Last Active Date', field: 'lastActiveAt', sortable: true, type: 'date' },
      { field: 'status', sortable: true }
    ],
    rowSelection: { mode: 'singleRow', enableClickSelection: true },
    rowData: customers,
    onRowSelected,
    isExternalFilterPresent,
    doesExternalFilterPass
  } as GridOptions<Customer>);

  $effect(() => {
    if (filter) {
      gridApi?.onFilterChanged();
    }
  });
</script>

<StyledGrid {gridOptions} bind:gridApi />
