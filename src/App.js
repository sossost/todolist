import { useState } from "react";
import Header from "./UI/Header";
import Todolist from "./components/ToDoList";
import CompletedDoList from "./components/CompletedDoList";
import TodoContext from "./store/todo-context";
import InsertForm from "./components/InsertForm";

function App() {
  const [dataChange, setDataChange] = useState(false);

  return (
    <TodoContext.Provider value={{ dataChange, setDataChange }}>
      <Header />
      <main>
        <Todolist dataChange={dataChange} />
        <InsertForm />
        <CompletedDoList dataChange={dataChange} />
      </main>
    </TodoContext.Provider>
  );
}

export default App;
