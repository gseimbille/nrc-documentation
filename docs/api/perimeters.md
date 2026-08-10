---
title: Perimeters
sidebar_position: 4
---

Perimeters are the virtual fences your collars are held within. Unlike devices,
these can be created, updated and deleted through the API.

## How perimeters and collars are linked

A perimeter's **name is also its tag**. A collar is enclosed by a perimeter when
it carries a tag exactly matching that perimeter's name.

```
Perimeter "North pasture"  ←→  collar tagged "North pasture"
```

Tags are managed from the Datacake dashboard — see
[Perimeter management](../clovir/perimeters.md) in the user manual. This API
creates and edits the perimeter geometry; it does not assign collars to it.

Renaming a perimeter therefore breaks the link to any collar still carrying the
old tag. Update the tags as well, or the collars will fall back to their
previous fence.

## List perimeters

```
GET /api/v1/perimeters
```

```json
{
  "data": [
    {
      "id": 42,
      "name": "North pasture",
      "description": "Summer grazing, upper field",
      "nb_animal_expected": 25,
      "geojson": { "type": "FeatureCollection", "features": [ /* … */ ] },
      "created_at": "2026-07-26T09:20:11Z"
    }
  ],
  "count": 1
}
```

## Get one perimeter

```
GET /api/v1/perimeters/{id}
```

## Create a perimeter

```
POST /api/v1/perimeters
```

```bash
curl -X POST https://api.nrc.solutions/api/v1/perimeters \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "North pasture",
    "description": "Summer grazing, upper field",
    "nb_animal_expected": 25,
    "geojson": {
      "type": "FeatureCollection",
      "features": [{
        "type": "Feature",
        "properties": {},
        "geometry": {
          "type": "Polygon",
          "coordinates": [[
            [10.0000, 45.0000],
            [10.0060, 45.0000],
            [10.0060, 45.0050],
            [10.0000, 45.0050],
            [10.0000, 45.0000]
          ]]
        }
      }]
    }
  }'
```

Returns `201` with the created perimeter.

### Body fields

| Field | Required | Notes |
| --- | --- | --- |
| `name` | yes | Up to 200 characters. Must be unique within your account, and doubles as the collar tag. |
| `geojson` | yes | A GeoJSON `FeatureCollection` holding exactly one `Polygon`, 3–20 corners. |
| `description` | no | Free text. |
| `nb_animal_expected` | no | Integer, 0–32767. |

## Update a perimeter

```
PATCH /api/v1/perimeters/{id}
```

Send only the fields you want to change — anything you omit is left untouched,
so you can rename a perimeter without resending its geometry.

```bash
curl -X PATCH https://api.nrc.solutions/api/v1/perimeters/42 \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"nb_animal_expected": 30}'
```

## Delete a perimeter

```
DELETE /api/v1/perimeters/{id}
```

Returns `204` with no body.

:::warning[Deleting a perimeter removes an active fence]
Collars still tagged with its name lose that boundary. Move them to another
perimeter first.
:::

## GeoJSON requirements

The `geojson` field is validated before it is accepted, because it is converted
into the boundary your collars actually enforce.

- Exactly **one** `Polygon` feature — a collar holds one zone.
- A **single ring**: holes are not supported.
- Between **3 and 20 corners**.
- Positions are `[longitude, latitude]` — **longitude first**.
- Rings must be **closed**: the last position must be identical to the first.
- Latitude between −90 and 90, longitude between −180 and 180.

:::warning[These limits come from the collar, not the API]
A collar stores exactly one zone of at most **20 corners**. GeoJSON itself
happily describes several polygons, holes, or a hundred-corner outline — but a
collar cannot enforce any of that, so the API rejects it rather than accepting a
fence that would never work in the field.

If you need to enclose two separate areas, create two perimeters and assign each
collar to the one it belongs in.
:::

A valid ring, closed and in the right order:

```json
[
  [10.0000, 45.0000],
  [10.0060, 45.0000],
  [10.0060, 45.0050],
  [10.0000, 45.0050],
  [10.0000, 45.0000]
]
```

:::danger[Longitude comes first]
In `[10.0, 45.0]` the longitude is `10.0` and the latitude is `45.0`. Reversing a
pair does not usually produce an error — it silently relocates the fence, often
to a completely different part of the world.

The API can only reject a reversed pair when the swap produces an impossible
latitude, which happens when the longitude is beyond ±90°. Below that, both
numbers remain individually valid and the polygon is accepted even though it is
in the wrong place. Roughly half the world's longitudes fall inside that blind
spot, so **always confirm a new perimeter on a map before assigning collars to
it.**
:::

### Number of sides

The API accepts 3 to 20 corners, but **older collar generations support
four-sided perimeters only** and ignore the rest of the outline. Confirm with NRC
which generation your fleet is before drawing a complex shape — see
[Perimeter management](../clovir/perimeters.md).

### Drawing a polygon

To produce coordinates by hand, [geojson.io](https://geojson.io) is the simplest
option: draw the shape and copy the resulting `FeatureCollection`. The user
manual covers this in [GeoJSON.io interface](../clovir/geojson.md).

## Duplicate names

Creating a perimeter with a name you already use returns `409`:

```json
{
  "error": {
    "code": "perimeter_name_taken",
    "message": "A perimeter named \"North pasture\" already exists"
  }
}
```

Names must be unique within your account because they double as collar tags —
two perimeters sharing a name would make a collar's assignment ambiguous.
