# Install dependencies only when needed
FROM node:18-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile


FROM base AS builder
WORKDIR /app
COPY --from=base /app/node_modules ./node_modules
COPY . .
ENV NEXT_PUBLIC_APP_HOST="http://localhost:8080"
RUN yarn prisma generate && yarn build


FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodegroup
RUN adduser --system --uid 1001 nodeuser

COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nodeuser:nodeuser /app/.next/standalone ./
COPY --from=builder --chown=nodeuser:nodegroup /app/.next/static ./.next/static

USER nodeuser

EXPOSE 3000

ENV DATABASE_URL="postgresql://postgres:secret@localhost:5432/postgres?schema=public"
ENV PORT 3000

CMD ["node", "server.js"]