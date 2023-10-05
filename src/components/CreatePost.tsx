"use client";

import { Post } from "@/app/types/Post.type";
import {
  addPost,
  cancelEditPost,
  getPostList,
  updatePost,
} from "@/redux/blog/blogSlice";
import { RootState, useAppDispatch } from "@/redux/store";
import { getData, postUser } from "@/utils/http";
import { Button, Input, Select } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

const CreatePost = () => {
  const dispatch = useAppDispatch();
  const user = useSelector((state: RootState) => state.user.userList);
  const editPost = useSelector((state: RootState) => state.blog.editPost);
  const [showError, setShowError] = useState("");
  console.log("editPost", editPost);
  const route = useRouter();

  const form = useForm<Post>();
  const { register, control, handleSubmit, formState, setValue } = form;
  const { errors } = formState;

  useEffect(() => {
    setValue("title", editPost?.title || "");
    setValue("desc", editPost?.desc || "");
    setValue("status", editPost?.status || 1);
  }, [editPost, setValue]);

  const onSubmit = (data: Post) => {
    console.log(data);
    const postData = {
      title: data.title,
      desc: data.desc,
      status: Number(data.status),
      user_id: "651bb9f4403915aaf5f0bf17",
    };

    if (editPost) {
      dispatch(
        updatePost({
          postId: editPost._id,
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
    <Container>
      <Form
        action=""
        onSubmit={handleSubmit(onSubmit)}
        onReset={handleCancelEditPost}
      >
        <div>
          <label>Tiêu đề</label>
          <Controller
            name="title"
            control={control}
            render={({ field }) => <Input {...field} />}
          />
        </div>
        <div>
          <label>Mô tả</label>
          <Controller
            name="desc"
            control={control}
            render={({ field }) => <Input {...field} />}
          />
        </div>
        <Status>
          <label>Trạng thái</label>
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              // <select {...field}>
              //   <option value={1}>Chua lam</option>
              //   <option value={2}>Dang lam</option>
              //   <option value={3}>Da lam</option>
              // </select>
              <Select
                defaultValue="lucy"
                style={{ width: 120 }}
                // onChange={handleChange}
                options={[
                  { value: "1", label: "1" },
                  { value: "2", label: "2" },
                  { value: "3", label: "3" },
                ]}
                {...field}
              />
            )}
          />
        </Status>

        {editPost ? (
          <Status>
            <Button htmlType="submit" type="primary">
              Update Post
            </Button>
            <Button htmlType="reset" type="primary">
              Cancel
            </Button>
          </Status>
        ) : (
          <Button htmlType="submit" type="primary">
            Upload Post
          </Button>
        )}
      </Form>
    </Container>
  );
};

export default CreatePost;

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Form = styled.form`
  display: flex;
  gap: 10px;
  flex-direction: column;
`;

const Status = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
