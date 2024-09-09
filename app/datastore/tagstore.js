'use strict';

const tags = {
  'ajax': {
    name: 'Ajax',
  },
  'aws': {
    name: 'AWS',
  },
  'bloomfilter': {
    name: 'Bloom Filter',
  },
  'cron': {
    name: 'Cron',
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
  'logrotate': {
    name: 'Logrotate',
  },
  'lsmtree': {
    name: 'LSM Tree',
  },
  'makefile': {
    name: 'Makefile',
  },
  'math': {
    name: 'Math',
  },
  'mongodb': {
    name: 'Mongo DB',
  },
  'neural_network': {
    name: 'Neural Network',
  },
  'nodejs': {
    name: 'Node.js',
  },
  'nosql': {
    name: 'NoSQL',
  },
  'shellscript': {
    name: 'Shell Script',
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
  'wal': {
    name: 'Write-Ahead Log (WAL)',
  },
};

module.exports = {
  getTagByKey: (tagKey) => {
    return tags[tagKey];
  },
};
