<img height="100" align="right" src="./faunadb.png">

# Database

Uses [FaunaDB](https://fauna.com) for a DB designed for serverless architectures.

[FaunaDB for SQL Users](https://docs.fauna.com/fauna/current/start/fql_for_sql_users.html)

Rather than spending time figuring out the Functions concept in FaunaDB, I have chosen to let FaunaDB do it's automatic Mutations, and then I will guard calls to FaunaDB inside `/api/db/*` routes to add any extra logic that I want.

This also acts as a buffer between be and FaunaDB if I want to change my database behind the scenes.

## Schema

I construct my initial FaunaDB collections and shape by importing a graphql schema definition.

The schema provided to FaunaDB can be see [here](./schema.gql).

## Types

The Typescript types can be seen [here](../types/db.ts).
