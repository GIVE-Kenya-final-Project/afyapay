default: build

all: test

test: build
	cargo test

build:
	stellar contract build
	@ls -l target/wasm32v1-none/release/*.wasm

fmt:
	cargo fmt --all

clean:
	cargo clean

create claim;
         stellar contract invoke \
  --id <registry-id> \
  --source hospital \
  --network testnet \
  -- create_claim \
  --hospital_wallet <hospital-address> \
  --insurer_wallet <insurer-address> \
  --claim_amount 1000

  read claim;
    stellar contract invoke \
  --id <registry-id> \
  --source hospital \
  --network testnet \
  -- get_claim \
  --claim_id 2

  approve claim:
        stellar contract invoke \
  --id <registry-id> \
  --source insurer \
  --network testnet \
  -- approve_claim \
  --claim_id 2

 tokenize claim: 
 stellar contract invoke \
  --id <tokenization-id> \
  --source insurer \
  --network testnet \
  -- tokenize_claim

settle claim:
stellar contract invoke \
  --id <settlement-id> \
  --source insurer \
  --network testnet \
  -- settle_claim