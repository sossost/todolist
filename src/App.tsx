import { BrowserRouter as Router } from "react-router-dom";
import { RecoilRoot } from "recoil";

import Layout from "./components/layout/Layout";
import ToastProvider from "./context/toastProvider";
import { AppRoutes } from "./routes";

function App() {
  return (
    <Router>
      <RecoilRoot>
        <Layout>
          <ToastProvider />
          <AppRoutes />
        </Layout>
      </RecoilRoot>
    </Router>
  );
}

export default App;
