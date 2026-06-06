deploy contract;
    stellar contract deploy \
  --source hospital \
  --network testnet \
  --wasm target/wasm32v1-none/release/<contract-name>.wasm

 #fund accounts
 my fund accounts are hospita, insurer and investor;
 i used only hospital account to deploy all my contracts.

 to create claim:
    stellar contract invoke \
  --id CBYQK5XW6A7Z4M2R... \
  --source hospital \
  --network testnet \
  -- create_claim \
  --hospital_wallet GA123... \
  --insurer_wallet GB456... \
  --claim_amount 1000
   
   to get claim:
    stellar contract invoke \
  --id <registry-id> \
  --source hospital \
  --network testnet \
  -- get_claim \
  --claim_id 2

  to approve claim:
    stellar contract invoke \
  --id <registry-id> \
  --source insurer \
  --network testnet \
  -- approve_claim \
  --claim_id 2
  
  to reject claim:
    stellar contract invoke \
  --id <registry-id> \
  --source insurer \
  --network testnet \
  -- reject_claim \
  --claim_id 3




 to tokenize the approved claim:
stellar contract invoke \
  --id <tokenization-id> \
  --source hospital \
  --network testnet \
  -- tokenize_claim \
  --claim_id 1 \
  --owner hospital

  to confirm the tokens;
  stellar contract invoke \
  --id <tokenization-id> \
  --source hospital \
  --network testnet \
  -- get_token \
  --token_id 1

   to settle ;
   stellar contract invoke \
  --id <settlement-id> \
  --source insurer \
  --network testnet \
  -- settle_claim \
  --token_id 1 \
  --claim_id 1 \
  --payer <insurer-address> \
  --payee <investor-address> \
  --amount 1000

  to transfer to new owner:
    stellar contract invoke \
  --id <tokenization-id> \
  --source hospital \
  --network testnet \
  -- transfer_token \
  --token_id 1 \
  --new_owner GINVESTOR123...

  to get settlement:
  stellar contract invoke \
  --id <settlement-id> \
  --source hospital \
  --network testnet \
  -- get_settlement \
  --token_id 1


  created the registration contarct;
  the roles are Hospital, Insurer, Investor
  command:
    stellar contract invoke \
  --id <contract-id> \
  --source <admin-keypair> \
  --network testnet \
  -- \
  register_user \
  --caller <admin-address> \
  --user <wallet-address> \
  --role Hospital \
  --name "City Hospital"
