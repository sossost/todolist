import { useEffect, useState } from "react";

import ToDo from "./ToDo";
import TodoContext from "../store/todo-context";
import InsertForm from "./InsertForm";

import classes from "./ToDoList.module.css";

const Todolist = () => {
  const [dataChange, setDataChange] = useState(false);
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
      console.log("1");
    };

    fetchTodo();
  }, [dataChange]);

  console.log(dataChange);
  return (
    <TodoContext.Provider value={{ dataChange, setDataChange }}>
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
      <InsertForm />
    </TodoContext.Provider>
  );
};

export default Todolist;
