import stellarService from "./stellarService.js";

class RegistrationService {

  async registerUser(
    wallet,
    role,
    name
  ) {
    return stellarService.registerUser(
      wallet,
      role,
      name
    );
  }

  async getUser(wallet) {
    return stellarService.getUser(wallet);
  }
}

export default new RegistrationService();