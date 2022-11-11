import { CognitoIdentityProvider } from "@aws-sdk/client-cognito-identity-provider";
import { awsconfig, userPoolId } from "../config/awsconfig.js";

export default class Cognito {
  constructor() {
    this.cog = new CognitoIdentityProvider(awsconfig);
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

// var cog = new CognitoIdentityProvider(awsconfig);

// async function listUsers() {
//   const params = {
//     UserPoolId: userPoolId,
//     AttributesToGet: ["email"],
//     Limit: 10,
//   };

//   try {
//     const data = await cog.listUsers(params);

//     data.Users.map((v, i) => console.log(v));
//     return data;
//   } catch (err) {
//     console.log(err);
//   }
// }
// listUsers();
