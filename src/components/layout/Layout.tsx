/** @jsxImportSource @emotion/react */

import { ReactNode, useContext, useEffect } from "react";
import { colors } from "../../constants/color";
import { useLocation, useNavigate } from "react-router-dom";

import Header from "./Header";
import Loading from "../UI/Loading";
import { AuthContext } from "../../store/authContext";
import { LoadingContext } from "../../store/loadingContext";
import { TodoContext } from "../../store/todoContext";

const Layout = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const pathname = location.pathname;
  const navigate = useNavigate();
  const { isLoading } = useContext(LoadingContext);
  const { token } = useContext(AuthContext);
  const { setTodos } = useContext(TodoContext);

  useEffect(() => {
    // 로그인 상태에서는 로그인, 회원가입 페이지로 이동시 todo 페이지로 리다이렉트
    if (token && ["/signup", "/signin", "/"].includes(pathname)) {
      navigate("/todo");
    }

    // 로그인 상태가 아닐 때는 todo 페이지로 이동시 로그인 페이지로 리다이렉트
    if (!token && ["/todo", "/"].includes(pathname)) {
      navigate("/signin");
    }

    // 로그인 상태가 아니면 클라이언트 투두리스트 초기화
    if (!token) {
      setTodos([]);
    }
  }, [pathname, token, navigate, setTodos]);

  return (
    <div
      css={{
        width: "100%",
        minHeight: "100vh",
        margin: "0 auto",
        padding: "40px 0",
        border: "1px solid #ccc",
        background: `linear-gradient(0, ${colors.primary}, #fc949d)`,
      }}
    >
      <div
        css={{
          position: "relative",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          overflow: "hidden",
          width: "calc(100% - 40px)",
          maxWidth: "940px",
          height: "100%",
          minHeight: "90vh",
          margin: "0 auto",
          background: "rgba(255, 255, 255, 0.4)",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
          backdropFilter: "blur(5px)",
          borderRadius: "20px",
          padding: "100px 20px 20px 20px",
        }}
      >
        {isLoading && <Loading />}
        <Header />
        <main
          css={{
            position: "relative",
            display: "flex",
            flexGrow: 1,
            width: "100%",
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
