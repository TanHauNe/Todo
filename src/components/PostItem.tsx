import { Post } from "@/app/types/Post.type";
import { Button, Card } from "antd";
import { styled } from "styled-components";

interface PostItemType {
  post: Post;
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
      <div>
        <p>{post.desc}</p>
      </div>
      <ButtonGroup>
        <Button onClick={() => handleStartEditPost(post._id)} type="primary">
          Edit
        </Button>
        <Button onClick={() => handleDelete(post._id)} type="primary">
          Delete
        </Button>
      </ButtonGroup>
    </Card>
  );
};

export default PostItem;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 20px;
`;
