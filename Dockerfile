FROM nginx:1.23.3

COPY ../nginx/conf/*.conf.template /etc/nginx/templates/
COPY ./nginx/conf/nginx.conf /etc/nginx/
COPY ./nginx/certs /etc/nginx/certs
COPY ./dist /usr/local/src/lec-chatfront

EXPOSE 80/tcp
EXPOSE 443

CMD ["nginx-debug", "-g", "daemon off;"]
