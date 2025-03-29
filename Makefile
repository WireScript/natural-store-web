# Define directories
BACKEND_DIR=backend
FRONTEND_DIR=frontend


# Start frontend
start-frontend:
	cd $(FRONTEND_DIR) && npm run dev

# Install frontend dependencies
install-frontend:
	cd $(FRONTEND_DIR) && npm install

# Build frontend for production
build-frontend:
	cd $(FRONTEND_DIR) && npm run build



# Build backend Docker image
build-only-backend:
	cd $(BACKEND_DIR) && docker compose build

# Build backend Docker image
build-backend:
	cd $(BACKEND_DIR) && docker compose up --build

# Start backend (detached mode)
start-backend:
	cd $(BACKEND_DIR) && docker compose up -d

# Start backend with logs
run-backend:
	cd $(BACKEND_DIR) && docker compose up

# Stop backend
stop-backend:
	cd $(BACKEND_DIR) && docker compose down

# Restart backend
restart-backend:
	cd $(BACKEND_DIR) && docker compose down && docker compose up -d

# View backend logs
logs-backend:
	cd $(BACKEND_DIR) && docker compose logs -f

# Rebuild and restart backend
rebuild-backend:
	cd $(BACKEND_DIR) && docker compose down && docker compose build && docker compose up -d

# Stop all services (frontend & backend)
stop-all: stop-backend

# Restart all services (frontend & backend)
restart-all: stop-backend start-backend start-frontend
