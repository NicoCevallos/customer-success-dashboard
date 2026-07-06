<script lang="ts">
  import * as Accordion from '$lib/components/ui/accordion';
  import * as Card from '$lib/components/ui/card';
  import type { Snippet } from 'svelte';

  interface SimpleAccordionCardProps {
    title: string;
    children: Snippet<[]>;
  }

  let { title, children }: SimpleAccordionCardProps = $props();
</script>

<Card.Root class="my-4 py-4">
  <Card.Content>
    <Accordion.Root type="single" class="w-full">
      <Accordion.Item value="item-1">
        <Accordion.Trigger class="py-0 text-base font-medium">{title}</Accordion.Trigger>
        <Accordion.Content class="pt-2 pb-0 flex flex-col gap-4 text-balance">
          {@render children?.()}
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  </Card.Content>
</Card.Root>
