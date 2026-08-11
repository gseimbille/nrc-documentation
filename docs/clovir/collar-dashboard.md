---
title: Collar dashboard
sidebar_position: 6
---

Click **Devices** in the left menu, then select the collar you want to view.

![Collar dashboard](/img/clovir/collar-dashboard.png)

## Header

The top of the page shows the collar's **serial number**, when it **last
reported**, and its **tags**. The tag matching a perimeter name is what holds the
collar within that perimeter — see [Perimeter management](./perimeters.md).

## Status

- **Online** (green) means a message from the collar has been received. **Offline**
  (red) means the collar is switched off, not transmitting, or out of coverage.
- **In Geofence** means the collar is inside its perimeter; **Out Geofence** means
  it has left it.

## Current readings

- **Temperature** — outside temperature at the collar, in degrees Celsius.
- **Battery** — remaining charge as a percentage.
- **Map** — the collar's last known position.

## Counters

The chart plots **alarms** and **stimulations** over time, so you can see when a
collar has been pushing against its boundary rather than only the running total.

The totals on the right are:

- **Message Cnt** — geolocation messages received from the collar.
- **Alarm Cnt** — perimeter breaches.
- **Stimulation Cnt** — electrical stimuli delivered by the collar.

:::info[Other tabs]
**History** shows past measurements, and **Downlinks** sends a command to the
collar. The remaining tabs are for configuration and diagnostics, normally used
with NRC support.
:::
