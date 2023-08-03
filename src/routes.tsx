import { Route, Routes } from "react-router-dom";
import SigninPage from "./pages/auth/SigninPage";
import SignupPage from "./pages/auth/SignupPage";
import TodoPage from "./pages/todo/TodoPage";
import HomePage from "./pages/HomePage";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" Component={HomePage} />
      <Route path="/signup" Component={SignupPage} />
      <Route path="/signin" Component={SigninPage} />
      <Route path="/todo" Component={TodoPage} />
    </Routes>
  );
};
