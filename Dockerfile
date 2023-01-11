FROM node:lts as dependencies
WORKDIR /patronpolitik
COPY package*.json ./
COPY .env ./
RUN npm install --force

FROM node:lts as builder
WORKDIR /patronpolitik
COPY . .
COPY --from=dependencies /patronpolitik/node_modules ./node_modules
RUN npm run build

FROM node:lts as runner
WORKDIR /patronpolitik
ENV NODE_ENV production
COPY --from=builder /patronpolitik/next.config.js ./
COPY --from=builder /patronpolitik/public ./public
COPY --from=builder /patronpolitik/.next ./.next
COPY --from=builder /patronpolitik/node_modules ./node_modules
COPY --from=builder /patronpolitik/package.json ./package.json

EXPOSE 3000
CMD ["npm", "start"]