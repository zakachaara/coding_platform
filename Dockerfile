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
COPY .env .
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
ENV NEXT_PUBLIC_SUBMIT_CTF_LINK=http://capture-the-flag-service:5007
ENV NEXT_PUBLIC_AUTHENTICATION_URL=http://auth-service-postgres:8080
ENV NEXT_PUBLIC_CE_SERVICE=http://code-enhancement-service:5006
ENV NEXT_PUBLIC_CP_SERVICE=http://competitive-programming-service:5005
# Expose the port the app runs on
EXPOSE $PORT

# Command to run the application
CMD ["npm","run", "start"]