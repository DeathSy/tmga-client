FROM node:9.11.1-alpine as Builder

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . .

ENV PATH /usr/src/app/node_modules/.bin:$PATH
ENV REACT_APP_API_ENDPOINT=http://api.tmga.cf/api
ENV REACT_APP_AUTH_CLIENT=http://api.tmga.cf/api/Accounts/login

ADD package.json /usr/src/app/package.json
RUN npm install
RUN npm i -g react-scripts@1.1.1
RUN npm run build

FROM nginx:1.13.3-alpine

RUN rm -rf /usr/share/nginx/html/*

COPY nginx/default.conf /etc/nginx/conf.default
COPY --from=Builder /usr/src/app/build /usr/share/nginx/html

CMD [ "nginx", "-g", "daemon off;" ]
