---
title: Périmètres
sidebar_position: 4
---

Les périmètres sont les clôtures virtuelles à l'intérieur desquelles vos
colliers sont maintenus. Contrairement aux appareils, ils peuvent être créés,
modifiés et supprimés via l'API.

## Lien entre périmètres et colliers

Le **nom d'un périmètre est aussi son tag**. Un collier est maintenu par un
périmètre lorsqu'il porte un tag correspondant exactement au nom de ce
périmètre.

```
Périmètre « Pâturage nord »  ←→  collier taggé « Pâturage nord »
```

Les tags se gèrent depuis le tableau de bord Datacake — voir
[Gestion des périmètres](../clovir/perimeters.md) dans le manuel utilisateur.
Cette API crée et modifie la géométrie du périmètre ; elle n'y affecte pas les
colliers.

Renommer un périmètre rompt donc le lien avec les colliers portant encore
l'ancien tag. Mettez également les tags à jour, faute de quoi les colliers
retomberont sur leur clôture précédente.

## Lister les périmètres

```
GET /api/v1/perimeters
```

```json
{
  "data": [
    {
      "id": 42,
      "name": "Pâturage nord",
      "description": "Pâture d'été, parcelle haute",
      "nb_animal_expected": 25,
      "geojson": { "type": "FeatureCollection", "features": [ /* … */ ] },
      "created_at": "2026-07-26T09:20:11Z"
    }
  ],
  "count": 1
}
```

## Récupérer un périmètre

```
GET /api/v1/perimeters/{id}
```

## Créer un périmètre

```
POST /api/v1/perimeters
```

```bash
curl -X POST https://api.nrc.solutions/api/v1/perimeters \
  -H "Authorization: Bearer VOTRE_CLE_API" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Pâturage nord",
    "description": "Pâture d été, parcelle haute",
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

Renvoie `201` avec le périmètre créé.

### Champs du corps de requête

| Champ | Obligatoire | Remarques |
| --- | --- | --- |
| `name` | oui | 200 caractères maximum. Doit être unique dans votre compte, et sert également de tag pour les colliers. |
| `geojson` | oui | Un `FeatureCollection` GeoJSON contenant exactement un `Polygon`, de 3 à 20 sommets. |
| `description` | non | Texte libre. |
| `nb_animal_expected` | non | Entier, de 0 à 32767. |

## Modifier un périmètre

```
PATCH /api/v1/perimeters/{id}
```

N'envoyez que les champs à modifier — tout champ omis reste inchangé, ce qui
permet de renommer un périmètre sans retransmettre sa géométrie.

```bash
curl -X PATCH https://api.nrc.solutions/api/v1/perimeters/42 \
  -H "Authorization: Bearer VOTRE_CLE_API" \
  -H "Content-Type: application/json" \
  -d '{"nb_animal_expected": 30}'
```

## Supprimer un périmètre

```
DELETE /api/v1/perimeters/{id}
```

Renvoie `204` sans contenu.

:::warning[Supprimer un périmètre supprime une clôture active]
Les colliers portant encore son tag perdent cette limite. Affectez-les d'abord à
un autre périmètre.
:::

## Contraintes GeoJSON

Le champ `geojson` est validé avant d'être accepté, car il est converti en la
limite que vos colliers font effectivement respecter.

- Exactement **un** objet `Polygon` — un collier ne retient qu'une seule zone.
- Un **seul anneau** : les trous ne sont pas pris en charge.
- Entre **3 et 20 sommets**.
- Les positions sont au format `[longitude, latitude]` — **longitude d'abord**.
- Les anneaux doivent être **fermés** : la dernière position doit être identique
  à la première.
- Latitude comprise entre −90 et 90, longitude entre −180 et 180.

:::warning[Ces limites viennent du collier, pas de l'API]
Un collier ne mémorise qu'une seule zone de **20 sommets maximum**. Le format
GeoJSON permet de décrire plusieurs polygones, des trous ou un contour de cent
sommets, mais un collier ne peut rien faire respecter de tout cela : l'API les
refuse plutôt que d'accepter une clôture qui ne fonctionnerait jamais sur le
terrain.

Pour délimiter deux zones distinctes, créez deux périmètres et affectez chaque
collier à celui qui le concerne.
:::

Un anneau valide, fermé et dans le bon ordre :

```json
[
  [10.0000, 45.0000],
  [10.0060, 45.0000],
  [10.0060, 45.0050],
  [10.0000, 45.0050],
  [10.0000, 45.0000]
]
```

:::danger[La longitude vient en premier]
Dans `[10.0, 45.0]`, la longitude vaut `10.0` et la latitude `45.0`. Inverser une
paire ne provoque généralement pas d'erreur : cela déplace silencieusement la
clôture, souvent dans une tout autre région du monde.

L'API ne peut rejeter une paire inversée que lorsque l'inversion produit une
latitude impossible, c'est-à-dire lorsque la longitude dépasse ±90°. En deçà, les
deux valeurs restent valides individuellement et le polygone est accepté bien
qu'il soit au mauvais endroit. Près de la moitié des longitudes du globe se
situent dans cet angle mort : **vérifiez donc toujours un nouveau périmètre sur
une carte avant d'y affecter des colliers.**
:::

### Nombre de côtés

L'API accepte de 3 à 20 sommets, mais **les générations de colliers les plus
anciennes ne gèrent que les périmètres à quatre côtés** et ignorent le reste du
contour. Confirmez auprès de NRC la génération de votre flotte avant de dessiner
une forme complexe — voir [Gestion des périmètres](../clovir/perimeters.md).

### Dessiner un polygone

Pour produire des coordonnées manuellement, [geojson.io](https://geojson.io) est
la solution la plus simple : dessinez la forme et copiez le `FeatureCollection`
obtenu. Le manuel utilisateur détaille cette étape dans
[Interface GeoJSON.io](../clovir/geojson.md).

## Noms en double

Créer un périmètre avec un nom que vous utilisez déjà renvoie `409` :

```json
{
  "error": {
    "code": "perimeter_name_taken",
    "message": "A perimeter named \"Pâturage nord\" already exists"
  }
}
```

Les noms doivent être uniques au sein de votre compte car ils servent de tags
pour les colliers : deux périmètres de même nom rendraient l'affectation d'un
collier ambiguë.
