/** @jsxImportSource @emotion/react */

import { useEffect, useState } from "react";
import { getAllTodos } from "../../api/todo";
import uuid from "react-uuid";
import { Todo } from "../../types";

import TodoList from "../../components/todo/TodoList";
import TodoForm from "../../components/todo/TodoForm";
import Line from "../../components/UI/Line";
import { useRecoilState } from "recoil";
import { todoListState } from "../../store/recoilAtoms";
import { toast } from "react-hot-toast";

const TodoPage = () => {
  const [todos, setTodos] = useRecoilState<Todo[]>(todoListState);

  useEffect(() => {
    const fetchTodos = async () => {
      const todos = await getAllTodos();
      setTodos(todos);
    };
    try {
      fetchTodos();
    } catch (error: any) {
      toast.error(error.message);
    }
  }, [setTodos]);

  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <div
        css={{
          display: "flex",
          flexDirection: "column",
          padding: "30px",
          width: "100%",
          maxWidth: "400px",
          background: "rgba(255, 255, 255, 0.5)",
          borderRadius: "20px",
          gap: 20,
        }}
      >
        <TodoForm />
        <Line direction="horizontal" />
        <TodoList todos={todos} />
      </div>
    </div>
  );
};

export default TodoPage;
