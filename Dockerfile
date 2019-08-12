FROM node:10.16.2-alpine

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

# Copy app source into app directory
COPY . /usr/src/app

EXPOSE 5000

# Run npm start to launch the api
CMD ["npm", "start"]
