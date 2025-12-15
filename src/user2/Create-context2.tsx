import { createContext } from "react";

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
  setTodos: React.Dispatch<
    React.SetStateAction<{ id: string; value: string; css: number }[]>
  >;
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

export const SelectContext = createContext<SelectContextType>({
  value: "",
  onChange: () => {}, // Provide a no-op function as a default
});

export const PostContext = createContext<{ posts: PostType[] }>({ posts: [] });

export const TodoContext2 = createContext<TodoType>({
  setTodos: () => {},
  editingId: null,
  setEditingId: () => {},
  completedTodos: [],
  setCompletedTodos: () => {},
  completedDeleted: [],
  setCompletedDeleted: () => {},
  todos: [],
});
