#!/bin/sh

# Wait for PostgreSQL to be ready
echo "⏳ Waiting for PostgreSQL to be ready..."

until pg_isready -h postgres-service -p 5432 -U yourdukaan; do
  echo "⏳ PostgreSQL is unavailable - sleeping"
  sleep 2
done

echo "✅ PostgreSQL is up and running!"

# Run database migrations if needed
# npm run migrate

# Seed the database
echo "🌱 Seeding database..."
npm run seed

# Start the server
echo "🚀 Starting server..."
exec "$@"
