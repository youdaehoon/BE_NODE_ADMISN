import { S3Client } from "@aws-sdk/client-s3";
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config({ path: "../.env" });

const REGION = process.env.AWS_REGION;
const config = {
  region: REGION,
};
const s3Client = new S3Client(config);
export { s3Client };
