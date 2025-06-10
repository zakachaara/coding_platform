# Use official Node.js LTS image as base
FROM node:18-alpine

# Create and set working directory
WORKDIR /app

# Copy package files first to leverage Docker cache
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application files
COPY . .

# Set environment variables (can be overridden in docker-compose)
ENV NODE_ENV=production
ENV PORT=5007
ENV ENCRYPTION_KEY=12345678901234567890123456789012
ENV LAMBDA=0.23
ENV DB_HOST=10.0.0.30
ENV DB_PORT=5432
ENV DB_USER=postgres
ENV DB_PASSWORD=postgres
ENV DB_NAME=usermanagement
# Expose the port the app runs on
EXPOSE $PORT

# Command to run the application
CMD ["node", "app.js"]

# Health check (optional)
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
    CMD node utils/healthcheck.js || exit 1