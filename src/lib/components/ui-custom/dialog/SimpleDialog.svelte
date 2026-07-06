<script lang="ts">
  import { buttonVariants } from '$lib/components/ui/button';
  import * as Dialog from '$lib/components/ui/dialog';
  import { Separator } from '$lib/components/ui/separator';
  import type { Snippet } from 'svelte';

  interface SimpleDialogProps {
    title?: string;
    open: boolean;
    onOpenChangeComplete: (isOpen: boolean) => void;
    children: Snippet<[]>;
  }

  let { title, open = $bindable(), onOpenChangeComplete, children }: SimpleDialogProps = $props();
</script>

<Dialog.Root {open} {onOpenChangeComplete}>
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title class="text-2xl">
        {title}
      </Dialog.Title>
    </Dialog.Header>
    {@render children?.()}
    <Separator />
    <Dialog.Close type="button" class={buttonVariants()}>Close</Dialog.Close>
  </Dialog.Content>
</Dialog.Root>
