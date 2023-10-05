import React, { useEffect } from "react";
import { RootState, useAppDispatch } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import PostItem from "./PostItem";
import { deletePost, getPostList, startEditPost } from "@/redux/blog/blogSlice";
import { getData } from "@/utils/http";
import styled from "styled-components";

const PostList = () => {
  const postList = useSelector((state: RootState) => state.blog.postList);
  console.log(postList);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getPostList());
  }, [dispatch]);

  const handleDelete = (postId: string) => {
    const updatedPostList = postList.filter((post) => post._id !== postId);
    dispatch(deletePost(postId));
  };

  const handleStartEditPost = (postId: string) => {
    dispatch(startEditPost(postId));
  };

  return (
    <Container>
      {postList.map((post) => (
        <PostItem
          post={post}
          key={post?._id}
          handleDelete={handleDelete}
          handleStartEditPost={handleStartEditPost}
        />
      ))}
    </Container>
  );
};

export default PostList;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 20px;
`;
