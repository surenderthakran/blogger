'use strict';

const ProjectStore = require('../../../projectstore');

module.exports = function (request, reply) {
  reply.view('projects', {
    head: {
      title: 'Projects | Surender Thakran',
      description: 'Surender Thakran\'s technical articles about web development, server management and enterprise architecture',
      keywords: 'web,css3,html5',
    },
    projects: ProjectStore,
  });
};
