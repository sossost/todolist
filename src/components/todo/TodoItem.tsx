/** @jsxImportSource @emotion/react */

import { useContext, useState } from "react";
import styled from "@emotion/styled";
import { Todo } from "../../types";
import { colors } from "../../constants/color";
import { toast } from "react-hot-toast";
import { deleteTodo, updateTodo } from "../../api/todo";
import { LoadingContext } from "../../store/loadingContext";
import { TodoContext } from "../../store/todoContext";

import Button from "../UI/Button";
import EditInput from "./EditInput";

const TodoItem = ({ id, todo, isCompleted, userId }: Todo) => {
  const [isEditting, setIsEditting] = useState(false);
  const [newTodo, setNewTodo] = useState(todo);
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  const {
    todos: prevTodos,
    updateClientTodos,
    deleteClientTodos,
  } = useContext(TodoContext);

  const handleCompleteTodo = async () => {
    setIsLoading(true);
    const newTodoData = { id, todo, isCompleted: !isCompleted, userId };
    try {
      await updateTodo(newTodoData);
      updateClientTodos(prevTodos, id, newTodoData);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

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
      updateClientTodos(prevTodos, id, newTodoData);

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
      deleteClientTodos(prevTodos, id);

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
        <CheckBoxInput
          type="checkbox"
          checked={isCompleted}
          onChange={handleCompleteTodo}
          disabled={isEditting}
        />
        <Checkbox checked={isCompleted} isEditting={isEditting}>
          {isCompleted && <CheckIcon src="/checkIcon.png" alt="check_icon" />}
        </Checkbox>
        {isEditting ? (
          <EditInput
            id="modify-input"
            data-testid="modify-input"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
        ) : (
          <TodoItemText checked={isCompleted}>{todo}</TodoItemText>
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
  gap: 12px;
  height: 40px;
`;

const TodoItemWrapper = styled.label`
  display: flex;
  align-items: center;
  flex: 1;
  gap: 5px;
  cursor: pointer;
`;

const CheckBoxInput = styled.input`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
`;

const Checkbox = styled.span<{ isEditting: boolean; checked: boolean }>`
  margin-top: 3px;
  height: 18px;
  aspect-ratio: 1;
  border: 2px solid ${colors.primary};
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${({ isEditting }) => (isEditting ? "not-allowed" : "pointer")};
  filter: ${({ isEditting }) => (isEditting ? "opacity(0.5)" : "none")};
  background-color: ${({ checked }) =>
    checked ? colors.primary : "transparent"}};
`;

const CheckIcon = styled.img`
  width: 100%;
  height: 100%;
  filter: opacity(0.7);
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
  text-decoration: ${({ checked }: { checked: boolean }) =>
    checked ? "line-through" : "none"};
  @media (min-width: 768px) {
    &:hover {
      filter: opacity(0.5);
    }
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 8px;
`;
