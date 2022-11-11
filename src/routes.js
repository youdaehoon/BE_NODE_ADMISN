import { CognitoIdentityProvider } from "@aws-sdk/client-cognito-identity-provider";
import { Router } from "express";
import AuthController from "./controllers/AuthController.js";
import { awsconfig, userPoolId } from "./config/awsconfig.js";
const routes = new Router();

var cog = new CognitoIdentityProvider(awsconfig);

async function listUsers() {
  const params = {
    UserPoolId: userPoolId,

    Limit: 10,
  };

  try {
    const data = await cog.listUsers(params);
    console.log(data.Users);
    data.Users.map((v, i) => console.log(v.Username, v.Attributes));
    return data;
  } catch (err) {
    console.log(err);
  }
}

routes.get("/listUsers", async (req, res) => {
  const result = await listUsers();
  res.json(result.Users);
});

export default routes;
