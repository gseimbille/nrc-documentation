---
title: Devices
sidebar_position: 3
---

Devices are your collars. Reading them is always available; assigning them
to a perimeter requires a key with the `devices:write` scope.

## List devices

```
GET /api/v1/devices
```

Returns every device in your account with its latest measurements.

```bash
curl -H "Authorization: Bearer YOUR_API_KEY" \
  https://api.nrc.solutions/api/v1/devices
```

### Query parameters

| Parameter | Values | Description |
| --- | --- | --- |
| `online` | `true`, `false` | Filter by connectivity state. |
| `tag` | any tag name | Only devices carrying that tag. Because perimeter names are tags, this returns the collars assigned to a given perimeter. |
| `include_virtual` | `true` | Include the internal `perimeter-*` device, which holds perimeter tags and is not a real collar. Excluded by default. |

```bash
# Collars currently online in the "North pasture" perimeter
curl -H "Authorization: Bearer YOUR_API_KEY" \
  "https://api.nrc.solutions/api/v1/devices?online=true&tag=North%20pasture"
```

## Get one device

```
GET /api/v1/devices/{serial}
```

```bash
curl -H "Authorization: Bearer YOUR_API_KEY" \
  https://api.nrc.solutions/api/v1/devices/000123
```

```json
{
  "data": {
    "id": "f87671b5-8011-45ed-82c6-dcacbc054a1d",
    "serial_number": "000123",
    "name": "AVF000123",
    "online": true,
    "last_heard": "2026-07-26T09:00:25Z",
    "tags": ["North pasture"],
    "location": { "lat": 45.00312, "lng": 10.00457 },
    "measurements": [ /* … */ ]
  }
}
```

### Device fields

| Field | Type | Notes |
| --- | --- | --- |
| `id` | string | Internal identifier. Stable, but prefer `serial_number`. |
| `serial_number` | string | The number printed on the collar. Use this in URLs. |
| `name` | string | Display name. |
| `online` | boolean | Whether the collar is currently reachable. |
| `last_heard` | string or null | When the collar last reported. |
| `tags` | string array | Tags, including perimeter assignments. |
| `location` | object or null | Latest position, or `null` if there is no GPS fix. |
| `measurements` | array | Latest value of every field the collar reports. |

:::info[`location` is null when there is no fix]
A collar that has not yet acquired GPS reports `null`, not `0,0`. Treat `null`
as "position unknown" and keep showing the last known position if you have one —
plotting a zero would place the animal off the coast of Africa.
:::

## Latest measurements

```
GET /api/v1/devices/{serial}/measurements
```

The same measurement array as above, plus a short device summary. Useful when
you only need current values and not the full device record.

```json
{
  "data": [
    {
      "field": "BATTERY",
      "label": "Battery",
      "unit": "%",
      "type": "NUMERIC",
      "value": 97.43,
      "measured_at": "2026-07-26T09:00:24Z"
    },
    {
      "field": "LOCATION",
      "label": "Location",
      "unit": null,
      "type": "GEO",
      "value": { "lat": 45.00312, "lng": 10.00457 },
      "measured_at": "2026-07-26T09:00:24Z"
    }
  ],
  "count": 2,
  "device": {
    "serial_number": "000123",
    "online": true,
    "last_heard": "2026-07-26T09:00:25Z",
    "location": { "lat": 45.00312, "lng": 10.00457 }
  }
}
```

`value` is a number for `NUMERIC` fields and a `{lat, lng}` object for `GEO`
fields. Check `type` before using it.

### Common fields

Exact fields depend on the collar model and firmware. Typical values include:

| Field | Unit | Meaning |
| --- | --- | --- |
| `LOCATION` | — | GPS position. |
| `BATTERY` | % | Remaining battery. |
| `TEMPERATURE` | °C | Temperature at the collar. |
| `MSG_SENT_CNT` | messages | Messages sent since activation. |
| `ALARM_CNT` | alarms | Boundary warnings triggered. |
| `STIMULATION_CNT` | stimulations | Stimulations delivered. |

Read the field list from the API rather than hardcoding it — new fields appear
as firmware evolves.

## History

```
GET /api/v1/devices/{serial}/history
```

Measurements over time. Defaults to the last 24 hours at full resolution.

```bash
curl -H "Authorization: Bearer YOUR_API_KEY" \
  "https://api.nrc.solutions/api/v1/devices/000123/history?start=2026-07-25T00:00:00Z&end=2026-07-26T00:00:00Z&fields=BATTERY,LOCATION&resolution=1h"
```

### Query parameters

| Parameter | Default | Description |
| --- | --- | --- |
| `start` | 24 hours ago | ISO-8601 timestamp. |
| `end` | now | ISO-8601 timestamp. |
| `fields` | all active fields | Comma-separated, for example `BATTERY,LOCATION`. |
| `resolution` | `raw` | One of `raw`, `5m`, `15m`, `1h`, `1d`. |

The maximum span per request is **31 days**. For longer periods, page through it
in consecutive windows.

### Response

```json
{
  "data": [
    {
      "time": "2026-07-25T03:13:27Z",
      "values": {
        "BATTERY": 97.07,
        "LOCATION": { "lat": 45.00108, "lng": 10.00219 }
      }
    }
  ],
  "count": 1,
  "device": { "serial_number": "000123" },
  "range": {
    "start": "2026-07-25T00:00:00Z",
    "end": "2026-07-26T00:00:00Z",
    "resolution": "1h",
    "fields": ["BATTERY", "LOCATION"]
  }
}
```

Rows are ordered oldest first. As with current measurements, `GEO` fields come
back as `{lat, lng}` objects.

:::tip[Choose a resolution that matches the question]
Use `raw` to reconstruct an animal's exact track. Use `1h` or `1d` for battery
trends or long periods — the response is far smaller and easier to chart.
:::

## Assign a collar to a perimeter

A collar is enclosed by a perimeter when it carries a Datacake **tag** exactly
matching that perimeter's name. These endpoints manage that link for you.

### Which perimeter is a collar in?

```
GET /api/v1/devices/{serial}/perimeter
```

```json
{
  "data": {
    "serial_number": "000123",
    "perimeter": "North pasture",
    "tags": ["Cellular", "North pasture"]
  }
}
```

`perimeter` is `null` when the collar is not assigned to any fence.

### Assign

```
PUT /api/v1/devices/{serial}/perimeter
```

```bash
curl -X PUT https://api.nrc.solutions/api/v1/devices/000123/perimeter \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"perimeter": "North pasture"}'
```

You may identify the perimeter by name or by id — `{"perimeter_id": 42}` works
just as well. The perimeter must exist in your account, otherwise the request
returns `404` rather than silently attaching a meaningless tag.

Assignment is **exclusive and non-destructive**:

- Any perimeter the collar was previously assigned to is removed, so it is never
  left belonging to two fences at once.
- All other tags — grouping, hardware, herd names — are preserved untouched.
- Re-assigning the same perimeter changes nothing.

### Unassign

```
DELETE /api/v1/devices/{serial}/perimeter
```

Removes the collar's perimeter tag while leaving its other tags in place.

:::warning[An unassigned collar has no fence]
Once the perimeter tag is removed, the collar stops being held by any boundary
at the next check-in. Assign it to another perimeter rather than leaving it
unassigned in the field.
:::

### Changes take effect at the next check-in

The collar receives its new fence the next time it reports in — typically
within about 30 minutes, not instantly. `GET .../perimeter` reflects the change
immediately, because it reads the assignment, not what the collar has actually
received.

## Managing tags directly

```
GET /api/v1/devices/{serial}/tags
PUT /api/v1/devices/{serial}/tags
```

Use these for tags that are not perimeters — grouping, hardware, a herd name.
`PUT` replaces the whole list:

```bash
curl -X PUT https://api.nrc.solutions/api/v1/devices/000123/tags \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"tags": ["Cellular", "Herd A", "North pasture"]}'
```

A tag list naming **two or more perimeters is rejected** with `400`, because the
collar's actual fence would then depend on tag order rather than on your intent.
Prefer `PUT .../perimeter` to move a collar between fences.

Tags are matched to perimeter names by exact string comparison — `"North
pasture "` with a trailing space will not match, and neither will a difference
in capitalisation.

### Requesting only what you need

Naming `fields` explicitly keeps responses small and fast. Requesting the last
month of every field at `raw` resolution for a large herd will be slow — narrow
either the range, the fields, or the resolution.
