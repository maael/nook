import { parse } from "path";
import { S3 } from "aws-sdk";

const s3 = new S3({
  accessKeyId: process.env.NOOK_S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.NOOK_S3_SECRET_ACCESS_KEY
});

export async function upload(
  userId: string,
  makerCode: string,
  file: Express.Multer.File
) {
  const { ext } = parse(file.originalname);
  const result = await s3
    .upload({
      Bucket: process.env.NOOK_S3_BUCKET_NAME!,
      Key: `custom-design/${userId}/${makerCode}${ext}`,
      Body: file.buffer
    })
    .promise();
  return result.Location;
}

export async function remove(url: string) {
  const key = url.split(process.env.NOOK_S3_BUCKET_NAME!)[1].slice(1);
  await s3
    .deleteObject({ Bucket: process.env.NOOK_S3_BUCKET_NAME!, Key: key })
    .promise();
}
