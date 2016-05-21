##Blogger


###How To Use:
####To build docker image for the application:
```
docker build -t blogger_app .
```

####To run docker container:
```
docker run -it -d --name blogger_app_1 --net=host blogger_app
```
The container will listen for requests on port `18660`.

To listen on a different port (ex: `80`) run:
```
docker run -it -d --name blogger_app_1 -p 80:18660 blogger_app
```

####To set up development environment:
```
docker-compose build
docker-compose up
```
Above commands will run the blogger docker container with the `blogger/app/` folder volume mounted.

It will also start a `gulp` watch task to compile `.scss` files into `.css` on change.
