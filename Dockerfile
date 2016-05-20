# Dockerfile for surenderthakran/blogger

FROM surenderthakran/nodejs:v5

MAINTAINER https://github.com/surenderthakran

ADD . /blogger

WORKDIR /blogger

RUN make install

CMD make run
