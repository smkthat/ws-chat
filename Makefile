.PHONY: start install

all: install start

install:
	@echo "Installing dependencies..."
	@pnpm i

start:
	@echo "Starting server and dev..."
	@pnpm run ws & pnpm run dev
