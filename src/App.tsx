import { useState } from "react";
import "./App.css";
import SignIn from "./SignIn";
import { Route, Routes } from "react-router";
import Lists from "./Lists";
import PostDetails from "./PostDetails";
import { PostContext } from "./Creat-context";
import Todo from "./Todo";

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
        <Route path="/lists">
          <Route
            index
            element={
              check.goodToGo ? (
                <Lists posts={posts} />
              ) : (
                <h1>Please sign in first</h1>
              )
            }
          />
          <Route
            path="posts/:id"
            element={
              check.goodToGo ? <PostDetails /> : <h1>Please sign in first</h1>
            }
          />
        </Route>
        <Route path="/todo" element={check.goodToGo ? <Todo /> : <h1>Please sign in first</h1>} />
        <Route path="*" element={<h1>404 Page not found</h1>} />
      </Routes>
    </PostContext.Provider>
  );
}

export default App;
