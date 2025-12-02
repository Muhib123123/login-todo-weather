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
  return (
    <ul>
      {completedTodos.map((todo) =>
        completedDeleted.includes(todo.id) ? null : (
          <li key={todo.id}>
            <span>{todo.value}</span>
            <div>
              <button
                className="item-button-d"
                onClick={() => {
                  setCompletedDeleted((prev) => [...prev, todo.id]);
                  setCompletedTodos((prev) =>
                    prev.filter((t) => t.id !== todo.id)
                  );
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
