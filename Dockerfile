FROM node:24-trixie

VOLUME /repo
COPY run.sh /
EXPOSE 3000
WORKDIR /repo
CMD /run.sh
