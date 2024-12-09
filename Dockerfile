FROM oven/bun:latest

WORKDIR /usr/src/app

COPY ./package.json /usr/src/app

RUN apt update \
    && apt install -y curl

ARG NODE_VERSION=20.15.1
RUN curl -L https://raw.githubusercontent.com/tj/n/master/bin/n -o n \
    && bash n $NODE_VERSION \
    && rm n \
    && npm install -g n

RUN bun install

COPY . /usr/src/app/

CMD ["bun", "dev", "--host"]
