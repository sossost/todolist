import Header from "./UI/Header";
import InsertForm from "./components/InsertForm";
import { Fragment } from "react";
import Todolist from "./components/ToDoList";

function App() {
  return (
    <Fragment>
      <Header />
      <main>
        <Todolist />
        <InsertForm />
      </main>
    </Fragment>
  );
}

export default App;
