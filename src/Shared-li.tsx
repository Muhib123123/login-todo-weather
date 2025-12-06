import EditTodo from "./Edit-todo";
import { useContext } from "react";
import { TodoContext } from "./Creat-context";
import { useRef } from "react";
type Props = {
  todo: { id: string; value: string; css: number };
};

function SharedLi({ todo }: Props) {
  const {
    setTodos,
    editingId,
    setEditingId,
    completedTodos,
    setCompletedTodos,
    setCompletedDeleted,
    todos,
  } = useContext(TodoContext);
  const handleClickDone = (ids: string, values: string) => {
    setCompletedTodos((prev) => [...prev, { id: ids, value: values }]);
  };

  const delRef = useRef<HTMLLIElement>(null);
  return (
    <li key={todo.id} className="li-animation" ref={delRef}>
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
                completedTodos.some((c) => c.id === todo.id) ? "completed" : ""
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
                delRef.current?.classList.add("li-deleted");
                setTimeout(() => {
                  setCompletedDeleted((prev) => [...prev, todo.id]);
                  setTodos(todos.filter((t) => t.id !== todo.id));
                }, 280);
              }}
            >
              Delete
            </button>
          </div>
        </>
      )}
    </li>
  );
}

export default SharedLi;
