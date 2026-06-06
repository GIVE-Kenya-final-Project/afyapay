const {
  TransactionBuilder,
  BASE_FEE,
  Contract,
  Networks,
} = require("@stellar/stellar-sdk");

const {
  server,
  adminKeypair,
  networkPassphrase,
} = require("../config/stellar");

async function invokeContract(contractId, method, args = []) {
  const sourceAccount = await server.getAccount(
    adminKeypair.publicKey()
  );

  const contract = new Contract(contractId);

  let tx = new TransactionBuilder(sourceAccount, {
    fee: BASE_FEE,
    networkPassphrase,
  })
    .addOperation(
      contract.call(method, ...args)
    )
    .setTimeout(30)
    .build();

  tx.sign(adminKeypair);

  const prepared = await server.prepareTransaction(tx);

  const response = await server.sendTransaction(
    prepared
  );

  return response;
}

module.exports = {
  invokeContract,
};