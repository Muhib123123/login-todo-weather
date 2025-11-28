import "./Todo.css";
import { useState } from "react";
import EditTodo from "./Edit-todo";
function Todo() {
  const [todos, setTodos] = useState<{ id: string; value: string }[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

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
          maxLength={30}
        />
        <button className="add-button" onClick={handleAddTodo}>
          Add Todo
        </button>
      </div>
      <ul>
        {todos.map((todo) => todo.value && (
            
          <li key={todo.id}>
            {editingId === todo.id ? (
              <EditTodo
                todo={todo}
                setTodos={setTodos}
                onClose={() => setEditingId(null)}
              />
            ) : (
              <>
                {todo.value}
                <button
                  className="item-button-e"
                  onClick={() => setEditingId(todo.id)}
                >
                  Edit
                </button>
                <button
                  className="item-button-d"
                  onClick={() =>
                    setTodos(todos.filter((t) => t.id !== todo.id))
                  }
                >
                  Delete
                </button>
              </>
            ) }
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todo;
