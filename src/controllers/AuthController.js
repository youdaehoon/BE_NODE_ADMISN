import Cognito from "../service/CognitoService.js";
class AuthController {
  constructor() {
    this.cognito = new Cognito();
  }
  async listUsers(req, res) {
    try {
      const result = await this.cognito.listUsers();
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "internal server error" });
    }
  }
}

export default AuthController;
