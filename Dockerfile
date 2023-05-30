FROM node:18

# Create a directory for application
WORKDIR /usr/src/app

# Copy package json file to directory
COPY package.json ./

# Install dependencies
RUN npm install

# Copy app source code to directory
COPY . .

# Export port at which service will be accessible
EXPOSE 3600:3600

# Build the app
RUN npm run build

# Start the server using following commands
CMD ["node", "dist/index.js"]