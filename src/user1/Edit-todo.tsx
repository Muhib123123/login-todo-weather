import { useState } from "react";
import { useToast } from "../Create-context-todo-toast";
type Props = {
  todo: { id: string; value: string; css: number };
  todos: { id: string; value: string; css: number }[];
  setTodos: React.Dispatch<
    React.SetStateAction<{ id: string; value: string; css: number }[]>
  >;
  onClose: () => void;
  completedTodos: { id: string; value: string }[];
};

function EditTodo({ todo, setTodos, onClose, completedTodos, todos }: Props) {
  const [newValue, setNewValue] = useState(todo.value);
  const Toast = useToast();
  const handleSave = () => {
    const updatedTodos = todos.map((t) =>
      t.id === todo.id ? { ...t, value: newValue } : t
    );
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    Toast?.handleToastContext("Todo edited successfully");
    onClose();
  };

  return (
    <>
      {completedTodos.some((c) => c.id === todo.id) ? null : (
        <div>
          <input
            type="text"
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            maxLength={30}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSave();
            }}
          />
          <button className="item-button-e" onClick={handleSave}>
            Save
          </button>
          <button className="item-button-d" onClick={onClose}>
            Cancel
          </button>
        </div>
      )}
    </>
  );
}

export default EditTodo;
