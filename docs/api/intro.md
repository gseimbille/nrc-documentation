---
title: Overview
sidebar_position: 1
---

The NRC Partner API gives you programmatic access to your collars and your
virtual fencing perimeters, so you can build your own interface on top of the
CLOVIR platform instead of using the Datacake dashboard.

It is a REST API that returns JSON. Everything the API exposes is scoped to your
own account: you never pass a customer or workspace identifier, and there is no
way to reach another customer's data.

## Base URL

```
https://api.nrc.solutions
```

The service is hosted in Frankfurt (EU).

## What you can do

| Area | Access |
| --- | --- |
| Devices — list, details, latest values | Read |
| Device history — measurements over time | Read |
| Perimeters — list and details | Read |
| Perimeters — create, update, delete | Read and write |

Device data is read-only through this API. Collars report through the CLOVIR
network, and their measurements are recorded by the platform.

## Getting access

API keys are issued by NRC. Contact your NRC representative to request one, and
mention which of your sites or herds the integration will cover.

You will receive a key that looks like this:

```
nrc_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

Keep it secret — see [Authentication](./authentication.md).

## Conventions

Across every endpoint:

- **Timestamps** are ISO-8601 in UTC, for example `2026-07-26T09:00:24Z`.
- **Coordinates** returned by the API are objects: `{ "lat": 43.06, "lng": 141.35 }`.
- **GeoJSON** you send or receive uses the standard `[longitude, latitude]`
  order, which is the opposite of the `lat`/`lng` objects above. This trips up
  most integrations at least once.
- **Successful list responses** are wrapped as `{ "data": [...], "count": n }`,
  and single objects as `{ "data": {...} }`.
- **Errors** always return `{ "error": { "code", "message" } }` — see
  [Errors](./errors.md).

## A first request

```bash
curl -H "Authorization: Bearer YOUR_API_KEY" \
  https://api.nrc.solutions/api/v1/devices
```

```json
{
  "data": [
    {
      "id": "f87671b5-8011-45ed-82c6-dcacbc054a1d",
      "serial_number": "000123",
      "name": "AVF000123",
      "online": true,
      "last_heard": "2026-07-26T09:00:25Z",
      "tags": ["North pasture"],
      "location": { "lat": 43.06004, "lng": 141.35213 },
      "measurements": [
        {
          "field": "BATTERY",
          "label": "Battery",
          "unit": "%",
          "type": "NUMERIC",
          "value": 97.43,
          "measured_at": "2026-07-26T09:00:24Z"
        }
      ]
    }
  ],
  "count": 1
}
```

## Service status

```bash
curl https://api.nrc.solutions/api/v1/health
```

Returns `{"status":"ok","service":"nrc-api","version":"v1"}`. This endpoint
needs no API key and is safe to poll from a monitoring system.
