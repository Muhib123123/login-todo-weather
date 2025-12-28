import { Link } from "react-router";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { multi } from "../features/calc/calcSlice";
import { type RootState } from "../app/store";
import LinksPages from "../shared-links-pages";

type props = {
  posts: { id: string; title: string; body: string }[];
  setEmailWithName: React.Dispatch<
    React.SetStateAction<{ name: string; email: string | null }>
  >;
  setCheck: React.Dispatch<
    React.SetStateAction<{
      age: boolean;
      name: boolean;
      email: boolean;
      goodToGo: boolean;
    }>
  >;
  checkPage: string;
  setCheckPage: React.Dispatch<React.SetStateAction<string>>;
};

export default function Lists({ posts, setEmailWithName, setCheck, checkPage, setCheckPage }: props) {
  const [firstNum, setFirstNum] = useState<string>("");
  const [secondNum, setSecondNum] = useState<string>("");
  const dispatch = useDispatch();
  const value = useSelector((state: RootState) => state.multi.value);

  useEffect(() => {
    setCheckPage("posts");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <>
      <title>posts</title>
      <LinksPages checkPage={checkPage} />      
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
        <div
          className="logout"
          style={{
            width: "60%",
            margin: "20px auto",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Link to="/">
            <button
              onClick={() => {
                setCheck({
                  age: false,
                  name: false,
                  email: false,
                  goodToGo: false,
                });
                localStorage.removeItem("email");
                setEmailWithName({
                  name: "",
                  email: null,
                });
              }}
            >
              Log out
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
