---
title: Présentation
sidebar_position: 1
---

L'API Partenaires NRC donne un accès programmatique à vos colliers et à vos
périmètres de clôture virtuelle. Elle vous permet de développer votre propre
interface sur la plateforme CLOVIR plutôt que d'utiliser le tableau de bord
Datacake.

C'est une API REST qui renvoie du JSON. Tout ce qu'expose l'API est limité à
votre propre compte : vous ne transmettez jamais d'identifiant de client ou
d'espace de travail, et il n'existe aucun moyen d'atteindre les données d'un
autre client.

## URL de base

```
https://api.nrc.solutions
```

Le service est hébergé à Francfort (UE).

## Fonctionnalités disponibles

| Domaine | Accès |
| --- | --- |
| Appareils — liste, détail, dernières valeurs | Lecture |
| Historique des appareils — mesures dans le temps | Lecture |
| Périmètres — liste et détail | Lecture |
| Périmètres — création, modification, suppression | Lecture et écriture |

Les données des appareils sont en lecture seule via cette API. Les colliers
transmettent leurs données par le réseau CLOVIR, et leurs mesures sont
enregistrées par la plateforme.

## Obtenir un accès

Les clés d'API sont délivrées par NRC. Contactez votre interlocuteur NRC pour en
demander une, en précisant les sites ou les troupeaux concernés par
l'intégration.

Vous recevrez une clé de la forme suivante :

```
nrc_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

Gardez-la confidentielle — voir [Authentification](./authentication.md).

## Conventions

Sur l'ensemble des points de terminaison :

- Les **horodatages** sont au format ISO-8601 en UTC, par exemple
  `2026-07-26T09:00:24Z`.
- Les **coordonnées** renvoyées par l'API sont des objets :
  `{ "lat": 43.06, "lng": 141.35 }`.
- Le **GeoJSON** que vous envoyez ou recevez utilise l'ordre standard
  `[longitude, latitude]`, soit l'inverse des objets `lat`/`lng` ci-dessus.
  C'est l'erreur la plus fréquente en début d'intégration.
- Les **listes** sont encapsulées dans `{ "data": [...], "count": n }`, et les
  objets uniques dans `{ "data": {...} }`.
- Les **erreurs** renvoient toujours `{ "error": { "code", "message" } }` —
  voir [Erreurs](./errors.md).

## Première requête

```bash
curl -H "Authorization: Bearer VOTRE_CLE_API" \
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
      "tags": ["Pâturage nord"],
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

## État du service

```bash
curl https://api.nrc.solutions/api/v1/health
```

Renvoie `{"status":"ok","service":"nrc-api","version":"v1"}`. Ce point de
terminaison ne nécessite aucune clé d'API et peut être interrogé par un système
de supervision.
