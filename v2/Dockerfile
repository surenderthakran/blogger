# Dockerfile for surenderthakran/blogger

FROM node:8.11-alpine

LABEL version="2.0"

MAINTAINER https://github.com/surenderthakran

# Add required packages.
RUN apk add --no-cache \
    bash \
    make

COPY . /home/node

WORKDIR /home/node

USER node

RUN make install

CMD make run
