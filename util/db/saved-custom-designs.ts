import client from "./client";
import { userFields } from "./user";
import { fields as customDesignFields } from "./custom-designs";

const fields = `
  _id
  user {
    ${userFields}
  }
  customDesign {
    ${customDesignFields}
  }
`;

export async function create(
  userId: string,
  customDesignId: string
): Promise<any> {
  const query = `
      mutation CreateItem ($data:SavedCustomDesignInput!) {
        createSavedCustomDesign(data:$data){
          ${fields}
        }
      }
    `;

  const data = {
    userId: userId,
    user: {
      connect: userId
    },
    customDesignId: customDesignId,
    customDesign: {
      connect: customDesignId
    }
  };

  return (await client.request(query, { data })).createSavedCustomDesign;
}

export async function getSavedCustomDesignsForUser(
  userId: string,
  idsOnly: boolean = false
) {
  const query = `
    query GetSavedCustomDesignsByUser($userId: ID!) {
      getSavedCustomDesignsByUser(userId:$userId) {
        data {
          ${
            idsOnly
              ? `
            _id
            customDesign {
              _id
            }
          `
              : fields
          }
        }
      }
    }
  `;
  return (await client.request(query, { userId })).getSavedCustomDesignsByUser
    .data;
}

export async function deleteSavedCustomDesign(id: string) {
  const query = `
    mutation DeleteItem ($id:ID!) {
      deleteSavedCustomDesign(id:$id){
        ${fields}
      }
    }
  `;

  return (await client.request(query, { id })).deleteSavedCustomDesign;
}
