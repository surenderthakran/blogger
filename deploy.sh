#!/bin/bash

BUILD_NUMBER=$1

echo "Deploying build $BUILD_NUMBER ..."

echo "Building blogger docker image....."
docker build -t blogger_image_${BUILD_NUMBER} .

echo "Stopping previously running blogger containers..."
docker stop $(docker ps -a | grep blogger_container | awk '{print $1}')

echo "Running blogger container..."
docker run -it -d --name blogger_container_${BUILD_NUMBER} -p 80:18660 blogger_image_${BUILD_NUMBER}

echo "Removing previously stopped blogger containers..."
docker rm $(docker ps -f "status=exited" | grep blogger_container | awk '{print $1}')

#TODO: Fix docker daemon error on removing referenced images and causing unstable builds in Jenkins
echo "Removing old blogger docker images..."
docker rmi $(docker images | grep blogger_image | awk '{print $1}')
