"use client";

import { IPost } from "@/app/types/Post.type";
import { addPost, cancelEditPost, updatePost } from "@/redux/blog/blogSlice";
import { RootState, useAppDispatch } from "@/redux/store";
import { Button, Input, Select } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import styles from "./CreatePost.module.css";
import InputComponent from "@/common/InputComponent";

const CreatePost = () => {
  const dispatch = useAppDispatch();
  const editPost = useSelector((state: RootState) => state.blog.editPost);
  const [showError, setShowError] = useState("");
  let userId = "";

  if (typeof window !== "undefined") {
    userId = localStorage.getItem("user_id") || "";
  }

  const optionsSelect = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
  ];

  const form = useForm<IPost>();
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
      <form
        className={styles.post_form}
        onSubmit={handleSubmit(onSubmit)}
        onReset={handleCancelEditPost}
      >
        <InputComponent name="title" control={control} label="Tiêu đề" />
        <InputComponent name="desc" control={control} label="Mô tả" />
        <div className={styles.flex_center}>
          <label>Trạng thái</label>
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
        </div>

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
      </form>
    </div>
  );
};

export default CreatePost;
