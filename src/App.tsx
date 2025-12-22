import { useState } from "react";
import "./App.css";


import SignIn from "./Sign_In/SignIn";
import Lists from "./Posts/Lists";
import PostDetails from "./Posts/PostDetails";
import Todo from "./Todo_List/user1/Todo";
import Todo2 from "./Todo_List/user2/Todo2";
import Weather from "./Weather_Api/Weather";

import { Route, Routes } from "react-router";
import { PostContext } from "./Todo_List/user1/Create-context";
import { ToastProvider } from "./Todo_List/Create-context-todo-toast";
import ReducerProvider from "./Todo_List/user1/Create-context";



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

  const [emailWithName, setEmailWithName] = useState({
    name: "",
    email: localStorage.getItem("email"),
  });

  return (
    <PostContext.Provider value={{ posts }}>
      <ToastProvider>
        <ReducerProvider>
          <Routes>
            <Route
              path="/"
              element={
                <SignIn
                  check={check}
                  setCheck={setCheck}
                  setEmailWithName={setEmailWithName}
                  EmailWithName={emailWithName}
                />
              }
            />
            <Route path="/posts">
              <Route
                index
                element={
                  check.goodToGo ? (
                    <Lists posts={posts} />
                  ) : (
                    <h1 className="sign-in-first">Please sign in first</h1>
                  )
                }
              />
              <Route
                path=":id"
                element={
                  check.goodToGo ? (
                    <PostDetails />
                  ) : (
                    <h1 className="sign-in-first">Please sign in first</h1>
                  )
                }
              />
            </Route>

            <Route
              path="/todo"
              element={
                emailWithName.email == "muhib@gmail.com" ? (
                  <Todo />
                ) : (
                  <h1 className="sign-in-first">You have no access</h1>
                )
              }
            />
            <Route
              path="/todo2"
              element={
                emailWithName.email == "muhib2@gmail.com" ? (
                  <Todo2 />
                ) : (
                  <h1 className="sign-in-first">You have no access</h1>
                )
              }
            />
            <Route path="/weather" element={emailWithName.email == "muhib2@gmail.com" || emailWithName.email == "muhib@gmail.com" ? <Weather /> : <h1 className="sign-in-first">Please sign in first</h1>}/>
            <Route path="*" element={<h1>404 Page not found</h1>} />
          </Routes>
        </ReducerProvider>
      </ToastProvider>
    </PostContext.Provider>
  );
}

export default App;
