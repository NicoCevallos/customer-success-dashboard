<script lang="ts">
  import type { Snippet } from 'svelte';

  interface DashboardSummaryGroupProps {
    title: string;
    children: Snippet<[]>;
  }
  let { title, children }: DashboardSummaryGroupProps = $props();
</script>

<div class="mt-2">
  <div class="text-base font-medium">
    {title}
  </div>
  <div class=" px-2">
    {@render children()}
  </div>
</div>
