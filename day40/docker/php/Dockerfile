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

# 権限調整（Laravelのstorageなどで必要）
RUN chown -R www-data:www-data /var/www

# # 起動時のユーザーIDに合わせて www-data ユーザーの情報を修正
# ARG PUID=1000
# ARG PGID=1000
# RUN usermod -u ${PUID} www-data && groupmod -g ${PGID} www-data