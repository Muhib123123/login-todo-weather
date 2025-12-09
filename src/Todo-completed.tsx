import { useRef, useEffect } from "react";

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
  useEffect(() => {
    const storedCompletedTodos = localStorage.getItem("completedTodos");
    if (storedCompletedTodos) {
      setCompletedTodos(JSON.parse(storedCompletedTodos));
    }
    const storedCompletedDeleted = localStorage.getItem("completedDeleted");
    if (storedCompletedDeleted) {
      setCompletedDeleted(JSON.parse(storedCompletedDeleted));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
                onClick={() => {
                  const liElement = liRefs.current[todo.id];
                  if (liElement) {
                    liElement.classList.add("li-deleted");
                    setTimeout(() => {
                      const id = [...completedDeleted, todo.id];
                      setCompletedDeleted(id);
                      localStorage.setItem(
                        "completedDeleted",
                        JSON.stringify(id)
                      );
                      const prev = [...completedTodos];
                      setCompletedTodos((prev) =>
                        prev.filter((t) => t.id !== todo.id)
                      );
                      localStorage.setItem(
                        "completedTodos",
                        JSON.stringify(prev.filter((t) => t.id !== todo.id))
                      );
                    }, 230);
                  }
                }}
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
