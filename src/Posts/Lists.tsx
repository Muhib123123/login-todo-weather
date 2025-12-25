import { Link } from "react-router";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { multi } from "../features/search/searchSlice";
import { type RootState } from "../app/store";

export default function Lists({
  posts,
}: {
  posts: { id: string; title: string; body: string }[];
}) {
  const [firstNum, setFirstNum] = useState<string>("");
  const [secondNum, setSecondNum] = useState<string>("");
  const dispatch = useDispatch();
  const value = useSelector((state: RootState) => state.multi.value);

  return (
    <div className="lists-container">
      {posts.map((post) => (
        <Link to={`/posts/${post.id}`} key={post.id}>
          <h2 className="post-title">{post.title}</h2>
        </Link>
      ))}
      <div className="calc-container">
        <input
          type="number"
          value={firstNum}
          onChange={(e) => setFirstNum(e.target.value)}
        />
        <input
          type="number"
          value={secondNum}
          onChange={(e) => setSecondNum(e.target.value)}
        />
        <button
          onClick={() => {
            dispatch(
              multi({
                firstNum: Number(firstNum),
                secondNum: Number(secondNum),
              })
            );
            setFirstNum("");
            setSecondNum("");
          }}
        >
          multi
        </button>
        <p>{value}</p>
      </div>
    </div>
  );
}
