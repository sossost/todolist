/** @jsxImportSource @emotion/react */

import TodoItem from "./TodoItem";
import { Todo } from "../../types";

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
    </div>
  );
};

export default TodoList;
