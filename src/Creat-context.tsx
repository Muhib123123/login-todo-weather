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

export const SelectContext = createContext<SelectContextType>({
  value: "",
  onChange: () => {}, // Provide a no-op function as a default
});


export const PostContext = createContext<{ posts: PostType[] }>({ posts: [] });
