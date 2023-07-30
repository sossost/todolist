import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import SignupPage from "./pages/auth/SignupPage";
import Layout from "./components/layout/Layout";
import SigninPage from "./pages/auth/SigninPage";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" Component={HomePage} />
          <Route path="/signup" Component={SignupPage} />
          <Route path="/signin" Component={SigninPage} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
