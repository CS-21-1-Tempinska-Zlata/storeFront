FROM node
WORKDIR /storeFrontClient
COPY package.json .
RUN npm install
COPY . .
EXPOSE 4010
CMD [ "npm", "start" ]