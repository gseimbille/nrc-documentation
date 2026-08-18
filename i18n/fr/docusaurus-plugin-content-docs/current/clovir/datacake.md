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

La **zone tampon** est la bande de 2 mètres située juste à l'intérieur de la
limite du périmètre. L'animal l'atteint avant la limite elle-même, et tout ce qui
suit s'y déroule.

La position est déterminée par GNSS (couramment appelé GPS). La logique peut être
modifiée à distance, collier par collier.

### L'animal entre dans la zone tampon

Un son d'avertissement continu se déclenche immédiatement — fort (100 dB à 30 cm)
et aigu (2731 Hz).

| Temps dans la zone tampon | Ce qui se passe |
| --- | --- |
| 0 s | Le son démarre |
| 3 s | Première stimulation électrique, si l'animal est toujours présent |
| 7 s | Deuxième stimulation électrique, si l'animal est toujours présent |
| au-delà | **Plus aucune stimulation**, mais le son continue tant que l'animal reste |

Un animal qui entre et ressort aussitôt, en moins de 3 secondes, n'entend que le
son et ne reçoit aucune stimulation.

### L'animal revient à l'intérieur du périmètre

Le son s'arrête dès qu'il quitte la zone tampon, et aucune stimulation n'est
administrée. **La logique est réinitialisée** : deux stimulations redeviennent
possibles si l'animal revient dans la zone tampon.

### L'animal sort complètement du périmètre

Même séquence que ci-dessus, mais le son s'arrête après la deuxième stimulation
et un **message est envoyé à l'éleveur**. Si les deux stimulations ont déjà été
administrées dans la zone tampon, aucune autre n'est délivrée.

### L'animal revient dans le périmètre

Un **message est envoyé à l'éleveur** et la logique est réinitialisée : le son et
les deux stimulations redeviennent possibles.

:::info[Deux stimulations au maximum par sortie]
Un collier ne délivre jamais plus de deux stimulations pour une même sortie,
quelle que soit la durée de présence de l'animal dans la zone tampon. Le compteur
n'est remis à zéro que lorsque l'animal revient à l'intérieur du périmètre.
:::

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
