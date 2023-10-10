# Use the official Node.js image as the base image
FROM node:latest

# Set the working directory inside the container
WORKDIR /app

# Copy your application files to the container
COPY . .

# Install application dependencies
RUN npm install

# Expose the port your application will run on (e.g., 3000)
EXPOSE 3000

# Command to build the app
RUN echo "Building the application..."

# Run the build command
RUN npm run build

# Display a message indicating the build is complete
RUN echo "Build complete."

# Command to start your application
CMD ["npm", "run","dev"]
