"use client";

import { RootState } from "@/redux/store";
import { postUser } from "@/utils/http";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { User } from "../types/register.type";

const Register = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.userList);
  const [showError, setShowError] = useState("");
  console.log(user);

  const route = useRouter();
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
        route.push("/login");
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

        <label htmlFor="fullName">Full name</label>
        <input
          type="text"
          id="fullName"
          {...register("fullName", {
            required: { value: true, message: "Full name is required" },
          })}
        />
        {errors.fullName?.message}

        <label htmlFor="urlImg">Url image</label>
        <input
          type="text"
          id="urlImg"
          {...register("urlImg", {
            required: { value: true, message: "Url image is required" },
          })}
        />
        {errors.urlImg?.message}

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
