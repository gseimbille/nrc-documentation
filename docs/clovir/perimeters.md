---
title: Perimeter management
sidebar_position: 3
---

## Perimeter dashboard

In the left Datacake menu, select **Perimeter** to open the dashboard. This entry
may be named differently in your own workspace.

![Perimeter dashboard](/img/clovir/perimeter-dashboard.png)

The counters along the top show how many perimeters you have, how many animals
are expected across all of them, and how many perimeters are currently in alert.

Each perimeter is shown as a card:

- **ACTIVE** in green, or **ALERT** in orange when fewer animals are present than
  expected.
- **Present** against **expected**, with a progress bar.
- The enclosed area in square metres.
- **Map** to see it in place, **Edit** to change it, and the bin icon to delete it.

## Create a perimeter

Click **New Perimeter**. The panel walks through three steps.

![Creating a new perimeter](/img/clovir/perimeter-create.png)

### 1. Import fields (optional)

Drop a PAC `.xml` file to load your declared parcels instead of drawing them by
hand. Skip this step if you would rather draw the outline yourself.

### 2. Draw perimeter

Draw the outline directly on the map using the tools at the top right. The
enclosed area is shown in square metres as you draw, so you can check the size as
you go. The search box finds a place or address quickly.

### 3. Configure

- **Datacake zone** — choose an existing tag, or **+ Create new tag** to make one.
  This tag is what links a collar to this perimeter, so a collar carrying it is
  held within this boundary.
- **Perimeter name** — the name shown on the dashboard.
- **Expected animals** — used to raise the alert when fewer are present.

Click **Save perimeter** to finish.

:::caution[Number of corners]
A collar stores 20 boundary points, and closing the outline uses one, so a
perimeter can have at most **19 corners**.

**Older collar generations follow only the first four corners.** On those, a
complex shape is not enforced as drawn — check which generation your fleet is
before drawing anything beyond a quadrilateral.
:::
