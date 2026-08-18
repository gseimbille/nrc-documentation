---
title: Rapport quotidien
sidebar_position: 11
---

Chaque jour, CLOVIR envoie un e-mail résumant les dernières 24 heures de votre
troupeau : totaux pour l'ensemble de la flotte, une ligne par collier, trois
graphiques et — lorsque la géométrie des clôtures est disponible — la part de
chaque parcelle qui a été pâturée.

Utilisez-le comme liste de contrôle matinale. Les
[actions quotidiennes recommandées](#actions-quotidiennes-recommandées) en fin de
page indiquent quoi faire de chaque chiffre.

## Synthèse de la flotte

Les tuiles en haut de l'e-mail, agrégées sur les dernières 24 heures.

| Tuile | Signification |
| --- | --- |
| Devices reporting | Colliers ayant transmis des données ces 24 dernières heures |
| Outside fence | Colliers actuellement hors de leur zone assignée |
| Offline >24h | Colliers sans données depuis plus de 24 heures |
| Alarms today | Alertes sonores déclenchées aujourd'hui sur l'ensemble de la flotte |
| Stimulations today | Stimulations électriques délivrées aujourd'hui |
| Motion events today | Événements de mouvement enregistrés aujourd'hui |
| Avg distance/day | Distance moyenne parcourue par animal, en mètres |
| Fields tracked | Parcelles suivies actuellement |

## Chiffres par collier

Une ligne par collier dans le tableau des appareils.

| Colonne | Signification |
| --- | --- |
| Battery | Charge restante, en pourcentage. Code couleur ci-dessous |
| Fence | Le collier est à l'intérieur ou à l'extérieur de sa zone assignée |
| Alarms | Alertes sonores déclenchées par ce collier aujourd'hui |
| Stimulations | Stimulations électriques délivrées à cet animal aujourd'hui |
| Motion | Événements de mouvement détectés par l'accéléromètre aujourd'hui |
| Distance | Distance estimée parcourue aujourd'hui en km, d'après les positions GPS successives |
| Messages | Transmissions de données envoyées par le collier aujourd'hui |
| Last seen | Temps écoulé depuis la dernière transmission |

## Code couleur

| Indicateur | Couleur | Signification |
| --- | --- | --- |
| Batterie — bonne | Vert | Au-dessus de 30 % |
| Batterie — attention | Orange | Entre 15 % et 30 % — à recharger prochainement |
| Batterie — critique | Rouge | 15 % ou moins — intervention immédiate |
| Outside fence | Rouge | L'animal a quitté sa zone assignée |
| Offline >24h | Rouge | Aucune donnée depuis plus de 24 heures |
| Alarms today | Rouge | Au moins une alerte sonore déclenchée |
| Stimulations today | Rouge | Au moins une stimulation délivrée |
| Field fully grazed | Vert | Le seuil de couverture est atteint — il est temps de déplacer le troupeau |

## Graphiques

Trois graphiques en barres closent l'e-mail, chacun sur les 24 heures écoulées.
Les colliers sont classés du plus élevé au plus faible : les animaux les plus
actifs apparaissent en premier.

**Stimulations vs alarms** — alertes sonores et stimulations électriques par
collier, côte à côte. Beaucoup d'alarmes et peu de stimulations signifie que
l'animal s'approche de la limite mais la respecte ; un nombre élevé de
stimulations indique des franchissements répétés.

**Distance travelled** — kilomètres par animal, d'après les positions GPS
successives. Une distance anormalement faible peut signaler un collier immobile
ou hors ligne ; une distance anormalement élevée mérite une vérification de la
limite de clôture.

**Motion events** — événements détectés par l'accéléromètre, utiles pour repérer
les animaux nettement plus ou moins actifs que le reste du troupeau.

## Couverture des parcelles

Sous les graphiques, lorsque la géométrie de clôture est disponible, le rapport
reconstitue la part de chaque parcelle pâturée. Il combine le périmètre envoyé en
dernier à chaque collier avec les positions GPS de la journée.

| Élément | Signification |
| --- | --- |
| Regroupement | Les colliers partageant un même périmètre forment automatiquement une parcelle ; l'en-tête liste leurs identifiants |
| Area (ha) | Superficie du polygone, calculée à partir des sommets envoyés en dernier à ces colliers |
| Coverage % | Part de la parcelle estimée pâturée aujourd'hui. Un cercle de 8 m de rayon est placé autour de chaque position GPS ; tout ce qui s'y trouve compte comme pâturé |
| Carte de couverture | Les cellules vertes ont été visitées par au moins un animal aujourd'hui, les rouges non. Le périmètre est tracé en contour |
| Field fully grazed | Affiché en vert à partir de 85 % de couverture — signal recommandé pour faire tourner le troupeau |

:::info[La couverture nécessite une clôture configurée]
Cette section n'apparaît qu'une fois la géométrie de clôture envoyée au moins une
fois à un collier. Les colliers sans clôture configurée en sont exclus.
:::

## Actions quotidiennes recommandées

- **Offline >24h** — examinez toute valeur non nulle : soit un problème de
  couverture cellulaire, soit une batterie vide.
- **Outside fence** — localisez l'animal, puis choisissez entre ajuster la limite
  et aller vérifier sur place.
- **Colonne Battery** — récupérez pour recharge tout collier en orange ou en rouge
  à la prochaine occasion.
- **Stimulations vs alarms** — les animaux en haut du graphique sont ceux qui
  sollicitent le plus la limite.
- **Field fully grazed** — si la bannière est présente, planifiez une rotation de
  parcelle.
