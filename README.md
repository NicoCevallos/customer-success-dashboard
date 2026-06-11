# Frontend Developer Take-Home Assignment

## Overview

Build a small Customer Success Dashboard using Svelte, TypeScript, shadcn-svelte, and AG Grid.

The goal is to evaluate how you structure a frontend application, manage state, and build a clean, maintainable user experience.

Expected completion time: **2–4 hours**.

---

## Getting Started

```bash
npm install
npm run dev
```

The app runs entirely in the browser — there is no backend or API to set up.

---

## What's Already Set Up

- **SvelteKit** project with TypeScript
- **shadcn-svelte** (style: Vega, icon library: Lucide) — the following components are pre-installed:
  - `badge`, `button`, `card`, `dialog`, `input`
  - Browse [shadcn-svelte.com/docs/components](https://shadcn-svelte.com/docs/components) and use `npx shadcn-svelte@latest add <component>` to add more
- **AG Grid Community** (`ag-grid-community`) — already installed
- **Customer dataset** — 500 generated records at `src/lib/data/customers.ts`

---

## Data

The customer type is defined in `src/lib/types`:

```ts
interface Customer {
  id: string;
  companyName: string;
  plan: 'Free' | 'Pro' | 'Enterprise';
  users: number;
  monthlyRevenue: number;
  healthScore: number; // 0–100
  lastActiveAt: string; // ISO date string
  status: 'Active' | 'At Risk' | 'Churned';
}
```

Import it wherever you need it:

```ts
import { customers } from '$lib/data/customers';
```

---

## Features to Build

### 1. Dashboard Summary

Display summary metrics derived from the dataset. At a minimum, include:

- Total Customers
- Total Monthly Revenue
- Active Customers
- At-Risk Customers

Feel free to add additional metrics if you think they improve the experience.

---

### 2. Customer Table

Implement a customer table using AG Grid with the following columns:

- Company Name
- Plan
- Users
- Monthly Revenue
- Health Score
- Last Active Date
- Status

You may add additional columns if you think they are useful.

**AG Grid handles sorting and row virtualization for you** — enable `sortable: true` on columns and it works out of the box. You do not need to implement sorting manually.

**Filtering** should be implemented as external UI controls above the table that filter the data array passed into AG Grid (do not rely on AG Grid's built-in column filters). At a minimum, include:

- A **text input** to search by company name
- A **Plan select** — All / Free / Pro / Enterprise
- A **Status select** — All / Active / At Risk / Churned

Row selection should also be supported.

---

### 3. Customer Detail View

When a customer row is selected, display their details in a dialog, sheet, side panel, or similar UI. Present the information clearly and thoughtfully.

---

## UX Considerations

We value thoughtful UX and maintainable code over visual polish. Keep in mind:

- Responsive layout
- Accessibility
- Clear formatting of dates, numbers, and currency
- Empty states where appropriate

---

## Evaluation Criteria

- Code organization and component structure
- TypeScript usage
- State management
- Readability and maintainability
- User experience and attention to detail

We are **not** evaluating pixel-perfect design.

---

Good luck, and have fun building it.
