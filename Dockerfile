FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install ALL dependencies (including devDependencies) for build
RUN npm install

# Copy application files
COPY . .

# Build the React application
RUN npm run build

# Clean up dev dependencies
RUN npm ci --only=production

# Expose the port
EXPOSE 3000

# Start the server
CMD ["npm", "start"]