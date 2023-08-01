/** @jsxImportSource @emotion/react */

import { useEffect } from "react";
import { getAllTodos } from "../../api/todo";
import { Todo } from "../../types";

import TodoList from "../../components/todo/TodoList";
import TodoForm from "../../components/todo/TodoForm";
import { useRecoilState } from "recoil";
import { todoListState } from "../../store/recoilAtoms";
import { toast } from "react-hot-toast";
import { colors } from "../../constants/color";

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
