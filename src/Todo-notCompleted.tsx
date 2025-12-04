import EditTodo from "./Edit-todo";
import { useRef, useEffect } from "react";
type Props = {
  todos: { id: string; value: string; css: number }[];
  setTodos: React.Dispatch<
    React.SetStateAction<{ id: string; value: string; css: number }[]>
  >;
  editingId: string | null;
  setEditingId: React.Dispatch<React.SetStateAction<string | null>>;
  completedTodos: { id: string; value: string }[];
  setCompletedTodos: React.Dispatch<
    React.SetStateAction<{ id: string; value: string }[]>
  >;
  completedDeleted: string[];
  setCompletedDeleted: React.Dispatch<React.SetStateAction<string[]>>;
};

function TodoNotCompleted({
  todos,
  setTodos,
  editingId,
  setEditingId,
  completedTodos,
  setCompletedTodos,
  completedDeleted,
  setCompletedDeleted,
}: Props) {
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
    })
  })
  const handleClickDone = (ids: string, values: string) => {
    setCompletedTodos((prev) => [...prev, { id: ids, value: values }]); 
  };
  return (
    <ul ref={ulRef}>
      {todos.map((todo) =>
        todo.value &&
        completedDeleted.includes(todo.id) ? null : completedTodos.some(
            (c) => c.id === todo.id
          ) ? null : (
          <li key={todo.id} className="li-animation">
            {editingId === todo.id ? (
              <EditTodo
                todo={todo}
                setTodos={setTodos}
                onClose={() => setEditingId(null)}
                completedTodos={completedTodos}
              />
            ) : (
              <>
                {todo.value && (
                  <span
                    className={
                      completedTodos.some((c) => c.id === todo.id)
                        ? "completed"
                        : "" 
                    }
                  >
                    {todo.value}
                  </span>
                )}
                <div>
                  <button
                    className="item-button-done"
                    onClick={() => handleClickDone(todo.id, todo.value)}
                    disabled={completedTodos.some((c) => c.id === todo.id)} 
                  >
                    Done
                  </button>
                  <button
                    className="item-button-e"
                    disabled={completedTodos.some((c) => c.id === todo.id)} 
                    onClick={() => setEditingId(todo.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="item-button-d"
                    onClick={() => {
                      setCompletedDeleted((prev) => [...prev, todo.id]);
                      setTodos(todos.filter((t) => t.id !== todo.id));
                    }}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        )
      )}
    </ul>
  );
}

export default TodoNotCompleted;
