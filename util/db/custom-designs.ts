import client from "./client";
import { getIsoString } from "./util";
import { userFields } from "./user";

const fields = `
  _id
  user {
    ${userFields}
  }
  s3Url
  type
  code
  title
  tags
  likes
`;

interface CreateInput {
  type: string;
  s3Url: string;
  code: string;
  title: string;
  tags: string[];
}

export async function create(userId: string, input: CreateInput): Promise<any> {
  const query = `
      mutation CreateItem ($data:CustomDesignInput!) {
        createCustomDesign(data:$data){
          ${fields}
        }
      }
    `;

  const data = {
    ...input,
    userId: userId,
    user: {
      connect: userId
    },
    likes: 0,
    createdAt: getIsoString(),
    redacted: false
  };

  return (await client.request(query, { data })).createCustomDesign;
}

export async function getCustomDesignsForUser(userId: string) {
  const query = `
    query GetCustomDesignsByUser($userId: ID!) {
      getCustomDesignsByUser(userId:$userId, redacted:false) {
        data {
          ${fields}
        }
      }
    }
  `;
  return (await client.request(query, { userId })).getCustomDesignsByUser.data;
}

export async function getCustomDesigns() {
  const query = `
    query GetCustomDesigns {
      getCustomDesignsByRedacted(redacted:false) {
        data {
          ${fields}
        }
      }
    }
  `;
  return (await client.request(query)).getCustomDesignsByRedacted.data;
}

export async function deleteCustomDesign(id: string) {
  const query = `
    mutation DeleteItem ($id:ID!) {
      deleteCustomDesign(id:$id){
        ${fields}
      }
    }
  `;

  return (await client.request(query, { id })).deleteCustomDesign;
}
