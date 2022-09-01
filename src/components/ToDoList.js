import { useEffect, useState } from "react";

import ToDo from "./ToDo";

import classes from "./ToDoList.module.css";

const Todolist = () => {
  const [todo, setTodo] = useState([]);

  useEffect(() => {
    const fetchTodo = async () => {
      const response = await fetch(
        "https://react-http-ea916-default-rtdb.firebaseio.com/todo.json"
      );
      const responseData = await response.json();

      const loadedTodo = [];

      for (const key in responseData) {
        loadedTodo.push({
          id: key,
          title: responseData[key].title,
          description: responseData[key].description,
        });
      }

      setTodo(loadedTodo);
    };

    fetchTodo();
  }, [todo]);

  return (
    <div className={classes.listContainer}>
      <h3>오늘</h3>
      <ul className={classes.list}>
        {todo.map((todo) => (
          <ToDo
            id={todo.id}
            key={todo.id}
            title={todo.title}
            description={todo.description}
          />
        ))}
      </ul>
    </div>
  );
};

export default Todolist;
