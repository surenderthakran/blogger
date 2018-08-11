#!/bin/bash

BUILD_NUMBER=$1
BLOGGER_IMAGE_NAME=blogger_image_${BUILD_NUMBER}
BLOGGER_CONTAINER_NAME=blogger_container_${BUILD_NUMBER}

echo "================================================="
echo "Deploying blogger build $BUILD_NUMBER ..."
echo "================================================="

echo "================================================="
echo "Building blogger docker image....."
echo "================================================="
docker build --no-cache=true -t ${BLOGGER_IMAGE_NAME} .
echo "================================================="
echo $?
echo "================================================="

echo "================================================="
echo "Stopping previously running blogger containers..."
echo "================================================="
docker stop $(docker ps -a | grep blogger_container | awk '{print $1}')
echo "================================================="
echo $?
echo "================================================="

echo "================================================="
echo "Running blogger container..."
echo "================================================="
docker run -it -d --name ${BLOGGER_CONTAINER_NAME} -p 18660:18660 ${BLOGGER_IMAGE_NAME}
echo "================================================="
echo $?
echo "================================================="

echo "================================================="
echo "Removing previously stopped blogger containers..."
echo "================================================="
docker rm $(docker ps -f "status=exited" | grep blogger_container | awk '{print $1}')
echo "================================================="
echo $?
echo "================================================="

echo "================================================="
echo "Removing old blogger docker images..."
echo "================================================="
docker rmi $(docker images | grep blogger_image | grep -v ${BLOGGER_IMAGE_NAME} | awk '{print $1}')
echo "================================================="
echo $?
echo "================================================="
