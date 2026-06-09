ARG STELLAR_CLI_VERSION=22.4.0

FROM rust:1.84-slim AS stellar-builder
ARG STELLAR_CLI_VERSION
RUN apt-get update && apt-get install -y pkg-config libssl-dev && \
    cargo install stellar-cli@${STELLAR_CLI_VERSION}

FROM node:20-slim
RUN apt-get update && apt-get install -y ca-certificates && rm -rf /var/lib/apt/lists/*
COPY --from=stellar-builder /usr/local/cargo/bin/stellar /usr/local/bin/stellar
RUN stellar --version

WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force
COPY . .
RUN npx prisma generate

EXPOSE 5000
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh
ENTRYPOINT ["/docker-entrypoint.sh"]
