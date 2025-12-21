import EditTodo2 from "./Edit-todo2";
import { useContext, useEffect } from "react";
import { TodoContext2 } from "./Create-context2";
import { useRef } from "react";
import { useToast } from "../Create-context-todo-toast";
type Props = {
  todo: { id: string; value: string; css: number };
};

function SharedLi2({ todo }: Props) {
  const {
    setTodos,
    editingId,
    setEditingId,
    completedTodos,
    setCompletedTodos,
    setCompletedDeleted,
    completedDeleted,
    todos,
  } = useContext(TodoContext2);
  const Toast = useToast();
  const handleClickDone = (ids: string, values: string) => {
    const completed = [...completedTodos, { id: ids, value: values }];
    setCompletedTodos(completed);
    localStorage.setItem("completedTodos2", JSON.stringify(completed));
    Toast?.handleToastContext("Todo completed successfully");
  };

  const handleDeleted = () => {
    delRef.current?.classList.add("li-deleted");
    setTimeout(() => {
      const prev = todos.filter((t) => t.id !== todo.id);
      setTodos(prev);
      localStorage.setItem("todos2", JSON.stringify(prev));
      const id = [...completedDeleted, todo.id];
      setCompletedDeleted(id);
      localStorage.setItem("completedDeleted2", JSON.stringify(id));
      Toast?.handleToastContext("Todo deleted successfully");
    }, 280);
  };

  useEffect(() => {
    const storedCompletedTodos = localStorage.getItem("completedTodos2");
    if (storedCompletedTodos) {
      setCompletedTodos(JSON.parse(storedCompletedTodos));
    }
    const storedCompletedDeleted = localStorage.getItem("completedDeleted2");
    if (storedCompletedDeleted) {
      setCompletedDeleted(JSON.parse(storedCompletedDeleted));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const delRef = useRef<HTMLLIElement>(null);
  return (
    <li key={todo.id} className="li-animation" ref={delRef}>
      {editingId === todo.id ? (
        <EditTodo2
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
            <button className="item-button-d" onClick={() => handleDeleted()}>
              Delete
            </button>
          </div>
        </>
      )}
    </li>
  );
}

export default SharedLi2;
