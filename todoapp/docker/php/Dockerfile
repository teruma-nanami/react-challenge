FROM php:8.3-fpm

COPY php.ini /usr/local/etc/php/

RUN apt update && apt install -y \
    default-mysql-client \
    zlib1g-dev libzip-dev unzip \
    curl \
    gnupg \
    && docker-php-ext-install pdo_mysql zip

# Node.js 20 を追加（フロントエンド環境をDockerで統一するため）
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt install -y nodejs

# Composer インストール
RUN curl -sS https://getcomposer.org/installer | php \
    && mv composer.phar /usr/local/bin/composer \
    && composer self-update

WORKDIR /var/www