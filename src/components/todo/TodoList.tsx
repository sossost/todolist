/** @jsxImportSource @emotion/react */

import { Todo } from "../../types";
import styled from "@emotion/styled";

import TodoItem from "./TodoItem";
import CenterMessage from "../CenterMessage";

const TodoList = ({ todos }: { todos: Todo[] }) => {
  return (
    <ListContainer>
      {todos.length > 0 ? (
        <ul>
          {todos.map((todo: Todo, index) => (
            <TodoItem
              key={index}
              id={todo.id}
              todo={todo.todo}
              isCompleted={todo.isCompleted}
              userId={todo.userId}
            />
          ))}
        </ul>
      ) : (
        <CenterMessage message="할 일을 추가해보세요." />
      )}
    </ListContainer>
  );
};

export default TodoList;

const ListContainer = styled.div`
  width: 100%;
  background: rgba(255, 255, 255, 0.5);
  padding: 15px 20px;
  border-radius: 20px;
  flex-grow: 1;
`;
