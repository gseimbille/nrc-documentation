---
title: Plateforme Datacake
sidebar_position: 2
---

CLOVIR s'appuie sur **Datacake**, une plateforme IoT tierce que NRC utilise pour
une partie du système. Datacake fournit les comptes utilisateurs, la gestion des
appareils et les tableaux de bord ; la clôture virtuelle elle-même — périmètres,
logique de franchissement et firmware des colliers — relève de NRC.

Concrètement, vous vous connectez à Datacake sur `https://app.datacake.de` pour
gérer votre équipe et vos colliers, et les fonctionnalités CLOVIR y apparaissent.

## Fonctionnalités des colliers

| Fonction | Description |
| --- | --- |
| Identification du collier | Numérotation et association avec l'animal |
| Statut online | Le collier est sous tension et transmet |
| Statut in zone | Après 5 secondes dans la zone autorisée, le collier passe **in zone**. L'éleveur doit vérifier que les animaux ont franchi la zone tampon |
| Statut par collier | Chaque collier possède son propre statut |
| Attendus et réels | Déclarer le nombre de colliers attendus sur une parcelle et le comparer au nombre réel |
| Comptages in et on | Nombre de colliers **in** (dans la zone) et **on** |
| Récapitulatif par animal | Sons et stimuli délivrés, animal par animal |

## Logique de franchissement

La logique détermine quand un son d'avertissement est déclenché et quand un
stimulus électrique lui succède. Elle peut être modifiée à distance, collier par
collier, selon les besoins de l'éleveur.

| Événement | Comportement |
| --- | --- |
| Retour dans la zone | Aucun son |
| Arrivée dans la zone tampon en sortie | Un son d'avertissement fort et continu se déclenche |
| Durée du son | 5 secondes, en un seul son |
| Stimulus électrique | Si l'animal n'a pas reculé dans ces 5 secondes, un stimulus est administré |

**Zone tampon** — bande de 2 mètres située avant la limite du périmètre, franchie
avant la limite elle-même.

**Stimulus électrique** — 0,5 J à 2 kV, instantané.

## Notifications

- **SMS à l'éleveur**, envoyé une seule fois lorsqu'un animal sort de la zone,
  avec ses dernières coordonnées connues.
- **E-mail**, lorsque Datacake n'a reçu aucun message d'un collier depuis plus
  d'une heure. La logique de clôture n'est pas affectée : seule la transmission
  des événements est interrompue.

:::caution[Forme du périmètre]
Un collier mémorise 20 points de délimitation, dont l'un sert à fermer le
contour : un périmètre peut donc comporter au maximum **19 sommets**. Les
générations de colliers les plus anciennes ne suivent que les quatre premiers —
vérifiez la génération de votre flotte avant de tracer autre chose qu'un
quadrilatère.
:::
