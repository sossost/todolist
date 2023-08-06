/** @jsxImportSource @emotion/react */

import { ReactNode, useContext, useEffect } from "react";
import styled from "@emotion/styled";
import { colors } from "../../constants/color";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../store/authContext";
import { LoadingContext } from "../../store/loadingContext";
import { TodoContext } from "../../store/todoContext";

import Header from "./Header";
import Loading from "../UI/Loading";

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
    <BackgroundLayer>
      <LayoutContainer>
        {isLoading && <Loading />}
        <Header />
        <Main>{children}</Main>
      </LayoutContainer>
    </BackgroundLayer>
  );
};

export default Layout;

const BackgroundLayer = styled.div`
  width: 100%;
  min-height: 100vh;
  margin: 0 auto;
  padding: 25px 0;
  border: 1px solid #ccc;
  background: linear-gradient(0, ${colors.primary}, #fc949d);

  @media (min-width: 768px) {
    padding: 40px 0;
  }
`;

const LayoutContainer = styled.div`
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  width: calc(100% - 40px);
  max-width: 940px;
  height: 100%;
  min-height: calc(100vh - 50px);
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.4);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(5px);
  border-radius: 20px;
  padding: 100px 20px 20px 20px;
  @media (min-width: 768px) {
    min-height: calc(100vh - 80px);
  }
`;

const Main = styled.main`
  position: relative;
  display: flex;
  width: 100%;
  flex-grow: 1;
`;
