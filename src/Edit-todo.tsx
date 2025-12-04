import { useState } from "react";
type Props = {
  todo: { id: string; value: string; css: number };
  setTodos: React.Dispatch<
    React.SetStateAction<{ id: string; value: string; css: number }[]>
  >;
  onClose: () => void;
  completedTodos: { id: string; value: string }[];
};

function EditTodo({ todo, setTodos, onClose, completedTodos }: Props) {
  const [newValue, setNewValue] = useState(todo.value);
  const handleSave = () => {
    setTodos((prevTodos) =>
      prevTodos.map((t) => (t.id === todo.id ? { ...t, value: newValue } : t))
    );
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
