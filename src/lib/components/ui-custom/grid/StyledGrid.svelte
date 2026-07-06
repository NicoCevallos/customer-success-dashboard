<script lang="ts" generics="T">
  import {
    AllCommunityModule,
    createGrid,
    ModuleRegistry,
    themeQuartz,
    type GridApi,
    type GridOptions
  } from 'ag-grid-community';

  interface CustomGridProps {
    gridOptions: Omit<GridOptions<T>, 'theme'>;
    gridApi?: GridApi<T> | undefined;
  }

  let { gridOptions, gridApi = $bindable() }: CustomGridProps = $props();

  let gridContainer: HTMLDivElement | undefined;

  ModuleRegistry.registerModules([AllCommunityModule]);

  const myShadcnTheme = themeQuartz.withParams({
    backgroundColor: 'var(--muted)',
    foregroundColor: 'var(--foreground)',
    borderColor: 'var(--border)',
    rowHoverColor: 'var(--accent)',
    selectedRowBackgroundColor: 'var(--accent)',
    fontFamily: 'var(--font-sans)',
    fontSize: '14px'
  });

  $effect(() => {
    if (gridContainer && !gridApi) {
      gridApi = createGrid(gridContainer, {
        ...gridOptions,
        theme: myShadcnTheme
      });
    }
  });
</script>

<svelte:head>
  <script
    src="https://cdn.jsdelivr.net/npm/ag-grid-community/dist/ag-grid-community.min.js"
  ></script>
</svelte:head>

<div bind:this={gridContainer} class="h-screen"></div>
