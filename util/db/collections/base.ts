import client from "../client";
import { getIsoString } from "../util";

const fields = `
  name
  _id
  createdAt
`;

export function prepareCreate(inputType: string, createMutation: string) {
  return async function createCollectionItem(
    userId: string,
    name: string
  ): Promise<any> {
    const query = `
      mutation CreateItem ($data:${inputType}!) {
        ${createMutation}(data:$data){
          ${fields}
        }
      }
    `;

    const data = {
      name,
      createdAt: getIsoString(),
      userId,
      user: {
        connect: userId
      }
    };

    return ((await client.request(query, { data })) as any)[createMutation];
  };
}

export function prepareDelete(deleteMutation: string) {
  return async function deleteCollectionItem(id: string) {
    const query = `
      mutation DeleteItem ($id:ID!) {
        ${deleteMutation}(id:$id){
          ${fields}
        }
      }
    `;
    return ((await client.request(query, { id })) as any)[deleteMutation];
  };
}

export function prepareGet(getMutation: string) {
  return async function getCollectionItems(userId: string) {
    const query = `
      query getItems ($userId: ID!) {
        ${getMutation}(userId:$userId, _size: 10000){
          data {
            ${fields}
          }
        }
      }
    `;
    return ((await client.request(query, { userId })) as any)[getMutation].data;
  };
}

export function prepareGetByUserAndName(getQuery: string) {
  return async function getCollectionItem(userId: string, name: string) {
    const query = `
      query getItems ($userId: ID!, $name: String!) {
        ${getQuery}(userId:$userId, name:$name){
          ${fields}
        }
      }
    `;
    return ((await client.request(query, { userId, name })) as any)[getQuery];
  };
}
