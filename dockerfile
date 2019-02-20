FROM nginx:alpine

COPY ./nginx.conf /etc/nginx/nginx.conf
COPY ./nginx.vh.default.conf /etc/nginx/conf.d/default.conf

WORKDIR /opt/app/www

COPY ./www/ /opt/app/www/

RUN ls -la /opt/app
RUN ls -la /opt/app/www

EXPOSE 80
USER root
