FROM node:16.20.1

WORKDIR /opt

COPY package.json yarn.lock* ./

RUN yarn install

COPY . .

ENV PORT 3001

EXPOSE 3001

CMD ["yarn", "start"]