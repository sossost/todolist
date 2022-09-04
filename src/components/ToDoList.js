import { Fragment, useEffect, useState } from "react";

import ToDo from "./ToDo";
import useDate from "../hooks/use-date";

import classes from "./ToDoList.module.css";

const Todolist = (props) => {
  const [todo, setTodo] = useState([]);
  const date = useDate();

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
          date: responseData[key].date,
        });
      }
      setTodo(loadedTodo);
    };

    fetchTodo();
  }, [props.dataChange]);

  const today = new Date();
  // const todayTodo = todo.filter((todo) => {
  //   return todo.date < today;
  // });

  const todayTodo = todo.filter((todo) => {
    return todo.date.substring(0, 11) === today.toLocaleDateString();
  });
  const pastTodo = todo.filter((todo) => {
    return todo.date.substring(0, 11) < today.toLocaleDateString();
  });

  const noPastTodoList = pastTodo.length === 0;

  const ListContainer = (props) => {
    const isPastTodo = props.isPastTodo;

    return (
      <Fragment>
        <h1 className={classes.listSubject}>
          {!isPastTodo ? (
            <Fragment>
              <span>오늘 </span>
              <small>
                {date.monthName + date.dateNum + "일 " + date.dayName}
              </small>{" "}
            </Fragment>
          ) : (
            !noPastTodoList && <span>지난 할일</span>
          )}
        </h1>

        <ul className={classes.list}>
          {(isPastTodo ? pastTodo : todayTodo).map((todo) => (
            <ToDo
              id={todo.id}
              key={todo.id}
              title={todo.title}
              description={todo.description}
              date={todo.date}
            />
          ))}
        </ul>
      </Fragment>
    );
  };

  return (
    <div className={classes.listContainer}>
      {!noPastTodoList && <ListContainer isPastTodo="true" />}
      <ListContainer />
    </div>
  );
};

export default Todolist;
