---
title: Map
sidebar_position: 5
---

The **Map** dashboard shows where your collars are, which perimeter each one
belongs to, and lets you move a collar from one perimeter to another.

Open it from **Dashboards → Map** in the left Datacake menu.

## All devices

By default the map shows every collar and every perimeter in your account.

![Map showing all collars and perimeters](/img/clovir/map-overview.webp)

- Each dot is one collar. **Green** means online, **red** means offline — the
  same colours as the legend in the bottom-left corner.
- Perimeters are drawn as dashed blue outlines.
- The map centres itself on your collars automatically.
- Positions refresh every 30 seconds, so you can leave the dashboard open.

A collar with no GPS fix yet has no dot, because it has no position to show.

## One collar

Click a dot — or pick a collar from the dropdown at the top — to focus on it.

![Map focused on a single collar](/img/clovir/map-device-focus.webp)

The view then shows:

- **The collar's recent track**, as an orange line joining its last known
  positions. This covers the past 24 hours, up to a maximum of 20 positions —
  so on a collar that reports often you see the most recent 20 fixes rather than
  the whole day.
- **Its perimeter**, filled in green rather than outlined in blue.
- **A summary card**, bottom right: the collar name, its perimeter and expected
  animal count, and when it was last heard from.

## Changing a collar's perimeter

The dropdown at the top right shows the perimeter the collar currently belongs
to. Select a different one to move it.

Behind the scenes this changes the collar's **tag**, which is what links it to a
perimeter — see [Perimeter management](./perimeters.md). The collar's other tags
are left untouched, and it is never left belonging to two perimeters at once.

:::info[The collar receives its new fence at its next check-in]
The map updates immediately, but the collar itself only learns about the change
when it next reports in — typically within about 30 minutes. Until then it
continues to enforce its previous boundary.
:::
