import { JWT_VERSION } from "../util/constants";
import { JWT } from "../types/index";

const mockJWT: JWT = {
  _id: process.env.MOCK_USER_ID!,
  redditName: "Maael",
  redditId: "test",
  redditIcon:
    "https://www.redditstatic.com/avatars/avatar_default_16_DDBD37.png",
  redditDarkmode: true,
  version: JWT_VERSION
};

export default mockJWT;
