import "./Todo.css";
import { useState } from "react";
import TodoAll from "./Todo-all";
import TodoCompleted from "./Todo-completed";
import TodoNotCompleted from "./Todo-notCompleted";
import Search from "./Search";
import { TodoContext } from "./Create-context";
import { useToast } from "../Create-context-todo-toast";
import { useReducerContext } from "./Create-context";

function Todo() {
  const { todos, dispatch } = useReducerContext();
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
    dispatch({ type: "ADD_TODO", payload: { inputValue: inputValue } });
    if (inputValue.trim() !== "") {
      setInputValue("");
      Toast?.handleToastContext("Todo added successfully");
    }
  };

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
    editingId: editingId,
    setEditingId: setEditingId,
    completedTodos: completedTodos,
    setCompletedTodos: setCompletedTodos,
    setCompletedDeleted: setCompletedDeleted,
    todos: todos,
    completedDeleted: completedDeleted,
  };

  return (
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
      <TodoContext.Provider value={LiValue}>
        {check.all && search.value === "" && (
          <TodoAll todos={todos} completedDeleted={completedDeleted} />
        )}

        {search.value && (
          <Search
            search={search}
            todos={todos}
            completedDeleted={completedDeleted}
          />
        )}

        {check.completed && search.value === "" && (
          <TodoCompleted
            completedTodos={completedTodos}
            setCompletedTodos={setCompletedTodos}
            completedDeleted={completedDeleted}
            setCompletedDeleted={setCompletedDeleted}
          />
        )}

        {check.notCompleted && search.value === "" && (
          <TodoNotCompleted
            todos={todos}
            completedTodos={completedTodos}
            completedDeleted={completedDeleted}
          />
        )}
      </TodoContext.Provider>
    </div>
  );
}

export default Todo;
