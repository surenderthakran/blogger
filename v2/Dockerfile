# Dockerfile for surenderthakran/blogger

FROM node:8.11-alpine

MAINTAINER https://github.com/surenderthakran

RUN apk add --no-cache \
            bash \
            make

COPY . /blogger

WORKDIR /blogger

RUN make install

CMD make run
