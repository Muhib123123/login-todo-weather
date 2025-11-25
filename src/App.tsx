import { useState } from "react";
import "./App.css";
import SignIn from "./SignIn";
import { Route, Routes } from "react-router";
import Lists from "./Lists";
import PostDetails from "./PostDetails";
import { PostContext } from "./Creat-context";

function App() {
  const posts = [
    {
      id: crypto.randomUUID(),
      title: "Post One",
      body: "This is the body of post one",
    },
    {
      id: crypto.randomUUID(),
      title: "Post Two",
      body: "This is the body of post two",
    },
    {
      id: crypto.randomUUID(),
      title: "Post Three",
      body: "This is the body of post three",
    },
  ];
  const [check, setCheck] = useState({
    age: false,
    name: false,
    email: false,
    goodToGo: false,
  });

  return (
    <PostContext.Provider value={{ posts }}>
      <Routes>
        <Route
          path="/"
          element={<SignIn check={check} setCheck={setCheck} />}
        />
        <Route
          path="/lists"
          element={check.goodToGo ? <Lists posts={posts} /> : <h1>Please sign in first</h1>}
        />
        <Route
          path="/lists/posts/:id"
          element={
            check.goodToGo ? <PostDetails /> : <h1>Please sign in first</h1>
          }
        />
      </Routes>
    </PostContext.Provider>
  );
}

export default App;
