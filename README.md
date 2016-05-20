##Blogger

####To create blogger application image:

docker build -t blogger_app .

####To start blogger server in docker container:

docker run -it -d --name blogger_app_1 --net=host blogger_app

###OR

####Use docker-compose:

docker-compose build
docker-compose up
