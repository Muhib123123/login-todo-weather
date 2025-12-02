import EditTodo from "./Edit-todo";

type Props = {
  todos: { id: string; value: string }[];
  setTodos: React.Dispatch<
    React.SetStateAction<{ id: string; value: string }[]>
  >;
  editingId: string | null;
  setEditingId: React.Dispatch<React.SetStateAction<string | null>>;
  completedTodos: { id: string; value: string }[]; 
  setCompletedTodos: React.Dispatch<
    React.SetStateAction<{ id: string; value: string }[]>
  >; // changed
  completedDeleted: string[];
  setCompletedDeleted: React.Dispatch<React.SetStateAction<string[]>>;
};

function TodoAll({
  todos,
  setTodos,
  editingId,
  setEditingId,
  completedTodos,
  setCompletedTodos,
  completedDeleted,
  setCompletedDeleted,
}: Props) {
  const handleClickDone = (ids: string, values: string) => {
    setCompletedTodos((prev) => [...prev, { id: ids, value: values }]); 
  };
  return (
    <ul>
      {todos.map((todo) =>
        completedDeleted.includes(todo.id) ? null : todo.value === "" ? null : (
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

export default TodoAll;
