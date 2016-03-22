# Dockerfile for surenderthakran/blogger

FROM surenderthakran/nodejs:v5

MAINTAINER https://github.com/surenderthakran

ADD app/ /blogger/app

WORKDIR /blogger

RUN make -f app/Makefile install

CMD make -f app/Makefile run
