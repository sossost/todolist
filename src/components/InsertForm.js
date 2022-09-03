import { useState, useEffect, Fragment, useContext } from "react";

import classes from "./InsertForm.module.css";
import Button from "../UI/Button";
import TodoContext from "../store/todo-context";

const InsertForm = (props) => {
  const { dataChange, setDataChange } = useContext(TodoContext);
  const isEditForm = props.isEditForm;
  const [enteredTitle, setEnteredTitle] = useState(
    isEditForm ? props.title : ""
  );
  const [enteredDsc, setEnteredDsc] = useState(
    isEditForm ? props.description : ""
  );
  const [formIsValid, setFormIsValid] = useState(false);

  const enteredTitleIsValid = enteredTitle.trim() !== "";

  useEffect(() => {
    if (enteredTitleIsValid) {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }
  }, [enteredTitleIsValid]);

  const titleChangeHandler = (event) => {
    setEnteredTitle(event.target.value);
  };

  const dscChangeHandler = (event) => {
    setEnteredDsc(event.target.value);
  };
  const submitFormHandler = (event) => {
    event.preventDefault();

    const date = new Date();

    const data = {
      title: enteredTitle,
      description: enteredDsc,
      date: date.toLocaleString(),
    };

    const submitTodo = async () => {
      await fetch(
        "https://react-http-ea916-default-rtdb.firebaseio.com/todo.json",
        {
          method: "POST",
          body: JSON.stringify(data),
        }
      );

      setEnteredTitle("");
      setEnteredDsc("");
      setDataChange(!dataChange);
    };
    submitTodo();
  };

  const editCancleHandler = (event) => {
    event.preventDefault();
    props.listForm(false);
  };

  const updateFormHandler = (event) => {
    event.preventDefault();
    const data = {
      title: enteredTitle,
      description: enteredDsc,
      date: props.date,
    };

    const Update = async () => {
      await fetch(
        "https://react-http-ea916-default-rtdb.firebaseio.com/todo/" +
          props.id +
          ".json",
        {
          method: "PUT",
          body: JSON.stringify(data),
        }
      );
      props.listForm(false);
      setDataChange(!dataChange);
    };
    Update();
  };

  const EditFormBtns = () => {
    return (
      <Fragment>
        <button className={classes.cancleBtn} onClick={editCancleHandler}>
          취소
        </button>
        {formIsValid ? (
          <Button>저장</Button>
        ) : (
          <Button disabled="disabled">저장</Button>
        )}
      </Fragment>
    );
  };

  const SubmitFormBtn = () => {
    return (
      <Fragment>
        {formIsValid ? (
          <Button>할일 추가</Button>
        ) : (
          <Button disabled={"disabled"}>할일 추가</Button>
        )}
      </Fragment>
    );
  };

  return (
    <form
      className={classes.form}
      onSubmit={isEditForm ? updateFormHandler : submitFormHandler}
    >
      <div className={classes.control}>
        <input
          onChange={titleChangeHandler}
          className={classes.title}
          placeholder="할일"
          value={enteredTitle}
        />
        <textarea
          placeholder="설명"
          onChange={dscChangeHandler}
          className={classes.description}
          type="text"
          name="description"
          value={enteredDsc}
        />
      </div>
      <div className={classes.actions}>
        {isEditForm ? <EditFormBtns /> : <SubmitFormBtn />}
      </div>
    </form>
  );
};

export default InsertForm;
