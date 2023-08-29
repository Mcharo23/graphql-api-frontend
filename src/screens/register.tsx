import React, { FC, useState } from "react";
import CustomInputText from "../lib/components/InputText";
import CustomButton from "../lib/components/custom-button";
import { useNavigate } from "react-router-dom";
import RadioButton from "../lib/components/radio-button";
import { AccountType, Gender } from "../lib/enums/gender";
import {
  CreateUserInputMutation,
  useCreateUserInputMutation,
} from "../generated/graphql";
import graphqlRequestClient from "../lib/clients/graphqlRequestClient";
import { useQueryClient } from "@tanstack/react-query";
import { GraphQLError } from "graphql";

const RegisterPage: FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleNAme] = useState("");
  const [lastname, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [accountType, setAccountType] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [graphQLError, setGraphQLError] = useState<string | null>(null);

  // const { mutate } = useCreateUserInputMutation(graphqlRequestClient, {
  //   onSuccess: (data: CreateUserInputMutation) => {
  //     queryClient.invalidateQueries(["createUserInput"]);
  //     return console.log("mutation data", data);
  //   },
  //   onError(error: GraphQLError) {

  //     // console.log(" graphql error => ",error.response.message);
  //     console.log(" graphql error => ",error);
  //   },
  // });

  const { mutate } = useCreateUserInputMutation(graphqlRequestClient, {
    onSuccess: (data: CreateUserInputMutation) => {
      queryClient.invalidateQueries(["createUserInput"]);
      return console.log("mutation data", data);
    },
    onError: (error: GraphQLError) => {
      const errorMessage = Array.isArray(
        error.response.errors[0].message.message
      )
        ? error.response.errors[0].message.message.join(", ")
        : error.response.errors[0].message.message;

      setGraphQLError(errorMessage);
    },
  });

  const handleFirstNameInput = (firstName: string) => {
    setFirstName(firstName);
  };

  const handleMiddleNameInput = (middleName: string) => {
    setMiddleNAme(middleName);
  };

  const handleLastNameInput = (lastName: string) => {
    setLastName(lastName);
  };

  const handleGenderInput = (gender: string) => {
    setGender(gender);
  };

  const handlePhoneInput = (phone: string) => {
    setPhoneNumber(phone);
  };

  const handlePasswordInput = (password: string) => {
    setPassword(password);
  };

  const handleAccountTypeInput = (accountType: string) => {
    setAccountType(accountType);
  };

  const handleConfirmPasswordInput = (confirmPassword: string) => {
    setConfirmPassword(confirmPassword);
  };

  const handleEmailInput = (email: string) => {
    setEmail(email);
  };

  const handleOnSubmit = async () => {
    if (
      firstName.length === 0 &&
      middleName.length === 0 &&
      lastname.length === 0 &&
      gender.length === 0 &&
      phoneNumber.length === 0 &&
      email.length === 0 &&
      password.length === 0
    ) {
      alert("All fields are required");
    } else if (password !== confirmPassword) {
      alert("Passwords do not match");
    } else {
      await mutate({
        input: {
          username: email,
          firstName: firstName,
          middleName: middleName,
          lastname: lastname,
          gender: gender,
          phoneNumber: phoneNumber,
          accountType: accountType,
          password: password,
        },
      });
    }
  };

  return (
    <div style={styles.body}>
      <div style={styles.card}>
        <h1 style={styles.h1}>Register</h1>
        <div style={styles.error}>
          {graphQLError && <div>{graphQLError}</div>}
        </div>
        <CustomInputText
          type={"text"}
          borderRadius={5}
          border={"1px solid #0041C2"}
          padding={6}
          width={"50%"}
          placeholder={"First Name"}
          onChange={handleFirstNameInput}
        />
        <CustomInputText
          type={"text"}
          borderRadius={5}
          border={"1px solid #0041C2"}
          padding={6}
          width={"50%"}
          placeholder={"Middle Name"}
          onChange={handleMiddleNameInput}
        />
        <CustomInputText
          type={"text"}
          borderRadius={5}
          border={"1px solid #0041C2"}
          padding={6}
          width={"50%"}
          placeholder={"Last Name"}
          onChange={handleLastNameInput}
        />
        <CustomInputText
          type={"email"}
          borderRadius={5}
          border={"1px solid #0041C2"}
          padding={6}
          width={"50%"}
          placeholder={"email"}
          onChange={handleEmailInput}
        />
        <CustomInputText
          type={"tel"}
          borderRadius={5}
          border={"1px solid #0041C2"}
          padding={6}
          width={"50%"}
          placeholder={"+2557########"}
          onChange={handlePhoneInput}
        />
        <div style={styles.genderDv}>
          <RadioButton
            label={Gender.MALE}
            value={Gender.MALE}
            checked={gender === Gender.MALE}
            onChange={handleGenderInput}
          />
          <RadioButton
            label={Gender.FEMALE}
            value={Gender.FEMALE}
            checked={gender === Gender.FEMALE}
            onChange={handleGenderInput}
          />
        </div>
        <div style={styles.genderDv}>
          <RadioButton
            label={AccountType.OWNER}
            value={AccountType.OWNER}
            checked={accountType === AccountType.OWNER}
            onChange={handleAccountTypeInput}
          />
          <RadioButton
            label={AccountType.TENANT}
            value={AccountType.TENANT}
            checked={accountType === AccountType.TENANT}
            onChange={handleAccountTypeInput}
          />
        </div>
        <CustomInputText
          type={"password"}
          borderRadius={5}
          border={"1px solid #0041C2"}
          padding={6}
          width={"50%"}
          placeholder={"password"}
          onChange={handlePasswordInput}
        />
        <CustomInputText
          type={"password"}
          borderRadius={5}
          border={"1px solid #0041C2"}
          padding={6}
          width={"50%"}
          placeholder={"confirm password"}
          onChange={handleConfirmPasswordInput}
        />
        <CustomButton
          name={"Sign up"}
          backgroundColor={"#368BC1"}
          color={"white"}
          width={"30%"}
          height={"4vh"}
          borderRadius={6}
          border={"none"}
          onClick={handleOnSubmit}
        />
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
  genderDv: {
    display: "flex",
    width: "50%",
    justifyContent: "space-evenly",
  },
  error: {
    color: "red",
    width: "60%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};

export default RegisterPage;
