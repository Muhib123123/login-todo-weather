import SharedLi from "./Shared-li";
type Props = {
  search: { value: string; notFound: boolean };
  todos: { id: string; value: string; css: number }[];
  completedDeleted: string[];
};

function Search({ todos, search, completedDeleted }: Props) {
  return (
    <ul>
      {todos.map((todo) =>
        todo.value.toLowerCase().includes(search.value.toLowerCase()) ? (
          completedDeleted.includes(todo.id) ? null : todo.value ===
            "" ? null : (
            <SharedLi todo={todo} key={todo.id}/>
          )
        ) : null
      )}
      { search.notFound && (
        <div className="not-found li-animation">
          <h1>Not Found</h1>
        </div>
      )}
    </ul>
  );
}

export default Search;
