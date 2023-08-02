import { Todo } from "../types";
import { axiosBase } from "./axios";

export const getAllTodos = async () => {
  const response = await axiosBase.get("/todos");
  return response.data;
};

export const createTodo = async (todo: string) => {
  const response = await axiosBase.post<Todo>("/todos", { todo });
  const newTodo = response.data;
  return newTodo;
};

export const updateTodo = async (todo: Todo) => {
  const data = {
    todo: todo.todo,
    isCompleted: todo.isCompleted,
  };
  await axiosBase.put(`/todos/${todo.id}`, data);
};

export const deleteTodo = async (id: number) => {
  await axiosBase.delete(`/todos/${id}`);
};
