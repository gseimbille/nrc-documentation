---
title: Gestion des périmètres
sidebar_position: 3
---

## Tableau de bord des périmètres

Dans le menu de gauche de Datacake, sélectionnez **Perimeter** pour ouvrir le
tableau de bord. Cette entrée peut porter un autre nom dans votre espace de
travail.

![Tableau de bord des périmètres](/img/clovir/perimeter-dashboard.png)

Les compteurs en haut indiquent le nombre de périmètres, le nombre total
d'animaux attendus sur l'ensemble, et le nombre de périmètres actuellement en
alerte.

Chaque périmètre est présenté sous forme de carte :

- **ACTIVE** en vert, ou **ALERT** en orange lorsque moins d'animaux sont
  présents que prévu.
- Le nombre d'animaux **présents** par rapport au nombre **attendu**, avec une
  barre de progression.
- La superficie délimitée, en mètres carrés.
- **Map** pour la visualiser, **Edit** pour la modifier, et l'icône corbeille
  pour la supprimer.

## Créer un périmètre

Cliquez sur **New Perimeter**. Le panneau se déroule en trois étapes.

![Création d'un nouveau périmètre](/img/clovir/perimeter-create.png)

### 1. Importer des parcelles (optionnel)

Déposez un fichier PAC `.xml` pour charger vos parcelles déclarées plutôt que de
les dessiner à la main. Passez cette étape si vous préférez tracer le contour
vous-même.

### 2. Dessiner le périmètre

Tracez le contour directement sur la carte à l'aide des outils en haut à droite.
La superficie délimitée s'affiche en mètres carrés au fur et à mesure, ce qui
permet de vérifier la taille pendant le tracé. Le champ de recherche permet de
retrouver rapidement un lieu ou une adresse.

### 3. Configurer

- **Datacake zone** — choisissez un tag existant, ou **+ Create new tag** pour en
  créer un. C'est ce tag qui relie un collier à ce périmètre : un collier qui le
  porte est maintenu à l'intérieur de cette limite.
- **Perimeter name** — le nom affiché sur le tableau de bord.
- **Expected animals** — sert à déclencher l'alerte lorsque moins d'animaux sont
  présents.

Cliquez sur **Save perimeter** pour terminer.

:::caution[Nombre de sommets]
Un collier mémorise 20 points de délimitation, dont l'un sert à fermer le
contour : un périmètre peut donc comporter au maximum **19 sommets**.

**Les générations de colliers les plus anciennes ne suivent que les quatre
premiers sommets.** Sur celles-ci, une forme complexe n'est pas appliquée telle
que dessinée : vérifiez la génération de votre flotte avant de tracer autre chose
qu'un quadrilatère.
:::
