# -------------------
# scripts/init-dev.sh
# -------------------
#!/bin/bash

echo "🚀 Initializing ClarityChain Development Environment"
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "📝 Creating .env file from template..."
    cp .env.example .env
    echo "⚠️  Please edit .env file with your API keys and configuration"
    echo ""
fi

# Build containers
echo "🏗️  Building Docker containers..."
docker-compose build

echo ""
echo "⬆️  Starting services..."
docker-compose up -d

echo ""
echo "⏳ Waiting for database to be ready..."
sleep 10

echo ""
echo "🔄 Running database migrations..."
docker-compose exec backend python manage.py migrate

echo ""
echo "📦 Collecting static files..."
docker-compose exec backend python manage.py collectstatic --noinput

echo ""
echo "✅ Development environment is ready!"
echo ""
echo "Services:"
echo "  - Frontend: http://localhost:80"
echo "  - Backend API: http://localhost:80/api"
echo "  - Django Admin: http://localhost:80/admin"
echo "  - Agent API: http://localhost:8001"
echo ""
echo "Next steps:"
echo "  1. Create a superuser: make createsuperuser"
echo "  2. View logs: make logs"
echo "  3. Stop services: make down"
echo ""