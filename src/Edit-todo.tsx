import { useState } from "react";
type Props = {
  todo: { id: string; value: string };
  setTodos: React.Dispatch<
    React.SetStateAction<{ id: string; value: string }[]>
  >;
  onClose: () => void;
};

function EditTodo({ todo, setTodos, onClose }: Props) {
  const [newValue, setNewValue] = useState(todo.value);
  const handleSave = () => {
    setTodos((prevTodos) =>
      prevTodos.map((t) => (t.id === todo.id ? { ...t, value: newValue } : t))
    );
    onClose();
  };

  return (
    <div>
      <input
        type="text"
        value={newValue}
        onChange={(e) => setNewValue(e.target.value)}
        maxLength={30}
      />
      <button className="item-button-e" onClick={handleSave}>Save</button>
      <button className="item-button-d" onClick={onClose}>Cancel</button>
    </div>
  );
}

export default EditTodo;
