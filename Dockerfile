# Stage 1: Build the application
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files first to leverage Docker cache
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --frozen-lockfile

# Copy only necessary files for frontend (excluding microservices folder)
COPY next.config.mjs .
COPY public ./public
COPY src ./src
COPY .env.local .
COPY jsconfig.json .

# Build the application
RUN npm run build

# Stage 2: Production image
FROM node:18-alpine AS runner

WORKDIR /app

# Copy built assets from builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public

# Environment variables (can be overridden in docker-compose)
ENV NODE_ENV=production
ENV PORT=3000

# Expose the port the app runs on
EXPOSE $PORT

# Command to run the application
CMD ["npm","run", "start"]