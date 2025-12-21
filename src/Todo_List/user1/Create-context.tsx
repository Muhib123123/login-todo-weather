/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useReducer} from "react";
import ReducerFunction from "./ReducerFunction";



type SelectContextType = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

type PostType = {
  id: string;
  title: string;
  body: string;
};

type TodoType = {
  editingId: string | null;
  setEditingId: React.Dispatch<React.SetStateAction<string | null>>;
  completedTodos: { id: string; value: string }[];
  setCompletedTodos: React.Dispatch<
    React.SetStateAction<{ id: string; value: string }[]>
  >;
  setCompletedDeleted: React.Dispatch<React.SetStateAction<string[]>>;
  completedDeleted: string[];
  todos: { id: string; value: string; css: number }[];
};

type ReducerContextType = {
  todos: { id: string; value: string; css: number }[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatch: React.Dispatch<{ type: string; payload?: any }>;
}

export const SelectContext = createContext<SelectContextType>({
  value: "",
  onChange: () => {}, // Provide a no-op function as a default
});

export const PostContext = createContext<{ posts: PostType[] }>({ posts: [] });

export const TodoContext = createContext<TodoType>({
  editingId: null,
  setEditingId: () => {},
  completedTodos: [],
  setCompletedTodos: () => {},
  completedDeleted: [],
  setCompletedDeleted: () => {},
  todos: [],
});


const ReducerContext = createContext<ReducerContextType>({
  todos: [],
  dispatch: () => {}
});


const ReducerProvider = ({ children }: { children: React.ReactNode }) => {
  const [todos, dispatch] = useReducer(ReducerFunction, [])
  return (
    <ReducerContext.Provider value={{ todos, dispatch }}>
      {children}
    </ReducerContext.Provider>
  )
}

export default ReducerProvider

export const useReducerContext = () => {
  return useContext(ReducerContext)
}