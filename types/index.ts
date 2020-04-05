export interface JWT {
  _id: string;
  redditId?: string;
  redditName?: string;
  redditIcon?: string;
  redditDarkmode?: boolean;
  discordId?: string;
  discordName?: string;
  discordDiscriminator?: string;
  discordFullName?: string;
  discordIcon?: string;
  nintendoName?: string;
  animalCrossingTag?: string;
  hasHadFirstSync?: boolean;
  version: number;
}

export enum UserType {
  DISCORD = "discord",
  REDDIT = "reddit"
}
