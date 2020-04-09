if (process.env.NODE_ENV !== "production") {
  require("dotenv-extended").load();
}

module.exports = {
  env: {
    REDDIT_OAUTH_ID: process.env.REDDIT_OAUTH_ID,
    REDDIT_OAUTH_SECRET: process.env.REDDIT_OAUTH_SECRET,
    OAUTH_REDIRECT_ORIGIN:
      process.env.NODE_ENV === "production"
        ? "https://nook.services"
        : "http://localhost:3000",
    DISCORD_OAUTH_ID: process.env.DISCORD_OAUTH_ID,
    DISCORD_OAUTH_SECRET: process.env.DISCORD_OAUTH_SECRET,
    JWT_SECRET: process.env.JWT_SECRET,
    FAUNA_SECRET: process.env.FAUNA_SECRET,
    MOCK_USER_ID: process.env.MOCK_USER_ID,
    OAUTH_STATE: process.env.OAUTH_STATE,
    NOOK_S3_ACCESS_KEY_ID: process.env.NOOK_S3_ACCESS_KEY_ID,
    NOOK_S3_SECRET_ACCESS_KEY: process.env.NOOK_S3_SECRET_ACCESS_KEY,
    NOOK_S3_BUCKET_NAME: process.env.NOOK_S3_BUCKET_NAME,
    ROOT: __dirname
  }
};
