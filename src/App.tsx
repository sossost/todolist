import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";

import HomePage from "./pages/HomePage";
import SignupPage from "./pages/auth/SignupPage";
import Layout from "./components/layout/Layout";
import SigninPage from "./pages/auth/SigninPage";
import ToastProvider from "./context/toastProvider";
import TodoPage from "./pages/todo/TodoPage";

function App() {
  return (
    <Router basename="/">
      <RecoilRoot>
        <Layout>
          <ToastProvider />
          <Routes>
            <Route path="/" Component={SigninPage} />
            <Route path="/signup" Component={SignupPage} />
            <Route path="/signin" Component={SigninPage} />
            <Route path="/todo" Component={TodoPage} />
          </Routes>
        </Layout>
      </RecoilRoot>
    </Router>
  );
}

export default App;
