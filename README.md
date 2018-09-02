## Blogger
[http://surenderthakran.com](http://surenderthakran.com)

[![Build Status](https://travis-ci.com/surenderthakran/blogger.svg?branch=master)](https://travis-ci.com/surenderthakran/blogger)

### Salient Features:
- Runs on `nodejs v8` and `npm v5`.
- Node.js runs with [Express.js](https://expressjs.com/) framework.
- Uses [prism](https://github.com/PrismJS/prism) for syntax-highlighting.
- Application code and dependencies run inside [Docker](https://www.docker.com/) containers making the dev and production environment COMPLETELY independent of host machine.
- Every push to the master branch is built and tested using [Travis-CI](https://travis-ci.com/surenderthakran/blogger).
- In Development Environment:
    - Provides simple development environment setup with [Docker Compose](https://docs.docker.com/compose/).
    - Generates html pages from templates using [mustache](https://mustache.github.io/) templating engine on every code change in templates.
    - Auto generates sitemap.xml once on server start.
    - Uses [Gulp](http://gulpjs.com/) to compile [LessCss](http://lesscss.org/) to Css and for CSS minification.
      - Uses [less-plugin-autoprefix](https://www.npmjs.com/package/less-plugin-autoprefix) to automatically add vendor prefixes during Less to CSS compilation.
    - Uses [Webpack](https://webpack.js.org/) to bundle frontend javascript files on code change.
    - Runs [EsLint](https://eslint.org/) checks on every code change using Gulp.

### How To Use:
#### To run in production environment:
```
docker build --no-cache=true -t blogger .

docker run --rm -it -d \
-p 18660:18660 \
--name blogger_container \
--env NODE_ENV=production \
blogger
```
#### To set up development environment:
##### With Docker Compose:
```
docker-compose build
docker-compose up
```

##### Without Docker Compose:
```
docker build --no-cache=true -t blogger .

docker run --rm -it -d \
-v $(pwd)/:/blogger/ \
-v /blogger/node_modules/ \
-p 18660:18660 \
--name blogger_container \
--env NODE_ENV=development \
blogger
```

### Third Party
#### Prism
[Prism](https://github.com/PrismJS/prism) is used for syntax-highlighting and other code utilities.
Prism's default theme is inherited and apart from prism's core language package, syntax-highlighting is supported for:
- Bash
- [Docker](https://www.docker.com/)
- Git
- [Go](https://golang.org/)
- HTTP
- JSON
- Makefile
- Markdown
- [Nginx](https://www.nginx.com/)
- Python
- SQL
- Vim
- YAML
