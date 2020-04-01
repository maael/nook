export interface ListResponse<T> {
  data: T;
  before?: string;
  after?: string;
}

export interface ListRequestParams {
  _size?: number;
  _cursor?: string;
}

export type RawCreateInput<T> = Omit<T, "_id" | "isActive" | "createdAt" | "updatedAt">;

export interface Entity {
  _id: string;
  _ts: string;
}

export interface User extends Entity {
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
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}
