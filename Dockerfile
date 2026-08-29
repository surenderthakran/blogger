# Dockerfile for surenderthakran/blogger

FROM node:8.11-alpine

LABEL version="2.0"
LABEL maintainer="https://github.com/surenderthakran"

# Add required packages.
RUN apk add --no-cache \
    bash \
    make

COPY . /blogger

WORKDIR /blogger

RUN npm install

CMD ["make", "run"]
