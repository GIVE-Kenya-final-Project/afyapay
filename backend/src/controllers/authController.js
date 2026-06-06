import registrationService from "../services/registrationService.js";

class AuthController {

  async register(req, res) {
    try {
      const { wallet, role } = req.body;

      const result =
        await registrationService.registerUser(
          wallet,
          role
        );

      res.status(201).json({
        success: true,
        data: result,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message,
      });

    }
  }

  async getUser(req, res) {

    try {

      const { wallet } = req.params;

      const user =
        await registrationService.getUser(wallet);

      res.json({
        success: true,
        data: user,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message,
      });

    }
  }
}

export default new AuthController();