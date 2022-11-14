import { s3Client } from "./S3.js";
import {
  PutObjectCommand,
  CreateBucketCommand,
  ListObjectsCommand,
} from "@aws-sdk/client-s3";

const bucketParams = { Bucket: "dev-iao-test-image" };

const run = async () => {
  try {
    const data = await s3Client.send(new ListObjectsCommand(bucketParams));
    console.log(data.Contents);
    console.log(typeof data.Contents[0]);
    return data;
  } catch (err) {
    console.log(err);
  }
};

run();
