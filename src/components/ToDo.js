import { useState } from "react";

import classes from "./ToDo.module.css";

const ToDo = (props) => {
  const [checkIcon, setCheckIcon] = useState();

  const todoDeleteHandler = (event) => {
    event.preventDefault();

    if (window.confirm(`${props.title}을(를) 삭제합니까?`)) {
    } else {
      return;
    }

    fetch(
      "https://react-http-ea916-default-rtdb.firebaseio.com/todo/" +
        props.id +
        ".json",
      { method: "DELETE" }
    );
  };

  return (
    <li className={classes.todo_list}>
      <div
        className={classes.completionCheck}
        onMouseOver={() => {
          setCheckIcon(true);
        }}
        onMouseOut={() => {
          setCheckIcon(false);
        }}
      >
        {checkIcon && (
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
        {/* <a href="/">수정</a> */}
        <img
          className={classes.deleteIcon}
          src="img/delete.png"
          alt="deleteIcon"
          onClick={todoDeleteHandler}
        />
      </div>
    </li>
  );
};

export default ToDo;
