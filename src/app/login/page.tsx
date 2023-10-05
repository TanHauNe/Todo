"use client";

import InputComponent from "@/common/InputComponent";
import { yupResolver } from "@hookform/resolvers/yup";
import { RootState, useAppDispatch } from "@/redux/store";
import { Button, Form } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { ILogin } from "../types/User.type";
import styles from "./page.module.css";
import { loginUser } from "@/redux/user/userSlice";
import { schema } from "@/utils/schema";

const Login = () => {
  const loginSchema = schema.pick(["email", "password"]);
  const dispatch = useAppDispatch();
  const [showError, setShowError] = useState("");
  const user = useSelector((state: RootState) => state.user);
  const token = user.auth.access_token;

  const route = useRouter();
  const form = useForm<ILogin>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(loginSchema),
  });

  useEffect(() => {
    if (user.auth?.access_token) {
      route.push("/blog");
    }
  }, [token]);

  const { control, handleSubmit, formState } = form;
  const { errors } = formState;

  const onSubmit = (data: ILogin) => {
    const postData = {
      email: data.email,
      password: data.password,
    };

    dispatch(loginUser(postData));
  };

  return (
    <div className={styles.container}>
      <Form
        onFinish={handleSubmit(onSubmit)}
        className={styles.login_form}
        layout="vertical"
      >
        <Form.Item
          name="email"
          validateStatus={errors.email ? "error" : ""}
          help={errors.email?.message}
          label="Email"
        >
          <InputComponent placeholder="Email" name="email" control={control} />
        </Form.Item>

        <Form.Item
          name="password"
          validateStatus={errors.password ? "error" : ""}
          help={errors.password?.message}
          label="Password"
        >
          <InputComponent
            name="password"
            placeholder="Password"
            control={control}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
