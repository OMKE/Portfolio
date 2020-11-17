FROM php:7.4-fpm
RUN apt-get update && apt-get install -y supervisor && docker-php-ext-install -j$(nproc) pdo pdo_mysql

RUN mkdir -p /var/log/supervisor

COPY ./supervisord.conf /etc/supervisor/conf.d/supervisord.conf

CMD ["/usr/bin/supervisord"]