'use strict';

const tags = {
  'ajax': {
    name: 'Ajax',
  },
  'aws': {
    name: 'AWS',
  },
  'docker': {
    name: 'Docker',
  },
  'docker_compose': {
    name: 'Docker Compose',
  },
  'go': {
    name: 'Go',
  },
  'javascript': {
    name: 'Javascript',
  },
  'makefile': {
    name: 'Makefile',
  },
  'math': {
    name: 'Math',
  },
  'neural_network': {
    name: 'Neural Network',
  },
  'nodejs': {
    name: 'Node.js',
  },
  'ssh': {
    name: 'SSH',
  },
  's3': {
    name: 'S3',
  },
  'testing': {
    name: 'Testing',
  },
  'upstart': {
    name: 'Upstart',
  },
};

module.exports = {
  getTagByKey: (tagKey) => {
    return tags[tagKey];
  },
};
