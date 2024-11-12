# Build and start the containers
docker-compose up --build

# To stop the containers
docker-compose down

# To view logs
docker-compose logs -f

# To access the database using psql
docker exec -it my_postgres_db psql -U postgres -d myapp