import { Route, Routes } from "react-router-dom";
import SigninPage from "./pages/auth/SigninPage";
import SignupPage from "./pages/auth/SignupPage";
import TodoPage from "./pages/todo/TodoPage";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" Component={SigninPage} />
      <Route path="/signup" Component={SignupPage} />
      <Route path="/signin" Component={SigninPage} />
      <Route path="/todo" Component={TodoPage} />
    </Routes>
  );
};
