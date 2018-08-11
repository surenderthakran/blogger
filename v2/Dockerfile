# Dockerfile for surenderthakran/blogger
# TODO(surenderthakran): Run application through a non-root user.

FROM node:8.11-alpine

LABEL version="2.0"

MAINTAINER https://github.com/surenderthakran

# Add required packages.
RUN apk add --no-cache \
    bash \
    make

COPY . /blogger

WORKDIR /blogger

RUN make install

CMD make run
