FROM node:18-alpine

WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
    if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
    elif [ -f package-lock.json ]; then npm ci; \
    elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i; \
    else echo "Warning: Lockfile not found. It is recommended to commit lockfiles to version control." && yarn install; \
    fi

COPY . .

EXPOSE 3000

# Start the React app in development mode based on the preferred package manager
CMD \
    if [ -f yarn.lock ]; then echo "Info: running - yarn dev" && yarn dev; \
    elif [ -f package-lock.json ]; then echo "Info: running - npm run dev" && npm run dev; \
    elif [ -f pnpm-lock.yaml ]; then echo "Info: running - pnpm run dev" && pnpm run dev; \
    else yarn dev; \
    fi
