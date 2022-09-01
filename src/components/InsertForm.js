import { useRef, useState, useEffect } from "react";

import classes from "./InsertForm.module.css";

const InsertForm = () => {
  //   const titleInputRef = useRef();
  //   const dscInputRef = useRef();

  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredDsc, setEnteredDsc] = useState("");
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

    // const enteredTitle = titleInputRef.current.value;
    // const enteredDsc = dscInputRef.current.value;

    const data = { title: enteredTitle, description: enteredDsc };

    fetch("https://react-http-ea916-default-rtdb.firebaseio.com/todo.json", {
      method: "POST",
      body: JSON.stringify(data),
    });

    // titleInputRef.current.value = "";
    // dscInputRef.current.value = "";

    event.target.reset();
  };

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      <div className={classes.control}>
        <input
          onChange={titleChangeHandler}
          className={classes.title}
          placeholder="할일"
          //   ref={titleInputRef}
        />
        <textarea
          placeholder="설명"
          onChange={dscChangeHandler}
          className={classes.description}
          type="text"
          name="description"
          //   ref={dscInputRef}
        />
      </div>
      <div className={classes.actions}>
        {!formIsValid && (
          <button className={classes.btn} disabled>
            할일 추가
          </button>
        )}
        {formIsValid && <button className={classes.btn}>할일 추가</button>}
      </div>
    </form>
  );
};

export default InsertForm;
