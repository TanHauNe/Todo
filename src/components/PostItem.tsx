import { IPost } from "@/app/types/Post.type";
import { Button, Card } from "antd";
import styles from "./PostItem.module.css";

interface PostItemType {
  post: IPost;
  handleDelete: (postId: string) => void;
  handleStartEditPost: (postId: string) => void;
}

const PostItem = ({
  post,
  handleDelete,
  handleStartEditPost,
}: PostItemType) => {
  return (
    <Card bordered={false} title={post?.title} hoverable style={{ width: 600 }}>
      <p>{post.desc}</p>
      <div className={styles.button_group}>
        <Button
          onClick={() => handleStartEditPost(post._id || "")}
          type="primary"
        >
          Edit
        </Button>
        <Button onClick={() => handleDelete(post._id || "")} type="primary">
          Delete
        </Button>
      </div>
    </Card>
  );
};

export default PostItem;
