import { Todo } from "../types";
import { axiosBase } from "./axios";

interface TodoResponse {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
}

export const getAllTodos = async () => {
  const response = await axiosBase.get("/todos");
  return response.data.map((todo: TodoResponse) => {
    return { id: todo.id, todo: todo.todo, isCompleted: todo.isCompleted };
  });
};

export const createTodo = async (todo: string) => {
  const response = await axiosBase.post<Todo>("/todos", { todo });
  const newTodo = response.data;
  return newTodo;
};

export const updateTodo = async (todo: {
  id: number;
  todo: string;
  isCompleted: boolean;
}) => {
  const data = {
    todo: todo.todo,
    isCompleted: todo.isCompleted,
  };
  await axiosBase.put(`/todos/${todo.id}`, data);
};

export const deleteTodo = async (id: number) => {
  await axiosBase.delete(`/todos/${id}`);
};
