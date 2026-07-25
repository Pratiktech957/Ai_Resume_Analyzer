import dotenv from "dotenv";
dotenv.config();

import {
    S3Client,
    ListBucketsCommand,
} from "@aws-sdk/client-s3";

const client = new S3Client({
    region: "auto",
    endpoint: process.env.R2_ENDPOINT,
    forcePathStyle: true,
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    },
});

console.log({
    endpoint: process.env.R2_ENDPOINT,
    bucket: process.env.R2_BUCKET,
    accessKeyPrefix: process.env.R2_ACCESS_KEY_ID.slice(0, 8),
});

try {
    const result = await client.send(new ListBucketsCommand({}));
    console.log(result);
} catch (err) {
    console.error(err);
}