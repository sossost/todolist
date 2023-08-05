/** @jsxImportSource @emotion/react */

import { useContext, useRef } from "react";
import { createTodo } from "../../api/todo";
import { toast } from "react-hot-toast";

import Input from "../../components/UI/Input";
import Button from "../../components/UI/Button";
import { LoadingContext } from "../../store/loadingContext";
import { TodoContext } from "../../store/todoContext";

const TodoForm = () => {
  const todoRef = useRef<HTMLInputElement>(null);
  const { todos: prevTodos, addClientTodos } = useContext(TodoContext);
  const { isLoading, setIsLoading } = useContext(LoadingContext);

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    const inputValue = todoRef.current!.value;

    if (!inputValue) {
      toast.error("할 일을 입력해주세요.");
      return;
    }

    setIsLoading(true);

    try {
      // TODO: createTodo API 호출
      const newTodo = await createTodo(inputValue);

      // TODO: 클라이언트 상태 업데이트
      addClientTodos(prevTodos, newTodo);

      todoRef.current!.value = "";
      toast.success("할 일이 추가되었습니다.");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      css={{
        display: "flex",
        alignItems: "end",
        gap: 12,
        width: "100%",
        background: "rgba(255, 255, 255, 0.5)",
        padding: "20px",
        borderRadius: "20px",
      }}
    >
      <Input
        label="할 일 작성하기"
        css={{
          width: "auto",
          flexGrow: 1,
          gap: 12,
        }}
      >
        <Input.TextFiled
          id="todo"
          data-testid="new-todo-input"
          placeholder="할 일을 입력해주세요."
          ref={todoRef}
          css={{
            height: "36px",
          }}
        />
      </Input>
      <Button
        onClick={handleSubmit}
        data-testid="new-todo-add-button"
        disabled={isLoading}
        size="small"
        css={{ height: "36px", width: "95px" }}
      >
        추가
      </Button>
    </form>
  );
};

export default TodoForm;
