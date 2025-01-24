FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application files
COPY . .

# Build the React application
RUN npm run build

# Expose the port
EXPOSE 3000

# Start the server
CMD ["npm", "start"]