import { useContext } from "react";
import { PostContext } from "./Creat-context";
import { useParams } from "react-router";

function PostDetails() {
  const { posts } = useContext(PostContext);
  const { id } = useParams<{ id: string }>();
  console.log(id);
  const post = posts.find((p) => p.id === id);
  return (
    <div>
      <h2>{post?.title}</h2>
      <p>{post?.body}</p>
    </div>
  );
}

export default PostDetails;
