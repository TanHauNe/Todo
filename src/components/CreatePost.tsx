"use client";

import { IPost } from "@/app/types/Post.type";
import InputComponent from "@/common/InputComponent";
import { addPost, cancelEditPost, updatePost } from "@/redux/blog/blogSlice";
import { RootState, useAppDispatch } from "@/redux/store";
import { Button, Form, Select } from "antd";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import styles from "./CreatePost.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "@/utils/schema";

const CreatePost = () => {
  const createPostSchema = schema.pick(["title", "desc"]);
  const dispatch = useAppDispatch();
  const editPost = useSelector((state: RootState) => state.blog.editPost);
  const [showError, setShowError] = useState("");
  let userId = "";

  if (typeof window !== "undefined") {
    userId = localStorage.getItem("user_id") || "";
  }

  const optionsSelect = [
    { value: 1, label: "Chua lam" },
    { value: 2, label: "Dang lam" },
    { value: 3, label: "Da lam" },
  ];

  const form = useForm<IPost>({
    resolver: yupResolver(createPostSchema),
  });
  const { register, control, handleSubmit, formState, setValue } = form;
  const { errors } = formState;

  useEffect(() => {
    setValue("title", editPost?.title || "");
    setValue("desc", editPost?.desc || "");
    setValue("status", editPost?.status || 1);
  }, [editPost, setValue]);

  const onSubmit = (data: IPost) => {
    const postData = {
      title: data.title,
      desc: data.desc,
      status: Number(data.status),
      user_id: userId?.toString(),
    };

    if (editPost) {
      dispatch(
        updatePost({
          postId: editPost._id || "",
          body: postData,
        })
      );
      dispatch(
        updatePost({
          postId: editPost._id || "",
          body: postData,
        })
      );
    } else {
      dispatch(addPost(postData));
    }
  };

  const handleCancelEditPost = () => {
    dispatch(cancelEditPost());
  };

  return (
    <div className={styles.container}>
      <Form
        className={styles.post_form}
        onFinish={handleSubmit(onSubmit)}
        onReset={handleCancelEditPost}
        layout="vertical"
      >
        <Form.Item
          name="title"
          validateStatus={errors.title ? "error" : ""}
          label="Tiêu đề"
          help={errors.title?.message}
        >
          <InputComponent name="title" control={control} />
        </Form.Item>
        <Form.Item
          name="desc"
          validateStatus={errors.desc ? "error" : ""}
          help={errors.desc?.message}
          label="Mô tả"
        >
          <InputComponent name="desc" control={control} />
        </Form.Item>

        <Form.Item name="status" label="Trạng thái">
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <Select
                style={{ width: 120 }}
                options={optionsSelect}
                {...field}
              />
            )}
          />
        </Form.Item>
        {editPost ? (
          <div className={styles.flex_center}>
            <Button htmlType="submit" type="primary">
              Update Post
            </Button>
            <Button htmlType="reset" type="primary">
              Cancel
            </Button>
          </div>
        ) : (
          <Button htmlType="submit" type="primary">
            Upload Post
          </Button>
        )}
      </Form>
    </div>
  );
};

export default CreatePost;
