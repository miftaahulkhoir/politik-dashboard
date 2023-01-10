FROM node:lts as dependencies
WORKDIR /license
COPY package*.json ./
COPY .env ./
RUN npm install --force

FROM node:lts as builder
WORKDIR /license
COPY . .
COPY --from=dependencies /license/node_modules ./node_modules
RUN npm run build

FROM node:lts as runner
WORKDIR /license
ENV NODE_ENV production
COPY --from=builder /license/next.config.js ./
COPY --from=builder /license/public ./public
COPY --from=builder /license/.next ./.next
COPY --from=builder /license/node_modules ./node_modules
COPY --from=builder /license/package.json ./package.json

#EXPOSE 3000
CMD ["npm", "start"]