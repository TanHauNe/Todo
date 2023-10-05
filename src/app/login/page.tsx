"use client";

import { RootState } from "@/redux/store";
import { DevTool } from "@hookform/devtools";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { User } from "../types/register.type";
import { registerUser } from "../../redux/user/userSlice";
import { postUser } from "@/utils/http";
import { Input } from "antd";

const Register = () => {
  const dispatch = useDispatch();
  const [showError, setShowError] = useState("");

  const form = useForm<User>({
    defaultValues: {
      email: "",
      fullName: "",
      urlImg: "",
      password: "",
    },
  });

  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;

  const onSubmit = (data: User) => {
    const postData = {
      email: data.email,
      full_name: data.fullName,
      url_img: data.urlImg,
      password: data.password,
    };

    postUser(postData)
      .then((response) => {
        console.log("Dữ liệu trả về:", response.data);
      })
      .catch((error) => {
        console.error("Lỗi:", error.response.data.errors[0]);
        setShowError(error.response.data.errors[0]);
      });
  };

  return (
    <Container>
 
      <Form action="" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          {...register("email", {
            required: { value: true, message: "Email is required" },
            pattern: {
              value: /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
              message: "Invalid",
            },
            validate: (fieldValue) => {
              return (
                fieldValue !== "hau123@gmail.com" || "Enter a different email"
              );
            },
          })}
        />
        {errors.email?.message}

        <label htmlFor="password">Password</label>
        <input
          type="text"
          id="password"
          {...register("password", {
            required: { value: true, message: "Password is required" },
          })}
        />
        {errors.password?.message}
        <p>{showError}</p>

        <button>Submit</button>
      </Form>
    </Container>
  );
};

export default Register;

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
