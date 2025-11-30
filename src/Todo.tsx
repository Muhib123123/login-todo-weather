import "./Todo.css";
import { useState } from "react";
import EditTodo from "./Edit-todo";
function Todo() {
  const [todos, setTodos] = useState<{ id: string; value: string }[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [completedTodos, setCompletedTodos] = useState<string[]>([]);

  const handleAddTodo = () => {
    if (inputValue.trim() !== "") {
      setTodos([
        ...todos,
        { id: crypto.randomUUID(), value: inputValue.trim() },
      ]);
      setInputValue("");
    }
  };

  const handleClickDone = (id: string) => {
    setCompletedTodos([...completedTodos, id]);
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
            
          <li key={todo.id} >
            {editingId === todo.id ? (
              <EditTodo
                todo={todo}
                setTodos={setTodos}
                onClose={() => setEditingId(null)}
                completedTodos={completedTodos}
              />
            ) : (
              <>
                {todo.value && <span className={completedTodos.includes(todo.id) ? "completed" : ""}>{todo.value}</span>}
                <button className="item-button-done" onClick={() => handleClickDone(todo.id)} disabled={completedTodos.includes(todo.id)}>Done</button>
                <button
                  className="item-button-e"
                  disabled={completedTodos.includes(todo.id)}
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
