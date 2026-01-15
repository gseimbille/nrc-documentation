// @ts-check

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.

 @type {import('@docusaurus/plugin-content-docs').SidebarsConfig}
 */
const sidebars = {
  tutorialSidebar: [
    {
      type: 'category',
      label: 'Intro',
      items: [
        'clovir/intro',
      ],
    },
    {
      type: 'category',
      label: 'Datacake Platform',
      items: [
        'clovir/features',
        'clovir/crossing-logic',
      ],
    },
    {
      type: 'category',
      label: 'User Management',
      items: ['clovir/user-management'],
    },
    {
      type: 'category',
      label: 'Perimeter Management',
      items: [
        'clovir/perimeters',
        'clovir/geojson',
      ],
    },
    {
      type: 'category',
      label: 'Device Management',
      items: [
        'clovir/collar-dashboard',
        'clovir/share-dashboard',
        'clovir/mobile-app',
        'clovir/collar-hardware',
        'clovir/activation',
        'clovir/operational-process',
      ],
    },
  ],
};

export default sidebars;
