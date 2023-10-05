"use client";

import CreatePost from "@/components/CreatePost";
import PostList from "@/components/PostList";
import { styled } from "styled-components";

const Todo = () => {
  return (
    <Container>
      <CreatePost />
      <PostList />
    </Container>
  );
};

export default Todo;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const Body = styled.body`
  background-color: #ecdddd;
`;
