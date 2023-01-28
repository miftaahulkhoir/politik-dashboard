FROM node:lts-alpine as dependencies
RUN apk add --no-cache libc6-compat
WORKDIR /patronpolitik
COPY .env ./
# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN npm ci --force

FROM node:lts-alpine as builder
WORKDIR /patronpolitik
COPY . .
COPY --from=dependencies /patronpolitik/node_modules ./node_modules
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

FROM node:lts-alpine as runner
WORKDIR /patronpolitik
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1
COPY --from=builder /patronpolitik/next.config.js ./
COPY --from=builder /patronpolitik/public ./public
COPY --from=builder /patronpolitik/.next ./.next
COPY --from=builder /patronpolitik/node_modules ./node_modules
COPY --from=builder /patronpolitik/package.json ./package.json

EXPOSE 3000
CMD ["npm", "start"]