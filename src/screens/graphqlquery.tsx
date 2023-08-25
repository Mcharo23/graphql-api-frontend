import { gql } from "graphql-request";
import React, { FC } from "react";
import { GraphQLResponse } from "../../node_modules/graphql-request/src/types";
import graphqlRequestClient from "../lib/clients/graphqlRequestClient";
import User from "../lib/interfaces/user";
import { useQuery } from "@tanstack/react-query";

const getUsers = gql`
  query GetUsers {
    users {
      firstName
      middleName
      lastname
      accountType
      phoneNumber
      username
    }
  }
`;

const GqlrequestQuery: FC = () => {
  const { isLoading, error, data } = useQuery<GraphQLResponse, Error, User[]>(
    ["users"],

    async () => {
      return graphqlRequestClient.request<GraphQLResponse<User[]>>(getUsers);
    }
    // {
    //     select: (response) => response.users,
    // }
  );
  console.log(data);
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return <div>
    {data?.map(data,index) => {}}
  </div>;
};

export default GqlrequestQuery;
