# Use official Node.js LTS image
FROM node:20

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first (for caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project
COPY . .

# Expose the dev server port (adjust if different)
EXPOSE 5173

# Run the development server
CMD ["npm", "run", "dev"]
