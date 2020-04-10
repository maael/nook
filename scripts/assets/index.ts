import getDataImages from "./getDataImages";

(async () => {
  await getDataImages();
})().catch(e => console.error(e));
