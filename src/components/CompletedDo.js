import { Fragment, useContext, useState } from "react";
import TodoContext from "../store/todo-context";

import classes from "./CompletedDo.module.css";

const CompletedDo = (props) => {
  const { dataChange, setDataChange } = useContext(TodoContext);
  const [checkIcon, setCheckIcon] = useState();

  const CompleteDoHandler = () => {
    const data = {
      title: props.title,
      description: props.description,
      id: props.id,
      key: props.id,
      date: props.date,
    };

    const moveToCompleted = async () => {
      await fetch(
        "https://react-http-ea916-default-rtdb.firebaseio.com/todo.json",
        { method: "POST", body: JSON.stringify(data) }
      );
      await fetch(
        "https://react-http-ea916-default-rtdb.firebaseio.com/completed/" +
          props.id +
          ".json",
        { method: "DELETE" }
      );

      setDataChange(!dataChange);
    };

    moveToCompleted();
  };

  const todoDeleteHandler = (event) => {
    event.preventDefault();

    if (window.confirm(`${props.title}을(를) 삭제합니까?`)) {
    } else {
      return;
    }

    const DeleteTodo = async () => {
      await fetch(
        "https://react-http-ea916-default-rtdb.firebaseio.com/completed/" +
          props.id +
          ".json",
        { method: "DELETE" }
      );
      setDataChange(!dataChange);
    };
    DeleteTodo();
  };

  return (
    <li className={classes.todo_list}>
      <Fragment>
        <div
          className={classes.completionCheck}
          onClick={CompleteDoHandler}
          onMouseOver={() => {
            setCheckIcon(true);
          }}
          onMouseOut={() => {
            setCheckIcon(false);
          }}
        >
          {!checkIcon && (
            <img
              className={classes.checkIcon}
              src="img/check.svg"
              alt="checkIcon"
            />
          )}
        </div>
        <div className={classes.contents}>
          <h2 className={classes.title}>{props.title}</h2>
          <p className={classes.dsc}>{props.description}</p>
        </div>
        <div className={classes.handler}>
          <img
            className={classes.deleteIcon}
            src="img/delete.png"
            alt="deleteIcon"
            onClick={todoDeleteHandler}
          />
        </div>
      </Fragment>
    </li>
  );
};

export default CompletedDo;
