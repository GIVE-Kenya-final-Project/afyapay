import registrationService from "../services/registrationService.js";

class AuthController {

  async register(req, res) {
    try {
      const { wallet, role, name } = req.body;

      const result =
        await registrationService.registerUser(
          wallet,
          role, 
          name
        );

      res.status(201).json({
        success: true,
        message: "User registered successfully",
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
        data:user,
      });

    }
  }
}

export default new AuthController();