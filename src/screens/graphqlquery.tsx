import { gql } from "graphql-request";
import { FC } from "react";
import graphqlRequestClient from "../lib/clients/graphqlRequestClient";
import { useQuery } from "@tanstack/react-query";
import { User } from "../lib/interfaces/user";

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
  const { isLoading, error, data } = useQuery<{ users: User[] }, Error>(
    ["users"],
    async () => {
      const response = await graphqlRequestClient.request<{ users: User[] }>(
        getUsers
      );
      return response;
    }
  );

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <ul>
      {data.users.map((user, index) => (
        <li key={index}>
          <p>
            Name: {user.firstName} {user.middleName} {user.lastname}
          </p>
          <p>Account Type: {user.accountType}</p>
          <p>Phone Number: {user.phoneNumber}</p>
          <p>Username: {user.username}</p>
        </li>
      ))}
    </ul>
  );
};

export default GqlrequestQuery;
