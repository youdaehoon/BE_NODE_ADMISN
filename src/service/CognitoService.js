import { CognitoIdentityProvider } from "@aws-sdk/client-cognito-identity-provider";
import { awsconfig, userPoolId } from "../config/awsconfig.js";
import AWS from "aws-sdk";

AWS.config.update(awsconfig);
var cog = new AWS.CognitoIdentityServiceProvider();
export default class Cognito {
  constructor() {
    this.cognito = new CognitoIdentityProvider(awsconfig);
  }

  async listUsers() {
    const params = {
      UserPoolId: userPoolId,
      AttributesToGet: ["email"],
      Limit: 10,
    };

    try {
      const data = await cog.listUsers(params);
      console.log(data);
      return data;
    } catch (err) {
      console.log(err);
    }
  }
}
