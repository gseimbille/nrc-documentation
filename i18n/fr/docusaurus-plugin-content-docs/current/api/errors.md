---
title: Erreurs
sidebar_position: 5
---

Toutes les erreurs utilisent la même structure, ce qui vous permet de vous
appuyer sur `error.code` plutôt que d'analyser les messages :

```json
{
  "error": {
    "code": "device_not_found",
    "message": "No device with serial number \"000123\""
  }
}
```

`code` est stable et peut servir de base à votre logique. `message` est destiné
à la lecture humaine et sa formulation peut évoluer — utilisez-le pour les
journaux et le support, pas pour piloter votre code.

## Codes de statut

| Statut | Signification |
| --- | --- |
| 200 | Succès. |
| 201 | Créé — renvoyé lors de la création d'un périmètre. |
| 204 | Succès sans contenu — renvoyé lors de la suppression d'un périmètre. |
| 400 | Requête mal formée. Le champ concerné est indiqué dans `message`. |
| 401 | Clé d'API absente, mal formée ou révoquée. |
| 403 | Votre clé ne dispose pas de l'autorisation requise. |
| 404 | Ressource inexistante **dans votre compte**. |
| 405 | Méthode HTTP incorrecte. L'en-tête `Allow` indique les méthodes acceptées. |
| 409 | Conflit — un périmètre portant ce nom existe déjà. |
| 429 | Limite de débit dépassée. Réessayez après `Retry-After` secondes. |
| 500 | Erreur serveur inattendue. Vous pouvez réessayer ; contactez NRC si elle persiste. |
| 502 | La plateforme amont est injoignable ou a rejeté la requête. Réessayez avec un délai croissant. |

## Codes d'erreur

| Code | Statut | Remarques |
| --- | --- | --- |
| `bad_request` | 400 | Échec de validation. `message` indique le champ en cause. |
| `unauthorized` | 401 | Voir [Authentification](./authentication.md). |
| `forbidden` | 403 | La clé ne dispose pas de l'autorisation nécessaire. |
| `device_not_found` | 404 | Aucun appareil avec ce numéro de série dans votre compte. |
| `perimeter_not_found` | 404 | Aucun périmètre avec cet identifiant dans votre compte. |
| `method_not_allowed` | 405 | Consultez l'en-tête `Allow`. |
| `perimeter_name_taken` | 409 | Choisissez un autre nom de périmètre. |
| `rate_limited` | 429 | Réduisez la cadence et réessayez. |
| `internal_error` | 500 | Défaillance inattendue de notre côté. |
| `upstream_error` | 502 | La plateforme des appareils est temporairement indisponible. |

## À propos du code 404

`404` signifie « introuvable **dans votre compte** ». Puisque votre clé d'API
délimite chaque requête, une ressource qui existe mais appartient à un autre
client est signalée comme absente plutôt qu'interdite. C'est volontaire : cela
évite de confirmer qu'un identifiant existe ailleurs sur la plateforme.

Un `404` sur un appareil que vous pensez posséder signifie donc généralement que
le numéro de série est erroné, ou que le collier n'a pas encore été affecté à
votre compte.

## Réessais

- Les codes `429`, `500` et `502` méritent un réessai. Utilisez un délai
  exponentiel et respectez `Retry-After` lorsqu'il est présent.
- Les codes `400`, `401`, `403`, `404` et `409` ne réussiront pas au réessai :
  la requête ou votre configuration doit être corrigée.
