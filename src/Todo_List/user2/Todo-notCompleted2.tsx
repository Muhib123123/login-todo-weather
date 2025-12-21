import { useRef, useEffect } from "react";
import SharedLi2 from "./Shared-li2";
type Props = {
  todos: { id: string; value: string; css: number }[];
  completedTodos: { id: string; value: string }[];
  completedDeleted: string[];
};

function TodoNotCompleted({ todos, completedTodos, completedDeleted }: Props) {
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
  });

  return (
    <ul ref={ulRef}>
      {todos.map((todo) =>
        todo.value &&
        completedDeleted.includes(todo.id) ? null : completedTodos.some(
            (c) => c.id === todo.id
          ) ? null : (
          <SharedLi2 todo={todo} key={todo.id} />
        )
      )}
    </ul>
  );
}

export default TodoNotCompleted;
