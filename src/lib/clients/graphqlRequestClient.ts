import { GraphQLClient } from "graphql-request";

const requestHeaders = {
  authorization: "Bearer Token",
};

const graphqlRequestClient = new GraphQLClient(
  "http://localhost:3000/graphql" as string,
  {
    headers: requestHeaders,
  }
);

export default graphqlRequestClient;
//http://192.168.150.152:3000/graphql
