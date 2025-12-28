import "./Todo2.css";
import { useState, useEffect } from "react";
import TodoAll2 from "./Todo-all2";
import TodoCompleted2 from "./Todo-completed2";
import TodoNotCompleted2 from "./Todo-notCompleted2";
import Search2 from "./Search2";
import { TodoContext2 } from "./Create-context2";
import { useToast } from "../Create-context-todo-toast";
import { Link } from "react-router";
import LinksPages from "../../shared-links-pages";

type TodoProps2 = {
  setEmailWithName: React.Dispatch<
    React.SetStateAction<{ name: string; email: string | null }>
  >;
  setCheck2: React.Dispatch<
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

function Todo2({ setEmailWithName, setCheck2, checkPage, setCheckPage}: TodoProps2) {
  const [todos, setTodos] = useState<
    { id: string; value: string; css: number }[]
  >([]);
  const [inputValue, setInputValue] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [completedTodos, setCompletedTodos] = useState<
    { id: string; value: string }[]
  >([]);
  const [search, setSearch] = useState<{ value: string; notFound: boolean }>({
    value: "",
    notFound: false,
  });
  const [check, setCheck] = useState({
    all: true,
    completed: false,
    notCompleted: false,
  });
  const [completedDeleted, setCompletedDeleted] = useState<string[]>([]);
  const Toast = useToast();

  const handleAddTodo = () => {
    if (inputValue.trim() !== "") {
      const todo = [
        ...todos,
        { id: crypto.randomUUID(), value: inputValue.trim(), css: 0 },
      ];
      setTodos(todo);
      localStorage.setItem("todos2", JSON.stringify(todo));
      setInputValue("");
      Toast?.handleToastContext("Todo added successfully");
    }
  };

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos2");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
    setCheckPage("todo2")
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const found =
      value.trim() === ""
        ? false
        : todos.some((todo) =>
            todo.value.toLowerCase().includes(value.toLowerCase())
          );
    setSearch({ value: value, notFound: !found });
  };

  const LiValue = {
    setTodos: setTodos,
    editingId: editingId,
    setEditingId: setEditingId,
    completedTodos: completedTodos,
    setCompletedTodos: setCompletedTodos,
    setCompletedDeleted: setCompletedDeleted,
    todos: todos,
    completedDeleted: completedDeleted,
  };

  return (
    <>
      <title>todo2</title>
      <LinksPages checkPage={checkPage}/>
      <div className="todo-container">
        <div className="shared-div">
          <h1>Todo List</h1>
        </div>
        <div className="shared-div">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAddTodo();
            }}
            className="shared-input-todo"
            maxLength={35}
          />
          <button className="add-button" onClick={handleAddTodo}>
            Add Task
          </button>
        </div>
        <div className="search-div">
          <input
            type="text"
            value={search.value}
            onChange={(e) => handleSearch(e)}
            placeholder="Search"
            className="shared-input-todo"
            maxLength={35}
          />
        </div>
        <div className="shared-div2">
          <button
            onClick={() => {
              setCheck({
                ...check,
                all: true,
                completed: false,
                notCompleted: false,
              });
              todos.map((todo) => (todo.css = 1));
              setSearch({ value: "", notFound: false });
            }}
          >
            All
          </button>

          <button
            onClick={() => {
              setCheck({
                ...check,
                completed: true,
                all: false,
                notCompleted: false,
              });
              todos.map((todo) => (todo.css = 1));
              setSearch({ value: "", notFound: false });
            }}
          >
            Completed
          </button>

          <button
            onClick={() => {
              setCheck({
                ...check,
                notCompleted: true,
                all: false,
                completed: false,
              });
              todos.map((todo) => (todo.css = 1));
              setSearch({ value: "", notFound: false });
            }}
          >
            Not Completed
          </button>
        </div>
        <TodoContext2.Provider value={LiValue}>
          {check.all && search.value === "" && (
            <TodoAll2 todos={todos} completedDeleted={completedDeleted} />
          )}

          {search.value && (
            <Search2
              search={search}
              todos={todos}
              completedDeleted={completedDeleted}
            />
          )}

          {check.completed && search.value === "" && (
            <TodoCompleted2
              completedTodos={completedTodos}
              setCompletedTodos={setCompletedTodos}
              completedDeleted={completedDeleted}
              setCompletedDeleted={setCompletedDeleted}
            />
          )}

          {check.notCompleted && search.value === "" && (
            <TodoNotCompleted2
              todos={todos}
              completedTodos={completedTodos}
              completedDeleted={completedDeleted}
            />
          )}
          <div className="logout-todo">
            <Link to="/">
              <button
                onClick={() => {
                  setCheck2({
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
        </TodoContext2.Provider>
      </div>
    </>
  );
}

export default Todo2;
