"use client";

import CreatePost from "@/components/CreatePost";
import PostList from "@/components/PostList";
import styles from "./page.module.css";

const Todo = () => {
  return (
    <div className={styles.container}>
      <CreatePost />
      <PostList />
    </div>
  );
};

export default Todo;
