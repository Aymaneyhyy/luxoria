#!/bin/sh
set -e

echo "=========================================="
echo "  LUXORIA - Starting Cloud Server"
echo "=========================================="

# 1. Create .env from .env.example if missing
if [ ! -f .env ]; then
    echo "[1/5] Creating .env from .env.example..."
    cp .env.example .env
fi

# 2. Ensure APP_KEY exists and is valid
if [ -z "$APP_KEY" ] || [ "$APP_KEY" = "null" ]; then
    if ! grep -q "^APP_KEY=base64:" .env 2>/dev/null; then
        echo "[2/5] Generating Laravel APP_KEY..."
        php artisan key:generate --force
    fi
fi

# 3. Ensure database and directories exist with proper permissions
echo "[3/5] Setting up storage and SQLite database..."
mkdir -p database storage/framework/views storage/framework/sessions storage/framework/cache
touch database/database.sqlite
chmod -R 777 storage database

# 4. Storage symlink
php artisan storage:link || true

# 5. Database migrations and seeder
echo "[4/5] Running database migrations & seeders..."
php artisan migrate --force --seed || true

# 6. Start server
PORT_TO_USE="${PORT:-7860}"
echo "[5/5] Launching LUXORIA on port $PORT_TO_USE (4 workers)..."
echo "=========================================="

export PHP_CLI_SERVER_WORKERS=4
exec php artisan serve --host=0.0.0.0 --port="$PORT_TO_USE"
