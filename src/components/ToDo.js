import { Fragment, useContext, useState } from "react";
import TodoContext from "../store/todo-context";
import InsertForm from "./InsertForm";

import classes from "./ToDo.module.css";

const ToDo = (props) => {
  const { dataChange, setDataChange } = useContext(TodoContext);
  const [checkIcon, setCheckIcon] = useState();
  const [editForm, setEditForm] = useState(false);

  const editFormHandler = (event) => {
    event.preventDefault();
    setEditForm(true);
  };

  const todoDeleteHandler = (event) => {
    event.preventDefault();

    if (window.confirm(`${props.title}을(를) 삭제합니까?`)) {
    } else {
      return;
    }

    const Delete = async () => {
      await fetch(
        "https://react-http-ea916-default-rtdb.firebaseio.com/todo/" +
          props.id +
          ".json",
        { method: "DELETE" }
      );
      setDataChange(!dataChange);
    };
    Delete();
  };

  const listForm = (props) => {
    setEditForm(props);
  };

  return (
    <li className={classes.todo_list}>
      {!editForm && (
        <Fragment>
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
            <img
              className={classes.editIcon}
              src="img/pencil.png"
              alt="editIcon"
              onClick={editFormHandler}
            />

            <img
              className={classes.deleteIcon}
              src="img/delete.png"
              alt="deleteIcon"
              onClick={todoDeleteHandler}
            />
          </div>
        </Fragment>
      )}
      {editForm && (
        <InsertForm
          title={props.title}
          description={props.description}
          id={props.id}
          isEditForm={editForm}
          listForm={listForm}
        />
      )}
    </li>
  );
};

export default ToDo;
