import { useEffect, useState, useContext } from "react";

import CompletedDo from "./CompletedDo";
import TodoContext from "../store/todo-context";

import classes from "./ToDoList.module.css";

const CompletedDoList = (props) => {
  const { dataChange, setDataChange } = useContext(TodoContext);
  const [completedDo, setCompletedDo] = useState([]);

  useEffect(() => {
    const fetchCompletedDo = async () => {
      const response = await fetch(
        "https://react-http-ea916-default-rtdb.firebaseio.com/completed.json"
      );
      const responseData = await response.json();

      const loadedCompletedDo = [];

      for (const key in responseData) {
        loadedCompletedDo.push({
          id: key,
          title: responseData[key].title,
          description: responseData[key].description,
          date: responseData[key].date,
        });
      }

      setCompletedDo(loadedCompletedDo);
    };
    fetchCompletedDo();
  }, [props.dataChange]);

  return (
    <TodoContext.Provider value={{ dataChange, setDataChange }}>
      <div className={classes.listContainer}>
        <h3>완료한 작업</h3>
        <ul className={classes.list}>
          {completedDo.map((completedDo) => (
            <CompletedDo
              id={completedDo.id}
              key={completedDo.id}
              title={completedDo.title}
              description={completedDo.description}
              date={completedDo.date}
            />
          ))}
        </ul>
      </div>
    </TodoContext.Provider>
  );
};

export default CompletedDoList;
