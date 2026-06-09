ARG STELLAR_CLI_VERSION=26.1.0

FROM node:20-slim AS stellar-downloader
ARG STELLAR_CLI_VERSION
RUN apt-get update && apt-get install -y curl ca-certificates && rm -rf /var/lib/apt/lists/*
RUN mkdir -p /tmp/stellar-cli && \
    curl -sSfL "https://github.com/stellar/stellar-cli/releases/download/v${STELLAR_CLI_VERSION}/stellar-cli-${STELLAR_CLI_VERSION}-x86_64-unknown-linux-gnu.tar.gz" \
    | tar xz -C /tmp/stellar-cli && \
    find /tmp/stellar-cli -type f \( -name "stellar" -o -name "stellar-cli" \) -exec cp {} /usr/local/bin/stellar \; && \
    chmod +x /usr/local/bin/stellar

FROM node:20-slim
RUN apt-get update && apt-get install -y libdbus-1-3 ca-certificates && rm -rf /var/lib/apt/lists/*
COPY --from=stellar-downloader /usr/local/bin/stellar /usr/local/bin/stellar
RUN stellar --version

WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force
COPY . .
EXPOSE 5000
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh
ENTRYPOINT ["/docker-entrypoint.sh"]
