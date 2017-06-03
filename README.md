## Blogger
[http://surenderthakran.com](http://surenderthakran.com)

### Salient Features:
- Runs on `nodejs v6` and `npm v3`
- Node.js runs with [hapi](https://github.com/hapijs/hapi) framework
- Makes use of [mustache](https://mustache.github.io/) templating engine on nodejs with [vision](https://github.com/hapijs/vision)
- Uses [prism](https://github.com/PrismJS/prism) for syntax-highlighting and other code utilities.
- Architecture and dependencies are encapsulated in [docker](https://www.docker.com/) images hence making the dev and production environment COMPLETELY independent of host machine.
- In Development Environment:
    - Provides simple development environment setup with docker-compose.
    - scss to css auto compilation and CSS minification using [gulp](http://gulpjs.com/) task runner.
- In Production Environment:
    - Continuous Deployment is achieved via [Jenkins](https://jenkins.io/) on every push to `production` branch

### How To Use:
#### To build docker image for the application:
```
docker build -t blogger_app .
```

#### To run docker container:
```
docker run -it -d --name blogger_app_1 --net=host blogger_app
```
With `--net=host` the container will listen for requests on port `18660`.

To listen on a different port (ex: `80`) run:
```
docker run -it -d --name blogger_app_1 -p 80:18660 blogger_app
```

#### To set up development environment:
```
docker-compose build
docker-compose up
```
Above commands will run the blogger docker container with the `blogger/app/` folder volume mounted.

It will also start a `gulp` watch task to:
- Create a single minified `js` file from all `.js` files on change.
- Create a single minified `css` file from `.scss` files on change.
- Test and report jshint issues on change.

### Third Party
#### Prism
[Prism](https://github.com/PrismJS/prism) is used for syntax-highlighting and other code utilities.
Prism's default theme is inherited and apart from prism's code language package, syntax-highlighting is supported for:
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
