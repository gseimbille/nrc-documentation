---
title: Appareils
sidebar_position: 3
---

Les appareils sont vos colliers. La lecture est toujours disponible ; l'affectation
à un périmètre nécessite une clé disposant de la portée `devices:write`.

## Lister les appareils

```
GET /api/v1/devices
```

Renvoie tous les appareils de votre compte avec leurs dernières mesures.

```bash
curl -H "Authorization: Bearer VOTRE_CLE_API" \
  https://api.nrc.solutions/api/v1/devices
```

### Paramètres de requête

| Paramètre | Valeurs | Description |
| --- | --- | --- |
| `online` | `true`, `false` | Filtre selon l'état de connexion. |
| `tag` | nom de tag | Uniquement les appareils portant ce tag. Les noms de périmètres étant des tags, ce filtre renvoie les colliers affectés à un périmètre donné. |
| `include_virtual` | `true` | Inclut l'appareil interne `perimeter-*`, qui porte les tags de périmètres et n'est pas un collier réel. Exclu par défaut. |

```bash
# Colliers actuellement connectés dans le périmètre « Pâturage nord »
curl -H "Authorization: Bearer VOTRE_CLE_API" \
  "https://api.nrc.solutions/api/v1/devices?online=true&tag=P%C3%A2turage%20nord"
```

## Récupérer un appareil

```
GET /api/v1/devices/{serial}
```

```bash
curl -H "Authorization: Bearer VOTRE_CLE_API" \
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
    "tags": ["Pâturage nord"],
    "location": { "lat": 45.00312, "lng": 10.00457 },
    "measurements": [ /* … */ ]
  }
}
```

### Champs d'un appareil

| Champ | Type | Remarques |
| --- | --- | --- |
| `id` | chaîne | Identifiant interne. Stable, mais préférez `serial_number`. |
| `serial_number` | chaîne | Numéro inscrit sur le collier. À utiliser dans les URL. |
| `name` | chaîne | Nom d'affichage. |
| `online` | booléen | Indique si le collier est actuellement joignable. |
| `last_heard` | chaîne ou null | Date de la dernière transmission. |
| `tags` | tableau de chaînes | Tags, y compris les affectations de périmètre. |
| `location` | objet ou null | Dernière position connue, ou `null` en l'absence de fix GPS. |
| `measurements` | tableau | Dernière valeur de chaque champ transmis par le collier. |

:::info[`location` vaut null en l'absence de fix]
Un collier qui n'a pas encore acquis de position GPS renvoie `null`, et non
`0,0`. Traitez `null` comme « position inconnue » et conservez l'affichage de la
dernière position connue si vous en avez une : afficher un zéro placerait
l'animal au large de l'Afrique.
:::

## Dernières mesures

```
GET /api/v1/devices/{serial}/measurements
```

Le même tableau de mesures que ci-dessus, accompagné d'un résumé de l'appareil.
Utile lorsque seules les valeurs courantes vous intéressent.

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

`value` est un nombre pour les champs `NUMERIC` et un objet `{lat, lng}` pour
les champs `GEO`. Vérifiez `type` avant de l'utiliser.

### Champs courants

Les champs exacts dépendent du modèle de collier et de sa version de firmware.
On trouve généralement :

| Champ | Unité | Signification |
| --- | --- | --- |
| `LOCATION` | — | Position GPS. |
| `BATTERY` | % | Batterie restante. |
| `TEMPERATURE` | °C | Température au niveau du collier. |
| `MSG_SENT_CNT` | messages | Messages envoyés depuis l'activation. |
| `ALARM_CNT` | alarmes | Avertissements de franchissement déclenchés. |
| `STIMULATION_CNT` | stimulations | Stimulations délivrées. |

Lisez la liste des champs depuis l'API plutôt que de la coder en dur : de
nouveaux champs apparaissent au fil des évolutions du firmware.

## Historique

```
GET /api/v1/devices/{serial}/history
```

Mesures dans le temps. Par défaut, les dernières 24 heures en résolution
complète.

```bash
curl -H "Authorization: Bearer VOTRE_CLE_API" \
  "https://api.nrc.solutions/api/v1/devices/000123/history?start=2026-07-25T00:00:00Z&end=2026-07-26T00:00:00Z&fields=BATTERY,LOCATION&resolution=1h"
```

### Paramètres de requête

| Paramètre | Défaut | Description |
| --- | --- | --- |
| `start` | il y a 24 heures | Horodatage ISO-8601. |
| `end` | maintenant | Horodatage ISO-8601. |
| `fields` | tous les champs actifs | Séparés par des virgules, par exemple `BATTERY,LOCATION`. |
| `resolution` | `raw` | Parmi `raw`, `5m`, `15m`, `1h`, `1d`. |

L'intervalle maximal par requête est de **31 jours**. Pour des périodes plus
longues, procédez par fenêtres successives.

### Réponse

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

Les lignes sont classées de la plus ancienne à la plus récente. Comme pour les
mesures courantes, les champs `GEO` sont renvoyés sous forme d'objets
`{lat, lng}`.

:::tip[Choisissez une résolution adaptée à votre besoin]
Utilisez `raw` pour reconstituer le trajet précis d'un animal. Utilisez `1h` ou
`1d` pour les tendances de batterie ou les longues périodes : la réponse est
bien plus légère et plus simple à représenter graphiquement.
:::

## Affecter un collier à un périmètre

Un collier est maintenu par un périmètre lorsqu'il porte un **tag** Datacake
correspondant exactement au nom de ce périmètre. Ces points de terminaison
gèrent ce lien pour vous.

### Dans quel périmètre se trouve un collier ?

```
GET /api/v1/devices/{serial}/perimeter
```

```json
{
  "data": {
    "serial_number": "000123",
    "perimeter": "Pâturage nord",
    "tags": ["Cellular", "Pâturage nord"]
  }
}
```

`perimeter` vaut `null` lorsque le collier n'est affecté à aucune clôture.

### Affecter

```
PUT /api/v1/devices/{serial}/perimeter
```

```bash
curl -X PUT https://api.nrc.solutions/api/v1/devices/000123/perimeter \
  -H "Authorization: Bearer VOTRE_CLE_API" \
  -H "Content-Type: application/json" \
  -d '{"perimeter": "Pâturage nord"}'
```

Vous pouvez désigner le périmètre par son nom ou par son identifiant —
`{"perimeter_id": 42}` fonctionne également. Le périmètre doit exister dans
votre compte, sinon la requête renvoie `404` plutôt que d'attacher
silencieusement un tag sans signification.

L'affectation est **exclusive et non destructive** :

- Le périmètre auquel le collier était affecté est retiré : il n'appartient
  jamais à deux clôtures à la fois.
- Tous les autres tags — regroupement, matériel, nom de troupeau — sont
  conservés intacts.
- Réaffecter le même périmètre ne change rien.

### Retirer l'affectation

```
DELETE /api/v1/devices/{serial}/perimeter
```

Retire le tag de périmètre du collier en laissant ses autres tags en place.

:::warning[Un collier sans affectation n'a plus de clôture]
Une fois le tag de périmètre retiré, le collier n'est plus maintenu par aucune
limite dès sa prochaine transmission. Affectez-le à un autre périmètre plutôt
que de le laisser sans affectation sur le terrain.
:::

:::info[Colliers partagés avec un autre espace de travail]
Un collier peut être partagé entre plusieurs espaces de travail. Ses tags
appartenant au collier lui-même et non à un espace de travail, un collier déjà
affecté à un périmètre ailleurs ne peut pas être réaffecté ici : la requête
renvoie `409`, et `GET .../perimeter` signale le tag sous
`assigned_in_another_workspace`. Contactez NRC pour qu'il vous soit transféré.
:::

### Prise en compte à la prochaine transmission

Le collier reçoit sa nouvelle clôture lors de sa prochaine remontée de données —
en général sous 30 minutes environ, et non immédiatement. `GET .../perimeter`
reflète le changement tout de suite, car il lit l'affectation et non ce que le
collier a effectivement reçu.

## Gérer les tags directement

```
GET /api/v1/devices/{serial}/tags
PUT /api/v1/devices/{serial}/tags
```

À utiliser pour les tags qui ne sont pas des périmètres : regroupement,
matériel, nom de troupeau. `PUT` remplace l'intégralité de la liste :

```bash
curl -X PUT https://api.nrc.solutions/api/v1/devices/000123/tags \
  -H "Authorization: Bearer VOTRE_CLE_API" \
  -H "Content-Type: application/json" \
  -d '{"tags": ["Cellular", "Troupeau A", "Pâturage nord"]}'
```

Une liste de tags nommant **deux périmètres ou plus est rejetée** avec un `400`,
car la clôture réellement appliquée dépendrait alors de l'ordre des tags et non
de votre intention. Privilégiez `PUT .../perimeter` pour déplacer un collier
d'une clôture à une autre.

Les tags sont comparés aux noms de périmètres par égalité stricte de chaînes :
« Pâturage nord » suivi d'un espace ne correspondra pas, pas plus qu'une
différence de casse.

### Ne demandez que le nécessaire

Préciser `fields` réduit la taille des réponses et accélère les appels.
Demander un mois complet de tous les champs en résolution `raw` pour un grand
troupeau sera lent — restreignez soit l'intervalle, soit les champs, soit la
résolution.
