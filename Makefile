DOCKER_COMPOSE := docker-compose
DOCKER_COMPOSE_YML := --file docker-compose.yml
ifneq ("$(wildcard docker-compose.local.yml)","")
DOCKER_COMPOSE_YML += --file docker-compose.local.yml
endif

QUICKSTART := go

.PHONY: up
up:
	$(DOCKER_COMPOSE) \
		$(DOCKER_COMPOSE_YML) \
		$@ --remove-orphans \
		$(QUICKSTART)

.PHONY: down
down:
	$(DOCKER_COMPOSE) down

.PHONY: logs
logs:
	$(DOCKER_COMPOSE) \
		$@ --follow \
		$(QUICKSTART)

.PHONY: stop build
stop build:
	$(DOCKER_COMPOSE) \
		$(DOCKER_COMPOSE_YML) \
		$@ \
		$(QUICKSTART)

.PHONY: build front
build front:
	yarn serve


.PHONY: run server
run server:
	yarn run:server
