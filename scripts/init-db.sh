docker kill my-db || true
docker rm my-db || true

docker run -d \
  -p 5432:5432 \
	--name my-db \
	-e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=dbo \
	postgres

yarn migration-run