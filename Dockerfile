# Stage 1: Build Frontend Assets
FROM node:20-alpine AS frontend-builder
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ ./
COPY backend/public /app/backend/public
RUN npm run build

# Stage 2: Production PHP/Laravel App
FROM php:8.2-cli-alpine

# Install system dependencies & PHP extensions
RUN apk add --no-cache \
    git \
    curl \
    libpng-dev \
    oniguruma-dev \
    libxml2-dev \
    zip \
    unzip \
    sqlite-dev \
    sqlite

RUN docker-php-ext-install pdo pdo_sqlite mbstring bcmath gd xml

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html/backend

# Copy backend files
COPY backend/ ./
COPY --from=frontend-builder /app/backend/public/build ./public/build

# Install PHP dependencies
RUN composer install --no-dev --optimize-autoloader

# Storage permissions and database setup
RUN mkdir -p storage/framework/views storage/framework/sessions storage/framework/cache database \
    && touch database/database.sqlite \
    && chmod -R 777 storage database /var/www/html

# Copy entrypoint script and ensure unix line endings
COPY docker-entrypoint.sh /var/www/html/backend/docker-entrypoint.sh
RUN sed -i 's/\r$//' /var/www/html/backend/docker-entrypoint.sh \
    && chmod +x /var/www/html/backend/docker-entrypoint.sh

EXPOSE 7860 8000 10000

ENTRYPOINT ["/var/www/html/backend/docker-entrypoint.sh"]
