---
title: Carte
sidebar_position: 5
---

Le tableau de bord **Map** montre où se trouvent vos colliers, à quel périmètre
chacun appartient, et permet de déplacer un collier d'un périmètre à un autre.

Ouvrez-le depuis **Dashboards → Map** dans le menu de gauche de Datacake.

## Tous les appareils

Par défaut, la carte affiche l'ensemble des colliers et des périmètres de votre
compte.

![Carte affichant tous les colliers et périmètres](/img/clovir/map-overview.webp)

- Chaque point représente un collier. **Vert** signifie en ligne, **rouge** hors
  ligne — les mêmes couleurs que la légende en bas à gauche.
- Les périmètres sont tracés en pointillés bleus.
- La carte se centre automatiquement sur vos colliers.
- Les positions sont actualisées toutes les 30 secondes : vous pouvez laisser le
  tableau de bord ouvert.

Un collier n'ayant pas encore acquis de position GPS n'apparaît pas, faute de
position à afficher.

## Un collier en particulier

Cliquez sur un point — ou choisissez un collier dans la liste déroulante en haut
— pour l'afficher seul.

![Carte centrée sur un collier](/img/clovir/map-device-focus.webp)

L'affichage montre alors :

- **Le trajet récent du collier**, sous forme de ligne orange reliant ses
  dernières positions connues. Il couvre les 24 dernières heures, avec un
  maximum de 20 positions : sur un collier qui émet fréquemment, vous voyez donc
  les 20 derniers relevés plutôt que la journée entière.
- **Son périmètre**, rempli en vert au lieu du contour bleu.
- **Une fiche récapitulative**, en bas à droite : le nom du collier, son
  périmètre et le nombre d'animaux attendus, ainsi que la date de sa dernière
  transmission.

## Changer le périmètre d'un collier

La liste déroulante en haut à droite indique le périmètre auquel le collier
appartient actuellement. Sélectionnez-en un autre pour le déplacer.

En arrière-plan, cette action modifie le **tag** du collier, qui est ce qui le
relie à un périmètre — voir [Gestion des périmètres](./perimeters.md). Les
autres tags du collier sont préservés, et il n'appartient jamais à deux
périmètres à la fois.

:::info[Le collier reçoit sa nouvelle clôture à sa prochaine transmission]
La carte se met à jour immédiatement, mais le collier n'a connaissance du
changement qu'à sa prochaine remontée de données — en général sous 30 minutes
environ. Jusque-là, il continue d'appliquer sa limite précédente.
:::
