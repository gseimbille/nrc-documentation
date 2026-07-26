---
title: Authentication
sidebar_position: 2
---

Every request except `/api/v1/health` requires your API key, sent as a bearer
token:

```bash
curl -H "Authorization: Bearer nrc_live_xxxxxxxxxxxxxxxxxxxxxxxx" \
  https://api.nrc.solutions/api/v1/devices
```

If your HTTP client reserves the `Authorization` header, you can use `X-API-Key`
instead:

```bash
curl -H "X-API-Key: nrc_live_xxxxxxxxxxxxxxxxxxxxxxxx" \
  https://api.nrc.solutions/api/v1/devices
```

## Your key defines your scope

The key identifies your account. Every response is automatically limited to your
own devices and perimeters — you never pass an account, customer or workspace
parameter, and there is no way to construct a request that reaches another
customer's data.

Asking for a device or perimeter that is not yours returns `404`, exactly as if
it did not exist.

## Server-side only

:::danger Never put your API key in a browser or mobile app
Your key grants full access to your fleet and lets the holder modify or delete
your perimeters. Anything shipped to a user's device — JavaScript bundles,
mobile binaries — can be inspected, and the key extracted.
:::

Call the API from your own backend, and have your frontend talk to that backend.
The API deliberately sends no CORS headers, so browsers cannot call it directly
even if a key were exposed.

## Storing your key

- Keep it in environment variables or a secrets manager, never in source control.
- Do not paste it into support tickets, email, or chat.
- Use a separate key per integration, so one can be revoked without disrupting
  the others.

## Rotating and revoking

Contact NRC to have a key revoked or replaced. Revocation takes effect within
about 30 seconds.

If you believe a key has been exposed, ask for it to be revoked immediately —
a replacement can be issued at the same time, so you can update your
configuration with no interruption.

## Rate limits

Requests are limited per key. Every response carries the current state:

```
X-RateLimit-Limit: 120
X-RateLimit-Remaining: 118
X-RateLimit-Reset: 1785058364
```

`X-RateLimit-Reset` is a Unix timestamp. Exceeding the limit returns `429` with a
`Retry-After` header giving the number of seconds to wait.

Collars report every 30 minutes or so, so polling more often than that mostly
returns unchanged data. Fetching all devices once every few minutes is usually
enough, and is far cheaper than polling each device separately.

## Authentication errors

| Status | Code | Meaning |
| --- | --- | --- |
| 401 | `unauthorized` | Key missing, malformed, revoked, or unknown. |
| 403 | `forbidden` | Valid key, but it lacks the permission for that operation — for example a read-only key attempting to create a perimeter. |
| 429 | `rate_limited` | Too many requests. Wait for `Retry-After` seconds. |
