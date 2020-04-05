import client from "./client";
import { embellishCreate, embellishUpdate } from "./util";
import { User, RawCreateInput } from "../../types/db";

export const userFields = `
  _id
  redditId
  redditName
  redditIcon
  redditDarkmode
  discordId
  discordName
  discordDiscriminator
  discordFullName
  discordIcon
  nintendoName
  animalCrossingTag
  hasHadFirstSync
  isActive
  createdAt
`;

export async function createUser(
  variables: RawCreateInput<Partial<User>>
): Promise<User> {
  const query = `
    mutation CreateUser ($user:UserInput!) {
      createUser(data:$user){
        ${userFields}
      }
    }
  `;

  const user = embellishCreate({
    ...variables,
    hasHadFirstSync: false
  });

  return (await client.request(query, { user })).createUser;
}

export async function getUserByDiscordName(discordName: string): Promise<User> {
  const query = `
    query UserByDiscordName ($discordName:String!) {
      getUserByDiscordName(discordName:$discordName){
        ${userFields}
      }
    }
  `;
  return (await client.request(query, { discordName })).getUserByDiscordName;
}

export async function getUserByDiscordFullName(
  discordFullName: string
): Promise<User> {
  const query = `
    query UserByDiscordFullName ($discordFullName:String!) {
      getUserByDiscordFullName(discordFullName:$discordFullName){
        ${userFields}
      }
    }
  `;
  return (await client.request(query, { discordFullName }))
    .getUserByDiscordFullName;
}

export async function getUserByDiscordId(discordId: string): Promise<User> {
  const query = `
    query UserByDiscordId ($discordId:String!) {
      getUserByDiscordId(discordId:$discordId){
        ${userFields}
      }
    }
  `;
  return (await client.request(query, { discordId })).getUserByDiscordId;
}

export async function getUser(userId: string): Promise<User> {
  const query = `
    query GetUser ($userId:ID!) {
      findUserByID(id:$userId){
        ${userFields}
      }
    }
  `;
  return (await client.request(query, { userId })).findUserByID;
}

export async function getUserByRedditName(redditName: string): Promise<User> {
  const query = `
    query UserByRedditName ($redditName:String!) {
      getUserByRedditName(redditName:$redditName){
        ${userFields}
      }
    }
  `;
  return (await client.request(query, { redditName })).getUserByRedditName;
}

export async function updateUser(userId: string, rawData: Partial<User>) {
  const query = `
    mutation UpdateUser ($userId: ID!, $user: UserInput!) {
      updateUser(id:$userId,data:$user) {
        ${userFields}
      }
    }
  `;

  const user = embellishUpdate({
    isActive: true,
    ...rawData
  });

  return (await client.request(query, { userId, user })).updateUser;
}

export async function getUsers() {
  const query = `
  query Users {
    getUsers (_size: 10000){
      data {
        ${userFields}
      }
    }
  }
`;
  return (await client.request(query)).getUsers;
}
