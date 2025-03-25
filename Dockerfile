# syntax=docker/dockerfile:1.7-labs
FROM nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --exclude=nginx.conf . /usr/share/nginx/html/
