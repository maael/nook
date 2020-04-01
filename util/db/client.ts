import { GraphQLClient } from "graphql-request";

export function getClient() {
  const endpoint = "https://graphql.fauna.com/graphql";
  const c = new GraphQLClient(endpoint, {
    headers: {
      authorization: `Bearer ${process.env.FAUNA_SECRET}`,
      "X-Schema-Preview": "partial-update-mutation"
    }
  });
  return c;
}

const client = getClient();

export default client;
