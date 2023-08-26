import { FC, useState } from "react";
import CustomInputText from "../lib/components/InputText";
import CustomButton from "../lib/components/custom-button";
import {
  LoginUserInputMutation,
  useLoginUserInputMutation,
} from "../generated/graphql";
import graphqlRequestClient from "../lib/clients/graphqlRequestClient";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const LoginPage: FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const queryClient = useQueryClient();

  const { mutate } = useLoginUserInputMutation(graphqlRequestClient, {
    onSuccess: (data: LoginUserInputMutation) => {
      queryClient.invalidateQueries(["LoginUserInput"]);
      return console.log("mutation data", data);
    },
  });

  const handleUsername = (username: string) => {
    setUsername(username);
  };

  const handlePassword = (password: string) => {
    setPassword(password);
  };

  const handleOnClick = () => {
    mutate({
      input: {
        username: username,
        password: password,
      },
    });
  };

  const handleOnRegisterClick = () => {
    navigate("/register");
  };

  return (
    <div style={styles.body}>
      <div style={styles.card}>
        <h1 style={styles.h1}>Login</h1>
        <CustomInputText
          type={"text"}
          borderRadius={5}
          border={"1px solid #0041C2"}
          padding={6}
          width={"50%"}
          placeholder={"username or email"}
          onChange={handleUsername}
        />
        <CustomInputText
          type={"password"}
          borderRadius={5}
          border={"1px solid #0041C2"}
          padding={6}
          width={"50%"}
          placeholder={"password"}
          onChange={handlePassword}
        />
        <CustomButton
          name={"Sign In"}
          backgroundColor={"#368BC1"}
          color={"white"}
          width={"30%"}
          height={"4vh"}
          borderRadius={6}
          border={"none"}
          onClick={handleOnClick}
        />
        <div style={styles.register}>
          <CustomButton
            name={"register"}
            backgroundColor={"transparent"}
            color={"black"}
            width={""}
            height={""}
            borderRadius={0}
            border={"none"}
            onClick={handleOnRegisterClick}
          />
        </div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  body: {
    backgroundColor: "white",
    width: "100%",
    height: "100vh",
    alignContent: "center",
    justifyContent: "center",
    display: "flex",
    alignItems: "center",
    flex: 1,
  },
  register: {
    width: "50%",
    alignItems: "flex-end",
    display: "flex",
    flexDirection: "row",
    justifyContent: "end",
    border: "none",
  },
  card: {
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    width: "50%",
    padding: 5,
    paddingBottom: 20,
    display: "flex",
    gap: 5,
  },
  h1: {
    color: "#0041C2",
    fontFamily: "sans-serif",
  },
};

export default LoginPage;
