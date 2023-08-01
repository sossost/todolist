/** @jsxImportSource @emotion/react */

import { useState } from "react";
import { Todo } from "../../types";
import { colors } from "../../constants/color";
import { toast } from "react-hot-toast";
import { deleteTodo, updateTodo } from "../../api/todo";
import { useRecoilState } from "recoil";
import { todoListState } from "../../store/recoilAtoms";

import Button from "../UI/Button";
import EditInput from "./EditInput";
import {
  deleteClientTodos,
  updateClientTodos,
} from "../../utils/clientSideTodoManage";

const TodoItem = ({ id, todo, isCompleted, userId }: Todo) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isEditting, setIsEditting] = useState(false);
  const [checked, setChecked] = useState(isCompleted);
  const [newTodo, setNewTodo] = useState(todo);
  const [prevTodos, setNewTodos] = useRecoilState(todoListState);

  const handleEditTodo = async () => {
    setIsLoading(true);
    if (newTodo.trim().length === 0) {
      toast.error("할 일을 입력해주세요.");
      return;
    }

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
    setIsLoading(true);
    if (!window.confirm("정말 삭제하시겠습니까?")) {
      return;
    }
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
    <li
      css={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "8px 0",
        gap: 12,
      }}
    >
      <label
        css={{
          display: "flex",
          alignItems: "center",
          flex: 1,
          gap: 5,
        }}
      >
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
          <span
            css={{
              boxSizing: "content-box",
              textDecoration: checked ? "line-through" : "none",
              fontSize: "17px",
              width: "100%",
              flexGrow: 1,
              fontWeight: 500,
              lineHeight: "17px",
              padding: "8px 10px",
              color: colors.mainFont,
            }}
          >
            {todo}
          </span>
        )}
      </label>
      <div
        css={{
          display: "flex",
          gap: 8,
        }}
      >
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
              variant="secondary"
              size="small"
              data-testid="modify-button"
              onClick={() => setIsEditting(true)}
            >
              수정
            </Button>
            <Button
              variant="secondary"
              size="small"
              data-testid="delete-button"
              onClick={handleDeleteTodo}
              disabled={isLoading}
            >
              삭제
            </Button>
          </>
        )}
      </div>
    </li>
  );
};

export default TodoItem;
