import { useRef } from "react";
import { useToast } from "../Create-context-todo-toast";
type Props = {
  completedTodos: { id: string; value: string }[];
  setCompletedTodos: React.Dispatch<
    React.SetStateAction<{ id: string; value: string }[]>
  >; // changed
  setCompletedDeleted: React.Dispatch<React.SetStateAction<string[]>>;
  completedDeleted: string[];
};

function TodoCompleted({
  completedTodos,
  setCompletedTodos,
  setCompletedDeleted,
  completedDeleted,
}: Props) {
  const Toast = useToast();
  const handleDeleted = (todo: { id: string; value: string }) => {
    const liElement = liRefs.current[todo.id];
    Toast?.handleToastContext("Todo deleted successfully");
    if (liElement) {
      liElement.classList.add("li-deleted");
      setTimeout(() => {
        const id = [...completedDeleted, todo.id];
        setCompletedDeleted(id);
        const prev = [...completedTodos];
        setCompletedTodos((prev) => prev.filter((t) => t.id !== todo.id));
        localStorage.setItem(
          "completedTodos",
          JSON.stringify(prev.filter((t) => t.id !== todo.id))
        );
      }, 230);
    }
  };
  const liRefs = useRef<{ [key: string]: HTMLLIElement | null }>({});
  return (
    <ul>
      {completedTodos.map((todo) =>
        completedDeleted.includes(todo.id) ? null : (
          <li
            key={todo.id}
            className="li-animation"
            ref={(el) => {
              if (el) {
                liRefs.current[todo.id] = el;
              }
            }}
          >
            <span>{todo.value}</span>
            <div>
              <button
                className="item-button-d"
                onClick={() => handleDeleted(todo)}
              >
                Delete
              </button>
            </div>
          </li>
        )
      )}
    </ul>
  );
}

export default TodoCompleted;
