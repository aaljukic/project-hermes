# Build Phase
FROM node:18-alpine AS builder

WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
    if [ -f yarn.lock ]; then echo "Info: running - yarn --frozen-lockfile" && yarn --frozen-lockfile; \
    elif [ -f package-lock.json ]; then echo "Info: running - npm ci" && npm ci; \
    elif [ -f pnpm-lock.yaml ]; then echo "Info: running - yarn global add pnpm && pnpm i" && yarn global add pnpm && pnpm i; \
    else echo "Warning: Lockfile not found. It is recommended to commit lockfiles to version control." && yarn install; \
    fi

COPY . .

# Build React app
RUN \
    if [ -f yarn.lock ]; then echo "Info: running - yarn build" && yarn build; \
    elif [ -f package-lock.json ]; then echo "Info: running - npm run build" && npm run build; \
    elif [ -f pnpm-lock.yaml ]; then echo "Info: running - pnpm run build" && pnpm run build; \
    else yarn build; \
    fi

# Production Phase
FROM node:18-alpine AS runner

WORKDIR /app

# Install serve to serve the built React app
RUN npm install -g serve

# Copy the built React app from the builder phase
COPY --from=builder /app/dist ./dist

# Root is a no-no
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 reactjs
USER reactjs

CMD ["serve", "-s", "dist"]
