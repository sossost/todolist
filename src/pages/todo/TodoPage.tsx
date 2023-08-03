/** @jsxImportSource @emotion/react */

import { colors } from "../../constants/color";
import { getAllTodos } from "../../api/todo";
import { toast } from "react-hot-toast";
import { useContext, useEffect } from "react";
import { TodoContext } from "../../store/todoContext";

import TodoList from "../../components/todo/TodoList";
import TodoForm from "../../components/todo/TodoForm";

const TodoPage = () => {
  const { todos, setTodos } = useContext(TodoContext);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const todos = await getAllTodos();
        setTodos(todos);
      } catch (error: any) {
        toast.error(error.message);
      }
    };
    fetchTodos();
  }, [setTodos]);

  return (
    <div
      css={{
        padding: "30px",
        display: "flex",
        width: "100%",
        flexGrow: 1,
        gap: 30,
      }}
    >
      <div
        css={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          flexGrow: 1,
          maxWidth: "450px",
          borderRadius: "20px",
          gap: 30,
        }}
      >
        <TodoForm />
        <TodoList todos={todos} />
      </div>
      <div
        css={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          flexGrow: 1,
          maxWidth: "450px",
          borderRadius: "20px",
          gap: 20,
        }}
      >
        <div
          css={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            flexGrow: 1,
            maxWidth: "450px",
            gap: 20,
            background: "rgba(255, 255, 255, 0.5)",
            padding: "30px",
            borderRadius: "20px",
          }}
        >
          <div
            css={{
              fontSize: "20px",
              fontWeight: 500,
              color: colors.mainFont,
            }}
          >
            오픈준비중
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoPage;
