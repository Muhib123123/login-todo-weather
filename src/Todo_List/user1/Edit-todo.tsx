import { useState } from "react";
import { useToast } from "../Create-context-todo-toast";
import { useReducerContext } from "./Create-context";

type Props = {
  todo: { id: string; value: string; css: number };
  todos: { id: string; value: string; css: number }[];
  onClose: () => void;
  completedTodos: { id: string; value: string }[];
};

function EditTodo({ todo, onClose, completedTodos }: Props) {
  const { dispatch } = useReducerContext();
  const [newValue, setNewValue] = useState(todo.value);
  const Toast = useToast();
  const handleSave = () => {
    dispatch({ type: "EDIT_TODO", payload: { todo, newValue } });
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
          <button className="item-button-e edit-button-save" onClick={handleSave}>
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
