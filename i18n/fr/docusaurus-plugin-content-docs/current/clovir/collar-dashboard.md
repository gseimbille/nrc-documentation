---
title: Tableau de bord d'un collier
sidebar_position: 6
---

Cliquez sur **Devices** dans le menu de gauche, puis sélectionnez le collier que
vous souhaitez consulter.

![Tableau de bord d'un collier](/img/clovir/collar-dashboard.png)

## En-tête

Le haut de la page indique le **numéro de série** du collier, la date de sa
**dernière transmission** et ses **tags**. Le tag correspondant au nom d'un
périmètre est ce qui maintient le collier à l'intérieur de ce périmètre — voir
[Gestion des périmètres](./perimeters.md).

## État

- **Online** (vert) signifie qu'un message provenant du collier a été reçu.
  **Offline** (rouge) indique que le collier est éteint, n'émet pas, ou se trouve
  en zone blanche.
- **In Geofence** signifie que le collier est à l'intérieur de son périmètre ;
  **Out Geofence** qu'il en est sorti.

## Relevés actuels

- **Temperature** — température extérieure au niveau du collier, en degrés
  Celsius.
- **Battery** — charge restante, en pourcentage.
- **Map** — dernière position connue du collier.

## Compteurs

Le graphique retrace les **alarmes** et les **stimulations** dans le temps : vous
voyez ainsi à quels moments un collier a sollicité sa limite, et non uniquement
le cumul.

Les totaux affichés à droite sont :

- **Message Cnt** — messages de géolocalisation reçus du collier.
- **Alarm Cnt** — franchissements du périmètre.
- **Stimulation Cnt** — stimuli électriques délivrés par le collier.

:::info[Les autres onglets]
**History** affiche les mesures passées et **Downlinks** permet d'envoyer une
commande au collier. Les onglets restants relèvent de la configuration et du
diagnostic, généralement utilisés avec le support NRC.
:::
