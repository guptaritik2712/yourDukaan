# Docker Setup for yourDukaan

## Prerequisites
- Docker Desktop installed and running
- Docker Compose installed

## Quick Start

### Development (without Docker):
```powershell
# Terminal 1 - Start database
docker-compose up postgres pgadmin

# Terminal 2 - Start server
cd server
npm run start:dev

# Terminal 3 - Start client
cd client
npm run dev
```

### Production (with Docker):
```powershell
# Build and start all services
docker-compose up --build

# Or run in detached mode (background)
docker-compose up -d --build

# View logs
docker-compose logs -f

# View logs for specific service
docker-compose logs -f server

# Stop all services
docker-compose down

# Stop and remove volumes (deletes database data)
docker-compose down -v
```

## Access Points

- **Frontend**: http://localhost
- **Backend API**: http://localhost:3000
- **pgAdmin**: http://localhost:5050
  - Email: admin@yourdukaan.com
  - Password: admin
- **PostgreSQL**: localhost:5432
  - User: yourdukaan
  - Password: yourdukaan123
  - Database: yourdukaan

## Individual Service Commands

```powershell
# Build specific service
docker-compose build server
docker-compose build client

# Start specific service
docker-compose up server
docker-compose up client

# Restart a service
docker-compose restart server

# Stop specific service
docker-compose stop server

# Remove specific service container
docker-compose rm server
```

## Rebuild from Scratch

```powershell
# Remove all containers, networks, and volumes
docker-compose down -v

# Remove all images
docker-compose down --rmi all

# Rebuild without cache
docker-compose build --no-cache

# Start fresh
docker-compose up --build
```

## Troubleshooting

### Port Already in Use
```powershell
# Check what's using the port
netstat -ano | findstr :3000
netstat -ano | findstr :5432

# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F
```

### Database Connection Issues
```powershell
# Check if postgres is running
docker-compose ps

# View postgres logs
docker-compose logs postgres

# Restart postgres
docker-compose restart postgres
```

### Clear Everything and Start Fresh
```powershell
# Stop all containers
docker-compose down -v

# Remove all yourDukaan related containers
docker rm -f yourdukaan-server yourdukaan-client yourdukaan-postgres yourdukaan-pgadmin

# Remove volume
docker volume rm yourdukaan_yourdukaan-data

# Start again
docker-compose up --build
```

## Production Deployment Notes

1. **Environment Variables**: Update `.env.docker` with production values
2. **JWT Secret**: Generate a new secure JWT secret
3. **Database**: Use external managed database for production
4. **SSL/TLS**: Add SSL certificates and update nginx configuration
5. **Domain**: Update `CLIENT_PROD_URL` environment variable

## Docker Image Sizes

The multi-stage builds optimize image sizes:
- Server: ~150MB (Alpine-based Node.js)
- Client: ~25MB (Alpine-based Nginx)

## Network Architecture

```
yourdukaan-network (bridge)
├── postgres:5432
├── pgadmin:80 → localhost:5050
├── server:3000 → localhost:3000
└── client:80 → localhost:80
```

All services communicate within the `yourdukaan-network` and expose specific ports to the host machine.
