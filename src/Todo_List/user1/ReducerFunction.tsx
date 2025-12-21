interface Todo {
  id: string;
  value: string;
  css: number;
}

type Action = {
  type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any;
};


const ReducerFunction = (state: Todo[], action: Action): Todo[] => {
  switch (action.type) {
    case "ADD_TODO": {
      if (action.payload && action.payload.inputValue.trim() !== "") {
        const newTodo = {
          id: crypto.randomUUID(),
          value: action.payload.inputValue.trim(),
          css: 0,
        };
        const updatedTodos = [...state, newTodo];
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
        return updatedTodos;
      }
      return state;
    }
    case "EDIT_TODO": {
      if (action.payload) {
        const { todo, newValue } = action.payload;
        const updatedTodos = state.map((t) =>
          t.id === todo.id ? { ...t, value: newValue } : t
        );
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
        return updatedTodos;
      }
      return state;
    }
    case "DELETE_TODO": {
      if (action.payload && action.payload.todo) {
        const { todo } = action.payload;
        const updatedTodos = state.filter((t) => t.id !== todo.id);
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
        return updatedTodos;
      }
      return state;
    }
    case "GET_TODOS": {
      if (action.payload && action.payload.todos) {
        return action.payload.todos;
      }
      return state;
    }
    default:
      return state;
  }
};
export default ReducerFunction;