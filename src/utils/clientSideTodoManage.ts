import { Todo } from "../types";

export const addClientTodos = (todos: Todo[], newTodo: Todo) => {
  const updatedTodos = [...todos, newTodo];
  return updatedTodos;
};

export const updateClientTodos = (
  todos: Todo[],
  id: number,
  newTodoData: Todo
) => {
  const updatedTodos = todos.map((todo: Todo) =>
    todo.id === id ? newTodoData : todo
  );
  return updatedTodos;
};

export const deleteClientTodos = (todos: Todo[], id: number) => {
  const updatedTodos = todos.filter((todo: Todo) => todo.id !== id);
  return updatedTodos;
};
