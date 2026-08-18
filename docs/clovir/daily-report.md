---
title: Daily report
sidebar_position: 11
---

Every day CLOVIR sends an email summarising the last 24 hours across your fleet:
fleet-wide totals, a row per collar, three charts, and — where fence geometry is
available — how much of each paddock has been grazed.

Use it as a morning checklist. The [Recommended daily actions](#recommended-daily-actions)
at the end of this page say what to do about each figure.

## Fleet summary

Tiles at the top of the email, aggregated over the last 24 hours.

| Tile | Meaning |
| --- | --- |
| Devices reporting | Collars that transmitted data in the last 24 hours |
| Outside fence | Collars currently outside their assigned area |
| Offline >24h | Collars with no data received for more than 24 hours |
| Alarms today | Sound alerts triggered across the fleet today |
| Stimulations today | Electrical stimulations delivered today |
| Motion events today | Movement events recorded across the fleet today |
| Avg distance/day | Average distance travelled per animal, in metres |
| Fields tracked | Geofenced fields currently monitored |

## Per-collar figures

One row per collar in the device table.

| Column | Meaning |
| --- | --- |
| Battery | Remaining charge, as a percentage. Colour-coded — see below |
| Fence | Whether the collar is inside or outside its assigned area |
| Alarms | Sound alerts triggered by that collar today |
| Stimulations | Electrical stimulations delivered to that animal today |
| Motion | Accelerometer-detected movement events logged today |
| Distance | Estimated distance travelled today in km, from consecutive GPS fixes |
| Messages | Data transmissions sent by the collar today |
| Last seen | Time since the collar last reported |

## Colour coding

| Indicator | Colour | Meaning |
| --- | --- | --- |
| Battery — good | Green | Above 30% |
| Battery — warning | Amber | Between 15% and 30% — charge soon |
| Battery — critical | Red | 15% or below — needs attention now |
| Outside fence | Red | The animal has left its assigned area |
| Offline >24h | Red | No data for more than 24 hours |
| Alarms today | Red | One or more sound alerts triggered |
| Stimulations today | Red | One or more stimulations delivered |
| Field fully grazed | Green | Coverage reached the threshold — time to move the herd |

## Charts

Three bar charts close the email, each covering the previous 24 hours. Collars are
sorted from highest to lowest, so the most active animals appear first.

**Stimulations vs alarms** — sound alarms and electrical stimulations per collar,
side by side. Many alarms with few stimulations means the animal approaches the
boundary but respects it; a high stimulation count means it is crossing
repeatedly.

**Distance travelled** — kilometres per animal, from consecutive GPS fixes. An
unusually short distance can mean a stationary or offline collar; an unusually
long one is worth checking against the fence boundary.

**Motion events** — accelerometer events per collar, useful for spotting animals
markedly more or less active than the rest of the herd.

## Field coverage

Below the charts, when fence geometry is available, the report reconstructs how
much of each paddock was grazed. It combines the perimeter last sent to each
collar with the day's GPS fixes.

| Item | Meaning |
| --- | --- |
| Field grouping | Collars sharing a perimeter are grouped into one field automatically; the heading lists their IDs |
| Area (ha) | Area of the geofenced polygon, from the fence vertices last sent to those collars |
| Coverage % | Share of the field estimated grazed today. A circle of 8 m radius is placed around each GPS fix; anything inside it counts as grazed |
| Coverage map | Green cells were visited by at least one animal today, red cells were not. The perimeter is drawn as an outline |
| Field fully grazed | Shown in green at 85% coverage or more — the recommended signal to rotate the herd |

:::info[Coverage needs a configured fence]
This section only appears once fence geometry has been pushed to a collar at
least once. Collars with no configured fence are left out of it.
:::

## Recommended daily actions

- **Offline >24h** — investigate any non-zero value: either a cellular coverage
  problem or a flat battery.
- **Outside fence** — locate the animal, then decide between adjusting the
  boundary and going out to check.
- **Battery column** — collect any collar showing amber or red for charging at the
  next opportunity.
- **Stimulations vs alarms** — the animals at the top of the chart are the ones
  interacting most with the boundary.
- **Field fully grazed** — if the banner is there, plan a paddock rotation.
