import { BrowserRouter as Router } from "react-router-dom";
import { AppRoutes } from "./routes";

import ToastProvider from "./context/toastProvider";
import TodoContextProvider from "./store/todoContext";
import LoadingContexProvider from "./store/loadingContext";
import AuthContexProvider from "./store/authContext";
import Layout from "./components/layout/Layout";

function App() {
  return (
    <Router>
      <AuthContexProvider>
        <TodoContextProvider>
          <LoadingContexProvider>
            <Layout>
              <ToastProvider />
              <AppRoutes />
            </Layout>
          </LoadingContexProvider>
        </TodoContextProvider>
      </AuthContexProvider>
    </Router>
  );
}

export default App;
