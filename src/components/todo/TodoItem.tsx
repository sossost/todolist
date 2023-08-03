/** @jsxImportSource @emotion/react */

import { useContext, useState } from "react";
import styled from "@emotion/styled";
import { Todo } from "../../types";
import { colors } from "../../constants/color";
import { toast } from "react-hot-toast";
import { deleteTodo, updateTodo } from "../../api/todo";
import {
  deleteClientTodos,
  updateClientTodos,
} from "../../utils/clientSideTodoManage";
import { LoadingContext } from "../../store/loadingContext";
import { TodoContext } from "../../store/todoContext";

import Button from "../UI/Button";
import EditInput from "./EditInput";

const TodoItem = ({ id, todo, isCompleted, userId }: Todo) => {
  const [isEditting, setIsEditting] = useState(false);
  const [checked, setChecked] = useState(isCompleted);
  const [newTodo, setNewTodo] = useState(todo);
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  const { todos: prevTodos, setTodos: setNewTodos } = useContext(TodoContext);

  const handleEditTodo = async () => {
    if (newTodo.trim().length === 0) {
      toast.error("할 일을 입력해주세요.");
      return;
    }

    setIsLoading(true);

    const newTodoData = {
      id,
      todo: newTodo,
      isCompleted,
      userId,
    };

    try {
      // TODO: updateTodo API 호출
      await updateTodo(newTodoData);

      // TODO: 클라이언트 상태 업데이트
      const updatedTodos = updateClientTodos(prevTodos, id, newTodoData);
      setNewTodos(updatedTodos);

      toast.success("수정되었습니다.");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsEditting(false);
      setIsLoading(false);
    }
  };

  const handleDeleteTodo = async () => {
    if (!window.confirm("정말 삭제하시겠습니까?")) {
      return;
    }
    setIsLoading(true);

    try {
      // TODO: deleteTodo API 호출
      await deleteTodo(id);

      // TODO: 클라이언트 상태 업데이트
      const updatedTodos = deleteClientTodos(prevTodos, id);
      setNewTodos(updatedTodos);

      toast.success("삭제되었습니다.");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setNewTodo(todo);
    setIsEditting(false);
  };

  return (
    <TodoItemContainer>
      <TodoItemWrapper>
        <input
          type="checkbox"
          checked={checked}
          onChange={() => setChecked(!checked)}
        />
        {isEditting ? (
          <EditInput
            id="modify-input"
            data-testid="modify-input"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
        ) : (
          <TodoItemText>{todo}</TodoItemText>
        )}
      </TodoItemWrapper>
      <ButtonWrapper>
        {isEditting ? (
          <>
            <Button
              variant="primary"
              size="small"
              data-testid="submit-button"
              onClick={handleEditTodo}
              disabled={isLoading}
            >
              제출
            </Button>
            <Button
              variant="secondary"
              size="small"
              data-testid="cancel-button"
              onClick={handleCancel}
            >
              취소
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="textOnly"
              size="small"
              data-testid="modify-button"
              onClick={() => setIsEditting(true)}
            >
              수정
            </Button>
            <Button
              variant="textOnly"
              size="small"
              data-testid="delete-button"
              onClick={handleDeleteTodo}
              disabled={isLoading}
            >
              삭제
            </Button>
          </>
        )}
      </ButtonWrapper>
    </TodoItemContainer>
  );
};

export default TodoItem;

const TodoItemContainer = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 0;
  gap: 12px;
`;

const TodoItemWrapper = styled.label`
  display: flex;
  align-items: center;
  flex: 1;
  gap: 5px;
`;

const TodoItemText = styled.span`
  box-sizing: content-box;
  font-size: 16px;
  width: 100%;
  flex-grow: 1;
  font-weight: 500;
  line-height: 16px;
  padding: 8.3px 10px;
  color: ${colors.mainFont};
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 8px;
`;
