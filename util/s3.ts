import { parse } from "path";
import { S3 } from "aws-sdk";

const {
  NOOK_S3_ACCESS_KEY_ID,
  NOOK_S3_SECRET_ACCESS_KEY,
  NOOK_S3_BUCKET_NAME
} = process.env;

const s3 = new S3({
  accessKeyId: NOOK_S3_ACCESS_KEY_ID,
  secretAccessKey: NOOK_S3_SECRET_ACCESS_KEY
});

export async function upload(
  userId: string,
  makerCode: string,
  file: Express.Multer.File
) {
  const { ext } = parse(file.originalname);
  console.info(
    "uploading",
    NOOK_S3_ACCESS_KEY_ID,
    NOOK_S3_SECRET_ACCESS_KEY,
    NOOK_S3_BUCKET_NAME,
    userId,
    makerCode,
    ext
  );
  const result = await s3
    .upload({
      Bucket: NOOK_S3_BUCKET_NAME!,
      Key: `custom-design/${userId}/${makerCode}${ext}`,
      Body: file.buffer
    })
    .promise();
  return result.Location;
}

export async function remove(url: string) {
  const key = url.split(NOOK_S3_BUCKET_NAME!)[1].slice(1);
  await s3.deleteObject({ Bucket: NOOK_S3_BUCKET_NAME!, Key: key }).promise();
}
