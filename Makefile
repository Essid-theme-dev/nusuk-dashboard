.PHONY: install dev build start lint clean help db-up db-down db-migrate db-seed db-studio setup

NODE ?= $(shell command -v node 2>/dev/null || echo node)
NPM  ?= npm

install:
	$(NPM) install

dev:
	$(NPM) run dev

build:
	$(NPM) run build

start:
	$(NPM) run start

lint:
	$(NPM) run lint

clean:
	rm -rf .next node_modules

# PostgreSQL (Docker)
db-up:
	docker compose up -d postgres

db-down:
	docker compose down

db-migrate:
	$(NPM) run db:push

db-seed:
	$(NPM) run db:seed

db-studio:
	$(NPM) run db:studio

# Full first-time setup
setup: install db-up
	@echo "Waiting for PostgreSQL..."
	@sleep 3
	@test -f .env || cp .env.example .env
	$(NPM) run db:push
	$(NPM) run db:seed
	@echo ""
	@echo "Setup complete! Run 'make dev' to start."

help:
	@echo "Nusuk — Travel Agency Platform (PostgreSQL)"
	@echo ""
	@echo "  make setup       First-time setup (install + DB + seed)"
	@echo "  make install     Install dependencies"
	@echo "  make dev         Start development server (http://localhost:3000)"
	@echo "  make build       Build for production"
	@echo "  make start       Start production server"
	@echo "  make db-up       Start PostgreSQL (Docker)"
	@echo "  make db-down     Stop PostgreSQL"
	@echo "  make db-migrate  Push schema to database"
	@echo "  make db-seed     Seed sample data"
	@echo "  make db-studio   Open Prisma Studio"
	@echo "  make lint        Run ESLint"
	@echo "  make clean       Remove .next and node_modules"
