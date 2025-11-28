FROM php:8.3-fpm

# 必要なパッケージをインストール（Laravel向けに拡張）
RUN apt-get update && apt-get install -y \
    git curl unzip zip \
    libzip-dev zlib1g-dev \
    libonig-dev libxml2-dev \
    libpng-dev libjpeg-dev libfreetype6-dev \
    default-mysql-client \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install pdo_mysql zip mbstring bcmath gd

# Composerのインストール（公式推奨の方法）
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# php.ini を配置（任意）
COPY php.ini /usr/local/etc/php/

# 作業ディレクトリの設定
WORKDIR /var/www

// Node.js 20 を追加 React v18はnode.js20.x要求
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt install -y nodejs