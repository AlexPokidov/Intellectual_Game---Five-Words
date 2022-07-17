FROM node:12-alpine
WORKDIR /Five-to-word
COPY . .
RUN npm i
CMD npm run watch
