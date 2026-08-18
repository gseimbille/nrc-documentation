---
title: Operational process
sidebar_position: 12
---

## Startup
1. Draw a perimeter 0 outside for collar power-on (PC).
2. Power on the collars inside perimeter 0.
3. Confirm collars appear **online** and **in GPS zone** (PC or phone).
4. Move collars out of perimeter 0 and confirm sounds and stimuli are triggered and an SMS is received for the perimeter crossing.

## Perimeter activation
1. Draw the authorized perimeter(s) (1, 2, 3, etc.) in Datacake (PC).
2. Activate the chosen perimeter.
3. Put the collar on the cow and bring the animal inside the perimeter defined in step 1.
4. Verify collars are **in zone** in Datacake.
5. The selected perimeter is now operational.

## Perimeter change
1. Draw the new perimeter (skip if already done).
2. Deactivate the current operational perimeter.
3. Bring animals into the new perimeter.
4. Activate the new perimeter.
5. The selected perimeter is now operational.

## Activating and deactivating a perimeter

A collar downloads its perimeter **every 30 minutes**, so a change never takes
effect instantly. The cases below are the four you will meet in practice.

### Activate a perimeter

Select the perimeter, for example *Perimeter A*. It becomes active once the
animal is inside it.

Select it at 08:24 and the collar will have it by 08:54 at the latest.

### Extend to a new perimeter, animal already inside it

Simply select the new perimeter, for example *Perimeter B*.

:::warning[The animal must be at least 2 m inside the new perimeter]
Once the new perimeter is active, an animal standing within 2 m of its boundary
is already in the buffer zone and will be warned, then stimulated.
:::

### Move to a new perimeter, animal not yet inside it

1. Deactivate the current perimeter by selecting the dummy perimeter **Inactive**.
2. Wait for *Inactive* to reach the collar — **up to 10 minutes**. This erases the
   perimeter stored on the collar.
3. Move the animal from *Perimeter A* to *Perimeter B*.
4. Select *Perimeter B*.

### Deactivate a perimeter

Select the dummy perimeter **Inactive** and wait up to 10 minutes for it to reach
the collar, which erases the stored perimeter.

:::danger[Wait until no perimeter is shown before moving animals]
Only move animals out once Datacake no longer displays a perimeter for the
collar. Moving them earlier means the old fence is still loaded, and they will be
warned and stimulated on the way out.

The collar needs cellular coverage to receive the change.
:::
