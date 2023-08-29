import { FC, useEffect, useState } from "react";
import graphqlRequestClient from "../lib/clients/graphqlRequestClient";
import { GetUsersQuery, useGetUsersQuery } from "../generated/graphql";
import { getUserData, getUserAccessToken } from "../utils/localStorageUtils";

const HomePage: FC = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [shouldFetchData, setShouldFetchData] = useState(false);

  useEffect(() => {
    const token = getUserAccessToken();
    if (token) {
      setAccessToken(token);
      setShouldFetchData(true);
    }
  }, []);

  const { isLoading, error, data } = useGetUsersQuery<GetUsersQuery, Error>(
    graphqlRequestClient,
    {},
    { enabled: shouldFetchData } // Only fetch when shouldFetchData is true
  );

  useEffect(() => {
    if (data) {
      setShouldFetchData(false); // Disable further fetching
    }
  }, [data]);

  if (isLoading) return <p>Loading...</p>;
  if (error) {
    const errorMessage =
      error.response &&
      error.response.errors &&
      error.response.errors.length > 0
        ? error.response.errors[0].message.message
        : "An error occurred";
    return <p>{errorMessage}</p>;
  }

  return (
    <div>
      <h1>Users</h1>
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
    </div>
  );
};

export default HomePage;
