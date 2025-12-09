import EditTodo from "./Edit-todo";
import { useContext, useEffect } from "react";
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
    completedDeleted,
    todos,
  } = useContext(TodoContext);
  const handleClickDone = (ids: string, values: string) => {
    const completed = [...completedTodos, { id: ids, value: values }];
    setCompletedTodos(completed);
    localStorage.setItem("completedTodos", JSON.stringify(completed));
  };

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

  const delRef = useRef<HTMLLIElement>(null);
  return (
    <li key={todo.id} className="li-animation" ref={delRef}>
      {editingId === todo.id ? (
        <EditTodo
          todo={todo}
          setTodos={setTodos}
          todos={todos}
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
                  const prev = todos.filter((t) => t.id !== todo.id);
                  setTodos(prev);
                  localStorage.setItem("todos", JSON.stringify(prev));
                  const id = [...completedDeleted, todo.id];
                  setCompletedDeleted(id);
                  localStorage.setItem("completedDeleted", JSON.stringify(id));
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
