'use strict';

module.exports = function (request, reply) {
  reply.view('about', {
    head: {
      title: 'About | Surender Thakran',
      description: 'Page describing Surender Thakran, his career path and future goals.',
      keywords: 'web architect,enterprise architect,startup,devops,backend developer,frontend developer,technology',
    },
  });
};
