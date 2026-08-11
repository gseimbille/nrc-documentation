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

The logic decides when a warning sound is triggered and when an electrical
stimulus follows. It can be updated remotely, per collar, to suit the farmer.

| Event | Behaviour |
| --- | --- |
| Returning into the zone | No sound |
| Reaching the buffer zone on the way out | A strong, continuous warning sound starts |
| Sound duration | 5 seconds, as a single sound event |
| Electrical stimulus | If the animal has not moved back within those 5 seconds, one stimulus is delivered |

**Buffer zone** — the 2-metre band inside the perimeter limit, crossed before the
boundary itself.

**Electrical stimulus** — 0.5 J at 2 kV, instantaneous.

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
