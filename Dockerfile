# Use the official Node.js image as the base image
FROM node:22

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json and install dependencies
COPY package*.json ./
RUN npm install -g npm@latest
RUN npm install --legacy-peer-deps

# Copy the rest of the application code
COPY . .

# Build the backend application
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]
