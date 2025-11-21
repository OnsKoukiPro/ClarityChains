# -------------------
# scripts/health-check.sh
# -------------------
#!/bin/bash

echo "🏥 ClarityChain Health Check"
echo ""

services=("nginx:80" "backend:8000" "agent:8001" "db:5432" "redis:6379")
all_healthy=true

for service in "${services[@]}"; do
    IFS=':' read -r name port <<< "$service"

    echo -n "Checking $name... "

    if [ "$name" = "db" ]; then
        if docker-compose exec db pg_isready -U claritychain_user > /dev/null 2>&1; then
            echo "✅ Healthy"
        else
            echo "❌ Not responding"
            all_healthy=false
        fi
    elif [ "$name" = "redis" ]; then
        if docker-compose exec redis redis-cli ping > /dev/null 2>&1; then
            echo "✅ Healthy"
        else
            echo "❌ Not responding"
            all_healthy=false
        fi
    else
        if curl -f http://localhost:$port/health > /dev/null 2>&1; then
            echo "✅ Healthy"
        else
            echo "❌ Not responding"
            all_healthy=false
        fi
    fi
done

echo ""
if [ "$all_healthy" = true ]; then
    echo "✅ All services are healthy!"
    exit 0
else
    echo "❌ Some services are not healthy. Check logs with: make logs"
    exit 1
fi
