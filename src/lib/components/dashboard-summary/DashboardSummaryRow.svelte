<script lang="ts">
  import type { LucideProps } from '@lucide/svelte';
  import type { Component } from 'svelte';

  interface DashboardSummaryRowProps {
    Icon?: Component<LucideProps, object, ''>;
    iconColor?: string;
    title: string;
    value: string | number;
  }

  let { Icon, iconColor, title, value }: DashboardSummaryRowProps = $props();
</script>

<div class="grid grid-cols-2 gap-2">
  <div>
    {#if Icon}
      <Icon class="inline" color={iconColor} />
    {/if}
    {title}:
  </div>
  <div style="text-align: right;">
    {value}
  </div>
</div>
