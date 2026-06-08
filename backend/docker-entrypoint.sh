#!/bin/sh
set -e

# Configure Stellar named identities from environment variables
add_key() {
    local name="$1"
    local secret="$2"
    if [ -n "$secret" ]; then
        if stellar keys ls 2>/dev/null | grep -q "^$name$"; then
            echo "Key '$name' already exists"
        else
            echo "$secret" | stellar keys add "$name" --secret-key-stdin 2>/dev/null || \
            echo "$secret" | stellar keys add "$name" 2>/dev/null || \
            echo "Warning: could not add key '$name' (continuing)"
        fi
    fi
}

add_key "admin" "${STELLAR_KEY_ADMIN:-}"
add_key "hospital" "${STELLAR_KEY_HOSPITAL:-}"
add_key "insurer" "${STELLAR_KEY_INSURER:-}"
add_key "investor" "${STELLAR_KEY_INVESTOR:-}"

# Apply pending Prisma migrations
npx prisma migrate deploy 2>/dev/null || echo "No pending migrations or database already up to date"

exec node src/server.js
