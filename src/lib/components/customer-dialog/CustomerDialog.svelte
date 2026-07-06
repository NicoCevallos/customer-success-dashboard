<script lang="ts">
  import { getMetrics } from '$lib/stores/metrics.svelte';
  import { CustomerStatus, type Customer } from '$lib/types';
  import {
    customerHealthScoreBgClass,
    customerHealthScoreScale,
    customerHealthScoreValues
  } from '$lib/utils/consts';
  import { dateFormatter } from '$lib/utils/dateFormatter';
  import CustomerDialogRow from './CustomerDialogRow.svelte';
  import SimpleDialog from '../ui-custom/dialog/SimpleDialog.svelte';
  import { Badge } from '../ui/badge';
  import { Banknote, Calendar, HeartPulse, Info, Presentation, User } from '@lucide/svelte';

  interface CustomersDialogProps {
    customer?: Customer;
  }

  let { customer = $bindable() }: CustomersDialogProps = $props();

  function openChangeCompleteHandler(isOpen: boolean) {
    if (!isOpen) {
      customer = undefined;
    }
  }

  function getHealthScoreBgClass(score: number) {
    for (const customerHealthScoreValue of customerHealthScoreValues) {
      if (score > customerHealthScoreScale[customerHealthScoreValue]) {
        return customerHealthScoreBgClass[customerHealthScoreValue];
      }
    }
  }

  const badgeBgClass: Record<CustomerStatus, string> = {
    [CustomerStatus.Active]: 'bg-green-600',
    [CustomerStatus.At_Risk]: 'bg-yellow-500',
    [CustomerStatus.Churned]: 'bg-red-600'
  };

  let metrics = getMetrics();
</script>

<SimpleDialog
  title={customer?.companyName}
  open={!!customer}
  onOpenChangeComplete={openChangeCompleteHandler}
>
  {#if customer}
    <div class="px-2 grid gap-2">
      <CustomerDialogRow Icon={Presentation} title="Plan">
        {customer.plan}
      </CustomerDialogRow>
      <CustomerDialogRow
        Icon={User}
        title="Users"
        trending={customer.users - metrics.users.average}
      >
        {customer.users}
      </CustomerDialogRow>
      <CustomerDialogRow
        Icon={Banknote}
        title="Monthly Revenue"
        trending={customer.monthlyRevenue - metrics.monthlyRevenue.average}
      >
        USD {customer.monthlyRevenue}
      </CustomerDialogRow>
      <CustomerDialogRow Icon={HeartPulse} title="Health Score">
        <Badge class="bg-{getHealthScoreBgClass(customer.healthScore)}">
          {customer.healthScore}
        </Badge>
      </CustomerDialogRow>
      <CustomerDialogRow Icon={Calendar} title="Last Active Date">
        {dateFormatter(customer.lastActiveAt)}
      </CustomerDialogRow>
      <CustomerDialogRow Icon={Info} title="Status">
        <Badge class={customer && badgeBgClass[customer.status]}>{customer.status}</Badge>
      </CustomerDialogRow>
    </div>
  {/if}
</SimpleDialog>
