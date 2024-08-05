FROM --platform=linux/amd64 node:lts as dependencies
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install

FROM --platform=linux/amd64 node:lts as builder

WORKDIR /app

ENV NEXT_PUBLIC_API_URL="https://platform.dev.wearebren.com/api"

ENV NEXT_PUBLIC_FRONTEND_PLATFORM="https://api.dev.wearebren.com/"

COPY . .
COPY --from=dependencies /app/node_modules ./node_modules

RUN yarn build

FROM --platform=linux/amd64 node:lts as runner
WORKDIR /app


ENV NODE_ENV production

COPY --from=builder /app/next.config.js ./next.config.js
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000
CMD ["yarn", "start"]