---
title: Datacake platform
sidebar_position: 2
---

CLOVIR is built on top of **Datacake**, a third-party IoT platform NRC uses for
part of the system. Datacake provides user accounts, device management and
dashboards; the virtual fencing itself — perimeters, crossing logic and the
collar firmware — is NRC's own.

In practice you sign in to Datacake at `https://app.datacake.de` to manage your
team and your collars, and the CLOVIR features appear inside it.

## Collar features

| Feature | Description |
| --- | --- |
| Collar identification | Numbering, and association with the animal |
| Online status | The collar is powered on and transmitting |
| In-zone status | After 5 seconds inside the authorised zone the collar switches to **in zone**. The farmer is expected to confirm the animals crossed the buffer zone |
| Per-collar status | Each collar carries its own status |
| Expected against actual | Declare the collars expected on a parcel and compare with the real count |
| In and on counts | Number of collars **in** the zone and **on** |
| Per-animal summary | Sounds and stimuli delivered, per animal |

## Crossing logic

The **buffer zone** is the 2-metre band just inside the perimeter boundary. The
animal reaches it before the boundary itself, and everything below happens there.

Position is determined by GNSS (commonly called GPS). The logic can be updated
remotely, per collar.

![The authorised perimeter, its 2 metre buffer zone, and the exterior](/img/clovir/buffer-zone.svg)

### The animal enters the buffer zone

A continuous warning sound starts immediately — loud (100 dB at 30 cm) and
high-pitched (2731 Hz).

![Sound starts at 0 s, first stimulation at 3 s, second at 7 s, none after](/img/clovir/crossing-timeline.svg)

| Time in the buffer zone | What happens |
| --- | --- |
| 0 s | Sound starts |
| 3 s | First electrical stimulation, if the animal is still there |
| 7 s | Second electrical stimulation, if the animal is still there |
| beyond | **No further stimulation**, but the sound continues while the animal remains |

An animal that steps in and straight back out again in under 3 seconds hears the
sound only, and receives no stimulation.

### The animal returns inside the perimeter

The sound stops the instant it leaves the buffer zone, and no stimulation is
given. **The logic resets**: two stimulations become available again if the
animal returns to the buffer zone.

### The animal leaves the perimeter completely

Same sequence as above, but the sound stops after the second stimulation and a
**message is sent to the farmer**. If both stimulations were already delivered in
the buffer zone, no further one is given.

### The animal comes back into the perimeter

A **message is sent to the farmer** and the logic resets — sound and both
stimulations become available again.

:::info[At most two stimulations per excursion]
A collar never delivers more than two stimulations for a single excursion,
however long the animal stays in the buffer zone. The counter resets only when
the animal returns inside the perimeter.
:::

## Notifications

- **SMS to the farmer**, sent once when an animal leaves the zone, with its last
  known coordinates.
- **Email**, when Datacake has received no message from a collar for more than an
  hour. The fencing logic itself is unaffected — only the transmission of events
  has stopped.

:::caution[Perimeter shape]
A collar stores 20 boundary points, and closing the outline uses one, so a
perimeter can have at most **19 corners**. Older collar generations follow only
the first four — check which generation your fleet is before drawing anything
beyond a quadrilateral.
:::
