'use strict';

const articleStore = require(__root + '/datastore/articlestore');
const projectStore = require(__root + '/datastore/projectstore');

module.exports = {
  partials: {},
  pages: [
    {
      src: 'index.html',
      target: 'index.html',
      viewData: {
        head: {
          title: 'Home | Surender Thakran',
          description: 'Surender Thakran\'s technical articles about web ' +
              'development, server management and enterprise architecture',
          keywords: 'web,css3,html5',
        },
        articles: articleStore.list(),
      },
    },
    {
      src: 'projects.html',
      target: 'projects.html',
      viewData: {
        head: {
          title: 'Projects | Surender Thakran',
          description: 'Surender Thakran\'s open source projects',
          keywords: 'web,css3,html5',
        },
        projects: projectStore,
      },
    },
    {
      src: 'about.html',
      target: 'about.html',
      viewData: {
        head: {
          title: 'About | Surender Thakran',
          description: 'Page describing Surender Thakran, his career path and' +
              ' future goals.',
          keywords: ['web architect', 'enterprise architect', 'startup',
                     'devops', 'backend developer', 'frontend developer',
                     'google', 'technology', 'karate'].join(','),
        },
      },
    },
    {
      src: '404.html',
      target: '404.html',
      viewData: {
        head: {
          title: 'Page Not Found | Surender Thakran',
          description: 'The requested page does not exists',
          keywords: '404',
        },
      },
    },
  ],
};
