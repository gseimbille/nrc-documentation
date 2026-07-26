---
title: Authentification
sidebar_position: 2
---

Toutes les requêtes, à l'exception de `/api/v1/health`, nécessitent votre clé
d'API, transmise comme jeton *bearer* :

```bash
curl -H "Authorization: Bearer nrc_live_xxxxxxxxxxxxxxxxxxxxxxxx" \
  https://api.nrc.solutions/api/v1/devices
```

Si votre client HTTP réserve l'en-tête `Authorization`, vous pouvez utiliser
`X-API-Key` à la place :

```bash
curl -H "X-API-Key: nrc_live_xxxxxxxxxxxxxxxxxxxxxxxx" \
  https://api.nrc.solutions/api/v1/devices
```

## Votre clé définit votre périmètre d'accès

La clé identifie votre compte. Chaque réponse est automatiquement limitée à vos
propres appareils et périmètres : vous ne transmettez aucun paramètre de compte,
de client ou d'espace de travail, et il n'est pas possible de construire une
requête atteignant les données d'un autre client.

Demander un appareil ou un périmètre qui ne vous appartient pas renvoie `404`,
exactement comme s'il n'existait pas.

## Usage côté serveur uniquement

:::danger[Ne placez jamais votre clé d'API dans un navigateur ou une application mobile]
Votre clé donne un accès complet à votre flotte et permet de modifier ou de
supprimer vos périmètres. Tout ce qui est distribué sur l'appareil d'un
utilisateur — bundles JavaScript, binaires mobiles — peut être inspecté et la
clé extraite.
:::

Appelez l'API depuis votre propre backend, et faites communiquer votre interface
avec ce backend. L'API n'envoie volontairement aucun en-tête CORS : les
navigateurs ne peuvent donc pas l'appeler directement, même si une clé venait à
être exposée.

## Conservation de la clé

- Stockez-la dans des variables d'environnement ou un gestionnaire de secrets,
  jamais dans un dépôt de code.
- Ne la transmettez pas par e-mail, messagerie ou ticket de support.
- Utilisez une clé distincte par intégration, afin de pouvoir en révoquer une
  sans interrompre les autres.

## Rotation et révocation

Contactez NRC pour faire révoquer ou remplacer une clé. La révocation prend
effet en 30 secondes environ.

Si vous pensez qu'une clé a été exposée, demandez sa révocation immédiate — une
clé de remplacement peut être émise simultanément, ce qui vous permet de mettre
à jour votre configuration sans interruption.

## Limites de débit

Les requêtes sont limitées par clé. Chaque réponse indique l'état courant :

```
X-RateLimit-Limit: 120
X-RateLimit-Remaining: 118
X-RateLimit-Reset: 1785058364
```

`X-RateLimit-Reset` est un horodatage Unix. Dépasser la limite renvoie `429`
avec un en-tête `Retry-After` indiquant le nombre de secondes à attendre.

Les colliers transmettent environ toutes les 30 minutes : interroger l'API plus
souvent renvoie le plus souvent des données inchangées. Récupérer l'ensemble des
appareils toutes les quelques minutes suffit généralement, et coûte bien moins
cher que d'interroger chaque appareil séparément.

## Erreurs d'authentification

| Statut | Code | Signification |
| --- | --- | --- |
| 401 | `unauthorized` | Clé absente, mal formée, révoquée ou inconnue. |
| 403 | `forbidden` | Clé valide, mais dépourvue de l'autorisation nécessaire — par exemple une clé en lecture seule tentant de créer un périmètre. |
| 429 | `rate_limited` | Trop de requêtes. Attendez `Retry-After` secondes. |
