import Header from "./UI/Header";
import { Fragment } from "react";
import Todolist from "./components/ToDoList";

function App() {
  return (
    <Fragment>
      <Header />
      <main>
        <Todolist />
      </main>
    </Fragment>
  );
}

export default App;
