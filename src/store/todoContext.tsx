import { ReactNode, createContext, useState } from "react";
import { Todo } from "../types";

interface TodoContextType {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  addClientTodos: (todos: Todo[], newTodo: Todo) => void;
  updateClientTodos: (todos: Todo[], id: number, newTodoData: Todo) => void;
  deleteClientTodos: (todos: Todo[], id: number) => void;
}

export const TodoContext = createContext<TodoContextType>({
  todos: [],
  setTodos: () => {},
  addClientTodos: () => {},
  updateClientTodos: () => {},
  deleteClientTodos: () => {},
});

const TodoContextProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addClientTodos = (todos: Todo[], newTodo: Todo) => {
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
  };

  const updateClientTodos = (todos: Todo[], id: number, newTodoData: Todo) => {
    const updatedTodos = todos.map((todo: Todo) =>
      todo.id === id ? newTodoData : todo
    );
    setTodos(updatedTodos);
  };

  const deleteClientTodos = (todos: Todo[], id: number) => {
    const updatedTodos = todos.filter((todo: Todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        setTodos,
        addClientTodos,
        updateClientTodos,
        deleteClientTodos,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoContextProvider;
