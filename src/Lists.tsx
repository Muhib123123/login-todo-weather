import { Link } from "react-router";

export default function Lists({ posts }: { posts: { id: string; title: string; body: string }[] }) {

  return (
        <div className="lists-container">
        <div>
            {posts.map((post) => (
                <Link to={`/lists/posts/${post.id}`} key={post.id} className="post-link">
                    <h2>{post.title}</h2>
                </Link>
            ))}
        </div>
        </div>
  );
}