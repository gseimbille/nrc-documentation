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
            [141.3500, 43.0600],
            [141.3560, 43.0600],
            [141.3560, 43.0650],
            [141.3500, 43.0650],
            [141.3500, 43.0600]
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
| `geojson` | yes | A GeoJSON `FeatureCollection` containing at least one `Polygon`. |
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

- Must be a `FeatureCollection` containing at least one `Polygon` feature.
- Positions are `[longitude, latitude]` — **longitude first**.
- Rings must be **closed**: the last position must be identical to the first.
- Latitude between −90 and 90, longitude between −180 and 180.
- At most 500 vertices per ring.

A valid ring, closed and in the right order:

```json
[
  [141.3500, 43.0600],
  [141.3560, 43.0600],
  [141.3560, 43.0650],
  [141.3500, 43.0650],
  [141.3500, 43.0600]
]
```

:::danger[Longitude comes first]
`[141.35, 43.06]` means longitude 141.35, latitude 43.06 — in Hokkaido.
Reversing them describes a point in the Indian Ocean.

The API rejects a reversed pair when the resulting latitude falls outside ±90,
which catches the mistake at Japanese longitudes. It **cannot** catch it
everywhere: at European longitudes both values stay in valid range, and the
polygon is accepted while sitting in the wrong hemisphere. Always check a new
perimeter on a map before assigning collars to it.
:::

### Number of sides

Older collar generations support **four-sided perimeters only**. Newer
generations follow the full polygon. The API accepts complex shapes regardless,
so confirm with NRC which applies to your fleet before drawing one — see
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
