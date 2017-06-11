FROM node:8.0

RUN apt-get update && apt-get install -yV \
  libkrb5-dev \
  graphicsmagick \
  build-essential \
  net-tools \
  vim \
  tree \
  openssl \
  tcpdump \
  whois \
  socat \
  iproute \
  curl \
  wget \
  dnsutils \
  Netcat

RUN curl -o- -L https://yarnpkg.com/install.sh | bash

ENV NODE_ENV production

WORKDIR /opt/app-root/

COPY package.json yarn.lock /opt/app-root/
RUN $HOME/.yarn/bin/yarn

COPY . /opt/app-root
RUN chmod -R 770 /opt/app-root \
	&& chown :0 -R /opt/app-root

RUN npm run build

EXPOSE 8080

CMD ["npm", "start"]