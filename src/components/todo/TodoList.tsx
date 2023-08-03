/** @jsxImportSource @emotion/react */

import TodoItem from "./TodoItem";
import { Todo } from "../../types";
import { colors } from "../../constants/color";

const TodoList = ({ todos }: { todos: Todo[] }) => {
  return (
    <div
      css={{
        width: "100%",
        background: "rgba(255, 255, 255, 0.5)",
        padding: "20px",
        borderRadius: "20px",
        flexGrow: 1,
      }}
    >
      {todos.map((todo: Todo, index) => (
        <TodoItem
          key={index}
          id={todo.id}
          todo={todo.todo}
          isCompleted={todo.isCompleted}
          userId={todo.userId}
        />
      ))}
      {todos.length === 0 && (
        <div
          css={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            fontSize: "18px",
            fontWeight: 500,
            color: colors.mainFont,
          }}
        >
          작성된 할일이 없습니다.
        </div>
      )}
    </div>
  );
};

export default TodoList;
