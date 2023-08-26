import { FC } from "react";
import graphqlRequestClient from "../lib/clients/graphqlRequestClient";
import { GetUsersQuery, useGetUsersQuery } from "../generated/graphql";

const HomePage: FC = () => {
  const { isLoading, error, data } = useGetUsersQuery<GetUsersQuery, Error>(
    graphqlRequestClient,
    {}
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

export default HomePage;
