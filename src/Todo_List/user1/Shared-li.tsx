import EditTodo from "./Edit-todo";
import { useContext, useEffect } from "react";
import { TodoContext } from "./Create-context";
import { useRef } from "react";
import { useToast } from "../Create-context-todo-toast";
import { useReducerContext } from "./Create-context";

type Props = {
  todo: { id: string; value: string; css: number };
};

function SharedLi({ todo }: Props) {
  const { dispatch } = useReducerContext();

  const {
    editingId,
    setEditingId,
    completedTodos,
    setCompletedTodos,
    setCompletedDeleted,
    completedDeleted,
    todos,
  } = useContext(TodoContext);
  const Toast = useToast();
  const handleClickDone = (ids: string, values: string) => {
    const completed = [...completedTodos, { id: ids, value: values }];
    setCompletedTodos(completed);
    localStorage.setItem("completedTodos", JSON.stringify(completed));
    Toast?.handleToastContext("Todo completed successfully");
  };

  const handleDeleted = () => {
    delRef.current?.classList.add("li-deleted");
    setTimeout(() => {
      dispatch({ type: "DELETE_TODO", payload: { todo } });
      const id = [...completedDeleted, todo.id];
      setCompletedDeleted(id);
      localStorage.setItem("completedDeleted", JSON.stringify(id));
      Toast?.handleToastContext("Todo deleted successfully");
    }, 280);
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
            <button className="item-button-d" onClick={() => handleDeleted()}>
              Delete
            </button>
          </div>
        </>
      )}
    </li>
  );
}

export default SharedLi;
