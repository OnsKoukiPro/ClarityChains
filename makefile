# -------------------
# Makefile
# -------------------
.PHONY: help build up down restart logs clean migrate shell test

help:
	@echo "ClarityChain - Docker Management Commands"
	@echo ""
	@echo "Available commands:"
	@echo "  make build       - Build all Docker images"
	@echo "  make up          - Start all services"
	@echo "  make down        - Stop all services"
	@echo "  make restart     - Restart all services"
	@echo "  make logs        - View logs from all services"
	@echo "  make clean       - Remove all containers, volumes, and images"
	@echo "  make migrate     - Run Django migrations"
	@echo "  make shell       - Open Django shell"
	@echo "  make test        - Run tests"
	@echo "  make createsuperuser - Create Django superuser"

build:
	docker-compose build --no-cache

up:
	docker-compose up -d
	@echo "Waiting for services to be ready..."
	@sleep 10
	@echo "Services started successfully!"
	@echo "Frontend: http://localhost:80"
	@echo "Backend API: http://localhost:80/api"
	@echo "Django Admin: http://localhost:80/admin"

down:
	docker-compose down

restart:
	docker-compose restart

logs:
	docker-compose logs -f

logs-backend:
	docker-compose logs -f backend

logs-frontend:
	docker-compose logs -f frontend

logs-agent:
	docker-compose logs -f agent

clean:
	docker-compose down -v --rmi all
	@echo "All containers, volumes, and images removed"

migrate:
	docker-compose exec backend python manage.py migrate

makemigrations:
	docker-compose exec backend python manage.py makemigrations

shell:
	docker-compose exec backend python manage.py shell

createsuperuser:
	docker-compose exec backend python manage.py createsuperuser

collectstatic:
	docker-compose exec backend python manage.py collectstatic --noinput

test:
	docker-compose exec backend pytest

test-coverage:
	docker-compose exec backend pytest --cov=apps --cov-report=html

# Database backup
backup-db:
	docker-compose exec db pg_dump -U claritychain_user claritychain > backup_$(shell date +%Y%m%d_%H%M%S).sql

# Restore database
restore-db:
	@read -p "Enter backup file name: " file; \
	docker-compose exec -T db psql -U claritychain_user claritychain < $$file

# Development commands
dev-setup:
	@echo "Setting up development environment..."
	cp .env.example .env
	@echo "Please edit .env file with your configuration"
	@echo "Then run: make build && make up && make migrate && make createsuperuser"
