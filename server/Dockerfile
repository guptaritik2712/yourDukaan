# Build stage
FROM node:18-alpine AS build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build TypeScript
RUN npm run build

# Production stage
FROM node:18-alpine

# Install PostgreSQL client for pg_isready
RUN apk add --no-cache postgresql-client

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY tsconfig.json ./

# Install dependencies (need dev dependencies for seed script)
RUN npm ci

# Copy built files from build stage
COPY --from=build /app/dist ./dist

# Copy source files for seed script
COPY --from=build /app/src ./src

# Copy entrypoint script
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Expose port
EXPOSE 3000

# Use entrypoint script
ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["node", "dist/app.js"]
