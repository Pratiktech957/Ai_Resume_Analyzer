import { S3Client } from "@aws-sdk/client-s3";
import dotenv from "dotenv";

dotenv.config();

console.log("========== R2 ENV ==========");
console.log("ACCESS KEY:", process.env.R2_ACCESS_KEY_ID);
console.log(
    "SECRET PREFIX:",
    process.env.R2_SECRET_ACCESS_KEY?.substring(0, 10)
);
console.log("ENDPOINT:", process.env.R2_ENDPOINT);
console.log("BUCKET:", process.env.R2_BUCKET);

const r2 = new S3Client({
    region: "auto",
    endpoint: process.env.R2_ENDPOINT,
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    },
    forcePathStyle: true,
});

export default r2;