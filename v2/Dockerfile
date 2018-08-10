# Dockerfile for surenderthakran/blogger

FROM node:8.11-alpine

LABEL version="2.0"

ENV group blogger_group
ENV user blogger_user

MAINTAINER https://github.com/surenderthakran

# Add required packages.
RUN apk add --no-cache \
    bash \
    make

# Add non-root group and user.
RUN addgroup -S ${group} && adduser -S -G ${group} ${user}

USER ${user}

COPY . /home/${user}/blogger

WORKDIR /home/${user}/blogger

RUN make install

CMD make run
