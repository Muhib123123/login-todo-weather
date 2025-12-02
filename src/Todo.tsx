import "./Todo.css";
import { useState } from "react";
import TodoAll from "./Todo-all";
import TodoCompleted from "./Todo-completed";
import TodoNotCompleted from "./Todo-notCompleted";
function Todo() {
  const [todos, setTodos] = useState<{ id: string; value: string }[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [completedTodos, setCompletedTodos] = useState<
    { id: string; value: string }[]
  >([]);
  const [check, setCheck] = useState({
    all: true,
    completed: false,
    notCompleted: false,
  });
  const [completedDeleted, setCompletedDeleted] = useState<string[]>([]);

  const handleAddTodo = () => {
    if (inputValue.trim() !== "") {
      setTodos([
        ...todos,
        { id: crypto.randomUUID(), value: inputValue.trim() },
      ]);
      setInputValue("");
    }
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
          maxLength={25}
        />
        <button className="add-button" onClick={handleAddTodo}>
          Add Task
        </button>
      </div>

      <div className="shared-div2">
        <button
          onClick={() =>
            setCheck({
              ...check,
              all: true,
              completed: false,
              notCompleted: false,
            })
          }
        >
          All
        </button>

        <button
          onClick={() =>
            setCheck({
              ...check,
              completed: true,
              all: false,
              notCompleted: false,
            })
          }
        >
          Completed
        </button>

        <button
          onClick={() =>
            setCheck({
              ...check,
              notCompleted: true,
              all: false,
              completed: false,
            })
          }
        >
          Not Completed
        </button>
      </div>

      {check.all && (
        <TodoAll
          todos={todos}
          setTodos={setTodos}
          editingId={editingId}
          setEditingId={setEditingId}
          completedTodos={completedTodos}
          setCompletedTodos={setCompletedTodos}
          completedDeleted={completedDeleted}
          setCompletedDeleted={setCompletedDeleted}
        />
      )}

      {check.completed && (
        <TodoCompleted
          completedTodos={completedTodos}
          setCompletedTodos={setCompletedTodos}
          completedDeleted={completedDeleted}
          setCompletedDeleted={setCompletedDeleted}
        />
      )}

      {check.notCompleted && (
        <TodoNotCompleted
          todos={todos}
          setTodos={setTodos}
          editingId={editingId}
          setEditingId={setEditingId}
          completedTodos={completedTodos}
          setCompletedTodos={setCompletedTodos}
          completedDeleted={completedDeleted}
          setCompletedDeleted={setCompletedDeleted}
        />
      )}
    </div>
  );
}

export default Todo;
