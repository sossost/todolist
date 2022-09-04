import React from "react";

const TodoContext = React.createContext({
  dataChange: false,
  insertFormBtn: false,
});

export default TodoContext;
