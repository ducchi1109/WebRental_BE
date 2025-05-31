format:
	@npx prettier --write ./**/*.ts ./**/*.js
.PHONY: format

migrate:
	@echo "Run migration"; \
	export FLYWAY_USER=wheelie; \
	export FLYWAY_PASSWORD=wheelie; \
	export FLYWAY_URL=jdbc:postgresql://localhost:5432/wheelie?ssl=verify-full; \
	export FLYWAY_DRIVER=org.postgresql.Driver; \
	export FLYWAY_SCHEMAS=wheelie; \
	export FLYWAY_CONFIG_FILES=conf/flyway-wheelie.conf; \
	cd db/scripts; \
	./run-migration.sh
.PHONY: migrate

generate-migration-file:
	@if [ -z "$(db_name)" ] || [ -z "$(db_schema)" ] || [ -z "$(migration_name)" ]; then \
		echo "Error: db_name, db_schema, and migration_name are required"; \
		echo "Usage: make generate-migration-file db_name=<name> db_schema=<schema> migration_name=<name>"; \
		exit 1; \
	fi
	@migration_name_processed=$$(echo "$(migration_name)" | tr '[:upper:]' '[:lower:]' | tr ' ' '_'); \
	cd db/scripts && ./generate-migration-file.sh --db_name $(db_name) --db_schema $(db_schema) --migration_name "$$migration_name_processed"
.PHONY: generate-migration-file

up:
	docker compose up -d
.PHONY: up

up-verbose:
	docker compose up
.PHONY: up

down:
	docker compose down --volumes
.PHONY: down
