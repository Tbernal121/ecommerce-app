# Uses the Node.js base image with Alpine for a smaller image size
FROM node:20-alpine

# Sets the working directory to /app
WORKDIR /app

# Copies the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Installs the project dependencies
RUN npm install

# Copies the rest of the application files to the working directory
COPY . .

# Builds the application
RUN npm run build

# Exposes port 8080 to make the application accessible
EXPOSE 8080

# Defines the default command to run the application
CMD ["npm", "start"]
