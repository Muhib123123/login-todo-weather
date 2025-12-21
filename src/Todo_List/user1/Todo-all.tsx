import { useRef, useEffect } from "react";
import SharedLi from "./Shared-li";

type Props = {
  todos: { id: string; value: string; css: number }[];
  completedDeleted: string[];
};

function TodoAll({ todos, completedDeleted }: Props) {
  const ulRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    todos.map((todo) => {
      if (todo.css === 0) {
        if (ulRef.current) {
          ulRef.current.scrollTop = ulRef.current.scrollHeight;
        }
      } else {
        if (ulRef.current) {
          ulRef.current.scrollTop = 0;
        }
      }
    });
  }, [todos]);

  return (
    <ul ref={ulRef}>
      {todos.map((todo) =>
        completedDeleted.includes(todo.id) ? null : todo.value === "" ? null : (
          <SharedLi todo={todo} key={todo.id} />
        )
      )}
    </ul>
  );
}

export default TodoAll;
