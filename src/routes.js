import { CognitoIdentityProvider } from "@aws-sdk/client-cognito-identity-provider";
import { Router } from "express";
import AuthController from "./controllers/AuthController.js";
import { awsconfig, userPoolId } from "./config/awsconfig.js";
import multer from "multer";
import AWS from "aws-sdk";
import fs from "fs";
import { S3Client } from "@aws-sdk/client-s3";

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
    return data;
  } catch (err) {
    console.log(err);
  }
}
async function adminConfirmSignUp(Username) {
  const params = {
    UserPoolId: "ap-northeast-2_JierIWEbC",
    Username: Username,
  };
  console.log(params);
  try {
    const data = await cog.adminConfirmSignUp(params);
    return data;
  } catch (err) {
    console.log("여기");
    console.log(err);
  }
}

routes.get("/listUsers", async (req, res) => {
  const result = await listUsers();
  res.json(result.Users);
});

routes.post("/confirm", async (req, res) => {
  const { name } = req.body;
  const result = await adminConfirmSignUp(name);
  res.json(result);
});

const upload = multer();
const s3 = new AWS.S3();

async function uploadImage(file) {
  console.log(file);
  // const fileStream = fs.createReadStream(file.path);
  // console.log(file);
  const params = {
    Bucket: "dev-iao-test-image",
    Body: file.buffer,
    Key: file.originalname,
  };
  try {
    await s3.upload(params).promise();
    console.log("upload완료");
  } catch (err) {
    console.log(err);
  }
}

routes.post("/upload", upload.single("Image"), async (req, res) => {
  console.log("11");
  const file = req.file;

  uploadImage(file);
});

export default routes;
