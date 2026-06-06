deploy contract;
    stellar contract deploy \
  --source hospital \
  --network testnet \
  --wasm target/wasm32v1-none/release/<contract-name>.wasm
