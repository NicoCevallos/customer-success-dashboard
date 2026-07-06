<script lang="ts">
  import { CustomerHealthScore, CustomerPlan, CustomerStatus } from '$lib/types';
  import {
    customerHealthScoreBgClass,
    customerHealthScoreValues,
    customerPlanValues,
    customerStatusValues
  } from '$lib/utils/consts';
  import { Badge } from '../ui/badge';
  import { Button } from '../ui/button';
  import { Checkbox } from '../ui/checkbox';
  import { Input } from '../ui/input';
  import { Label } from '../ui/label';
  import SimpleSelect from '../ui-custom/select/SimpleSelect.svelte';
  import { Separator } from '../ui/separator';
  import type { CustomersGridFilterOptions } from './CustomersGridFilterOptions';
  import AccordionCard from '../ui-custom/accordion-card/SimpleAccordionCard.svelte';

  interface CustomersGridFilterProps {
    onApplyFilter: (filter: CustomersGridFilterOptions) => void;
  }

  let { onApplyFilter }: CustomersGridFilterProps = $props();

  let companyName = $state('');
  let status = $state<CustomerStatus | "">("");
  let plan = $state<CustomerPlan | "">("");
  let users = $state("");
  let monthlyRevenue = $state("");
  let healthScoreOptions = $state<Record<CustomerHealthScore, boolean>>({
    [CustomerHealthScore.Healthy]: false,
    [CustomerHealthScore.Warning]: false,
    [CustomerHealthScore.Critical]: false
  });

  function applyFilter() {
    onApplyFilter({
      companyName,
      status,
      plan,
      users: +users,
      monthlyRevenue: +monthlyRevenue,
      healthScore: customerHealthScoreValues.filter((o) => healthScoreOptions[o])
    });
  }

  function clearFilter() {
    companyName = '';
    status = "";
    plan = "";
    users = "";
    monthlyRevenue = "";

    for (const customerHealthScoreValue of customerHealthScoreValues) {
      healthScoreOptions[customerHealthScoreValue] = false;
    }

    applyFilter();
  }

  const averageOptions = [
    {
      label: 'Below Average',
      value: "-1"
    },
    {
      label: 'Above Average',
      value: "1"
    }
  ];
</script>

<AccordionCard title="Filter">
  <div class="grid md:grid-cols-4 gap-2 items-start">
    <div class="grid gap-2">
      <Label for="companyName">Company Name</Label>
      <Input
        id="companyName"
        placeholder="Space X"
        type="text"
        autocorrect="off"
        bind:value={companyName}
      />
    </div>
    <div class="grid gap-2">
      <Label for="status">Status</Label>
      <SimpleSelect name="status" items={customerStatusValues} bind:value={status} />
    </div>
    <div class="grid gap-2">
      <Label for="plan">Plan</Label>
      <SimpleSelect name="plan" items={customerPlanValues} bind:value={plan} />
    </div>
    <div class="grid gap-2">
      <Label for="users">Users</Label>
      <SimpleSelect
        name="users"
        items={averageOptions}
        valueKey="value"
        labelKey="label"
        bind:value={users}
      />
    </div>
    <div class="grid gap-2">
      <Label for="monthlyRevenue">Monthly Revenue</Label>
      <SimpleSelect
        name="monthlyRevenue"
        items={averageOptions}
        valueKey="value"
        labelKey="label"
        bind:value={monthlyRevenue}
      />
    </div>
    <div class="grid gap-2">
      <Label>Health Score</Label>
      {#each customerHealthScoreValues as customerHealthScoreValue (customerHealthScoreValue)}
        <div class="flex items-center gap-3">
          <Checkbox
            id="customerHealthScoreValue"
            bind:checked={healthScoreOptions[customerHealthScoreValue]}
          />
          <Label for="customerHealthScoreValue">
            <Badge class="bg-{customerHealthScoreBgClass[customerHealthScoreValue]}">
              {customerHealthScoreValue}
            </Badge>
          </Label>
        </div>
      {/each}
    </div>
  </div>
  <Separator class="my-4" />
  <div class="grid md:grid-flow-col md:justify-items-start">
    <div class="grid grid-flow-col gap-2">
      <Button onclick={applyFilter}>Apply</Button>
      <Button onclick={clearFilter}>Clear</Button>
    </div>
  </div>
</AccordionCard>
