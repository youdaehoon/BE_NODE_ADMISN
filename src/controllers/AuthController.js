import Cognito from "../service/CognitoService.js";

class AuthController {
  constructor() {
    this.cog22 = new Cognito();
  }

  async listUsers(req, res) {
    try {
      console.log(this.cog22);
      console.log("여기위");
      const result = await this.cog22.listUsers();
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "internal server error" });
    }
  }
}

export default AuthController;
