import { parse } from "path";
import { S3 } from "aws-sdk";

const { S3_ACCESS_KEY_ID, S3_SECRET_ACCESS_KEY, S3_BUCKET_NAME } = process.env;

const s3 = new S3({
  accessKeyId: S3_ACCESS_KEY_ID,
  secretAccessKey: S3_SECRET_ACCESS_KEY
});

export async function upload(
  userId: string,
  makerCode: string,
  file: Express.Multer.File
) {
  const { ext } = parse(file.originalname);
  const result = await s3
    .upload({
      Bucket: S3_BUCKET_NAME!,
      Key: `custom-design/${userId}/${makerCode}${ext}`,
      Body: file.buffer
    })
    .promise();
  return result.Location;
}

export async function remove(url: string) {
  const key = url.split(S3_BUCKET_NAME!)[1].slice(1);
  await s3.deleteObject({ Bucket: S3_BUCKET_NAME!, Key: key }).promise();
}
