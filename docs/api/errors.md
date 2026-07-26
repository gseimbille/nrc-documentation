---
title: Errors
sidebar_position: 5
---

Every error returns the same envelope, so you can branch on `error.code` rather
than parsing messages:

```json
{
  "error": {
    "code": "device_not_found",
    "message": "No device with serial number \"000123\""
  }
}
```

`code` is stable and safe to depend on. `message` is human-readable and may be
reworded over time — use it for logs and support, not for control flow.

## Status codes

| Status | Meaning |
| --- | --- |
| 200 | Success. |
| 201 | Created — returned when a perimeter is created. |
| 204 | Success with no body — returned when a perimeter is deleted. |
| 400 | The request was malformed. See `message` for the specific field. |
| 401 | Missing, malformed or revoked API key. |
| 403 | Your key lacks the required permission. |
| 404 | No such resource **in your account**. |
| 405 | Wrong HTTP method. The `Allow` header lists what is accepted. |
| 409 | Conflict — a perimeter with that name already exists. |
| 429 | Rate limit exceeded. Retry after `Retry-After` seconds. |
| 500 | Unexpected server error. Safe to retry; contact NRC if it persists. |
| 502 | The upstream platform was unreachable or rejected the request. Retry with backoff. |

## Error codes

| Code | Status | Notes |
| --- | --- | --- |
| `bad_request` | 400 | Validation failed. `message` names the offending field. |
| `unauthorized` | 401 | See [Authentication](./authentication.md). |
| `forbidden` | 403 | Key lacks the needed permission. |
| `device_not_found` | 404 | No device with that serial number in your account. |
| `perimeter_not_found` | 404 | No perimeter with that id in your account. |
| `method_not_allowed` | 405 | Check the `Allow` header. |
| `perimeter_name_taken` | 409 | Choose a different perimeter name. |
| `rate_limited` | 429 | Back off and retry. |
| `internal_error` | 500 | Unexpected failure on our side. |
| `upstream_error` | 502 | The device platform is temporarily unavailable. |

## A note on 404

`404` means "not found **in your account**". Because your API key scopes every
request, a resource that exists but belongs to another customer is reported as
missing rather than forbidden. This is intentional — it avoids confirming that
an identifier exists elsewhere on the platform.

So a `404` on a device you believe you own usually means the serial number is
wrong, or the collar has not yet been assigned to your account.

## Retrying

- `429`, `500` and `502` are worth retrying. Use exponential backoff, and honour
  `Retry-After` when it is present.
- `400`, `401`, `403`, `404` and `409` will not succeed on retry — the request
  or your configuration needs to change.
