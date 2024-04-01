# Use the latest stable version of Node.js
FROM node:16.3.0

# Create app directory in the container
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json /app

RUN npm install

# Bundle app source
COPY . /app

# Your app binds to port 3000, so you'll use the EXPOSE instruction to have it mapped by the docker daemon
EXPOSE 3000

# Start the app using Nodemon
CMD ["npm", "run", "start"]
