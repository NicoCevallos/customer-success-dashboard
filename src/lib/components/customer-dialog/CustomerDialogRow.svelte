<script lang="ts">
  import { criticalColor, healthyColor } from '$lib/utils/consts';
  import { TrendingDown, TrendingUp, type LucideProps } from '@lucide/svelte';
  import type { Component, Snippet } from 'svelte';

  interface CustomerDialogRowProps {
    Icon: Component<LucideProps, object, ''>;
    title: string;
    children: Snippet<[]>;
    trending?: number;
  }

  let { Icon, title, children, trending }: CustomerDialogRowProps = $props();
</script>

<div class="grid grid-cols-2 gap-2">
  <div>
    <Icon class="inline" />
    {title}:
  </div>
  <div>
    {@render children()}
    {#if trending}
      {#if trending > 0}
        <TrendingUp color="var(--color-{healthyColor})" class="inline" />
      {:else if trending < 0}
        <TrendingDown color="var(--color-{criticalColor})" class="inline" />
      {/if}
    {/if}
  </div>
</div>
