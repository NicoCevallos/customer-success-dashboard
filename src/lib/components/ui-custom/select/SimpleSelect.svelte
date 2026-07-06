<script lang="ts" generics="T extends string | Record<string, string>">
  import * as Select from '../../ui/select';

  const allLabel = 'All';

  type SimpleSelectProps = {
    name: string;
    items: T[];
    valueKey?: keyof T;
    labelKey?: keyof T;
    value: string;
  };

  let { name, items, valueKey, labelKey, value = $bindable() }: SimpleSelectProps = $props();

  const triggerContent = $derived.by(() => {
    const item = items.find((i) => (valueKey ? i[valueKey] : i) === value);

    if (!item) {
      return allLabel;
    }

    return labelKey ? item[labelKey] : item;
  });
</script>

<Select.Root type="single" {name} bind:value={value as string}>
  <Select.Trigger class="w-full">{triggerContent}</Select.Trigger>
  <Select.Content>
    <Select.Item value="" label={allLabel}></Select.Item>
    {#each items as item (item)}
      <Select.Item
        value={(valueKey ? item[valueKey] : item) as string}
        label={(labelKey ? item[labelKey] : item) as string}
        >{(labelKey ? item[labelKey] : item) as string}</Select.Item
      >
    {/each}
  </Select.Content>
</Select.Root>
