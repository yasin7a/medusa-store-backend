# Stage 1: Builder
FROM node:20-alpine AS builder
WORKDIR /app

# Copy package files
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy full project and build Medusa
COPY . .
RUN npx medusa build

# Install dependencies in the build folder
WORKDIR /app/.medusa/server
RUN npm install --only=production

# Stage 2: Production image
FROM node:20-alpine
WORKDIR /app

# Copy the built server from the builder
COPY --from=builder /app/.medusa/server ./.medusa/server
COPY ./.env ./.medusa/server/.env.production


WORKDIR /app/.medusa/server

EXPOSE 9000

ENV NODE_ENV=production

# Run migrations and start Medusa
CMD ["sh", "-c", "npx medusa db:migrate && npm run start"]
