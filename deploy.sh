#!/bin/bash

BUILD_NUMBER=$1

echo "Deploying build $BUILD_NUMBER ..."
docker build -t blogger_image_${BUILD_NUMBER} .
docker stop $(docker ps -a | grep blogger | awk '{print $1}')
docker run -it -d --name blogger_container_${BUILD_NUMBER} -p 80:18660 blogger_image_${BUILD_NUMBER}
docker rm $(docker ps -a | grep blogger | awk '{print $1}')
docker rmi $(docker images | grep blogger | awk '{print $1}')
