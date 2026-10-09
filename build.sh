#!/usr/bin/env bash
# exit on error
set -e

echo "=== 1. Building Frontend Assets ==="
cd frontend
npm ci || npm install
npm run build
cd ..

echo "=== 2. Setting up Backend Dependencies ==="
cd backend
composer install --no-dev --optimize-autoloader

echo "=== 3. Database & Optimization ==="
mkdir -p database storage/framework/views storage/framework/sessions storage/framework/cache
touch database/database.sqlite

php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan migrate --force --seed

echo "=== Build Complete! ==="
