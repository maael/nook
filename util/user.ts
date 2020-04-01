import { User } from "../types/db";
import { UserType, JWT } from "../types";

type PossibleUserShape = User | JWT;

export { UserType };

const nameMap: Record<UserType, keyof PossibleUserShape> = {
  [UserType.REDDIT]: "redditName",
  [UserType.DISCORD]: "discordName"
};

const iconMap: Record<UserType, keyof PossibleUserShape> = {
  [UserType.REDDIT]: "redditIcon",
  [UserType.DISCORD]: "discordIcon"
};

const profileLink: Record<UserType, (u: PossibleUserShape) => string> = {
  [UserType.REDDIT]: formatProfileLinkType(UserType.REDDIT, "redditName"),
  [UserType.DISCORD]: formatProfileLinkType(UserType.DISCORD, "discordName")
};

export function getUserType(u: PossibleUserShape) {
  return u.redditId ? UserType.REDDIT : UserType.DISCORD;
}

export function getUserName(u: PossibleUserShape): string {
  const type = getUserType(u);
  return `${u[nameMap[type]]}`;
}

export function getUserIcon(u: PossibleUserShape): string {
  const type = getUserType(u);
  return `${u[iconMap[type]]}`;
}

export function getUserProfileLink(u: PossibleUserShape): string {
  const type = getUserType(u);
  return profileLink[type](u);
}

function formatProfileLinkType(t: UserType, k: keyof PossibleUserShape) {
  return (u: PossibleUserShape) => {
    const base = `/user/${t}/${u[k]}`;
    return t === UserType.DISCORD
      ? `${base}-d-${u.discordDiscriminator || "???"}`
      : base;
  };
}
