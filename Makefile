# Define directories
BACKEND_DIR=backend
FRONTEND_DIR=frontend

# Start backend (Docker Compose)
start-backend:
	cd $(BACKEND_DIR) && docker compose up -d

# Stop backend
stop-backend:
	cd $(BACKEND_DIR) && docker compose down

# Restart backend
restart-backend:
	cd $(BACKEND_DIR) && docker compose down && docker compose up -d

# Start frontend
start-frontend:
	cd $(FRONTEND_DIR) && npm run dev

# Install frontend dependencies
install-frontend:
	cd $(FRONTEND_DIR) && npm install

# Build frontend for production
build-frontend:
	cd $(FRONTEND_DIR) && npm run build

# Stop all services (frontend & backend)
stop-all: stop-backend

# Restart all services (frontend & backend)
restart-all: stop-backend start-backend start-frontend
