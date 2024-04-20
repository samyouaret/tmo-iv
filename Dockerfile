FROM  node:20

# Create app directory
WORKDIR /usr/src/app

COPY yarn.lock package.json ./

# install app dependencies
RUN yarn install --frozen-lockfile

COPY . .

# Build app
RUN yarn build

EXPOSE 3000

CMD ["node", "dist/main.js"]