'use strict';

const tagStore = require(__root + '/datastore/tagstore');

const articlesStore = [
  {
    articleId: 'introducing-gomind',
    url: 'articles/tech/introducing-gomind',
    head: {
      title: 'Introducing GoMind - A Simplistic Neural Network Library in Go ' +
          '| Surender Thakran',
      description: 'Introducing GoMind. A Neural Network Library in Go',
      keywords: 'go,golang,neural-network,back-propagation,deep-learning',
    },
    article: {
      title: 'Introducing GoMind: A Simplistic Neural Network Library in Go',
      readTime: 3,
      datetime: '2018-07-29',
      date: '29th July 2018',
      tags: ['neural_network', 'go'],
    },
  },
  {
    articleId: 'implement-back-propagation-neural-network',
    url: 'articles/tech/implement-back-propagation-neural-network',
    head: {
      title: 'Implementing Back Propagation Algorithm In A Neural Network | ' +
          'Surender Thakran',
      description: 'Implementing Back Propagation Algorithm In A Neural ' +
          'Network',
      keywords: ['neural-network', 'back-propagation', 'deep-learning', 'math',
                 'mathematics', 'sigmoid', 'differentiation', 'go', 'golang']
                 .join(','),
    },
    article: {
      title: 'Implementing Back Propagation Algorithm In A Neural Network',
      readTime: 20,
      datetime: '2017-12-26',
      date: '26th December 2017',
      tags: ['neural_network', 'math'],
    },
  },
  {
    articleId: 'dockerized-development-and-production-environment-golang',
    url: 'articles/tech/' +
        'dockerized-development-and-production-environment-golang',
    head: {
      title: 'Dockerized Development and Production Environment For Go ' +
          '(GoLang) | Surender Thakran',
      description: 'Dockerized Development and Production Environment For Go ' +
          '(GoLang)',
      keywords: 'docker,go,golang,dockercompose,docker-compose,compose,testing',
    },
    article: {
      title: 'Dockerized Development and Production Environment For Go ' +
          '(GoLang)',
      readTime: 6,
      datetime: '2017-05-30',
      date: '30th May 2017',
      updateDatetime: '2018-08-10',
      updateDate: '10th Aug 2018',
      tags: ['docker', 'go', 'testing', 'makefile', 'docker_compose'],
    },
  },
  {
    articleId: 'enable-docker-remote-api-connect-ssh-tunnel',
    url: 'articles/tech/enable-docker-remote-api-connect-ssh-tunnel',
    head: {
      title: 'Enable Docker Remote API on Remote Docker Host and Connect ' +
          'Using SSH Tunnel On Ubuntu 14.04 | Surender Thakran',
      description: 'Enable Docker Remote API on Remote Docker Host and ' +
          'Connect Using SSH Tunnel On Ubuntu 14.04',
      keywords: 'docker,ssh,ubuntu,14.04,trusty',
    },
    article: {
      title: 'Enable Docker Remote API on Remote Docker Host and Connect ' +
          'Using SSH Tunnel On Ubuntu 14.04',
      readTime: 3,
      datetime: '2016-06-02',
      date: '2nd June 2016',
      tags: ['docker', 'ssh', 'upstart'],
    },
  },
  {
    articleId: 's3-browser-upload-with-nodejs',
    url: 'articles/tech/s3-browser-upload-with-nodejs',
    head: {
      title: 'AWS S3 Direct Upload from Browser with Node.js as Backend | ' +
          'Surender Thakran',
      description: 'Amazon Web Services (AWS) S3 Direct Upload from Browser ' +
          'with Node.js as Backend with example',
      keywords: ['aws', 's3', 'nodejs', 'node.js', 'express.js', 'expressjs',
                 'ajax', 'xhr', 'javascript', 'crypto', 'html', 'form',
                 'formdata'].join(','),
    },
    article: {
      title: 'AWS S3 Direct Upload from Browser with Node.js as Backend',
      readTime: 9,
      datetime: '2016-05-28',
      date: '28th May 2016',
      tags: ['aws', 's3', 'nodejs', 'javascript', 'ajax'],
    },
  },
];

module.exports = {
  list: () => {
    const articles = JSON.parse(JSON.stringify(articlesStore));

    articles.forEach((article) => {
      const tagKeys = article.article.tags;
      const tagObjects = [];

      tagKeys.forEach((tagKey) => {
        const tagObject = tagStore.getTagByKey(tagKey);
        if (tagObject !== undefined) {
          tagObjects.push(tagObject);
        }
      });

      article.article.tags = tagObjects;
    });

    return articles;
  },
};
