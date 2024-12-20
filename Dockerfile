# Use an official Node.js runtime as a parent image
FROM node:lts-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy only package files to take advantage of Docker's layer caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the application port
EXPOSE 3001

# Set the user for security
USER node

# Default command to run the application
CMD ["npm", "start"]
