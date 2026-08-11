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
    'clovir/intro',
    'clovir/datacake',
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
      ],
    },
    {
      type: 'category',
      label: 'Device Management',
      items: [
        'clovir/map',
        'clovir/collar-dashboard',
        'clovir/share-dashboard',
        'clovir/mobile-app',
        'clovir/activation',
        'clovir/operational-process',
      ],
    },
    {
      type: 'category',
      label: 'Partner API',
      items: [
        'api/intro',
        'api/authentication',
        'api/devices',
        'api/perimeters',
        'api/errors',
      ],
    },
  ],
};

export default sidebars;
