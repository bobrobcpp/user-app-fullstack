# Dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application files
COPY . .

# Generate Drizzle migrations
RUN npm run generate

# Run migrations
RUN npm run migrate

# Start the application
CMD ["npm", "run", "dev"]