/** @jsxImportSource @emotion/react */

import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { toast } from "react-hot-toast";
import { useContext } from "react";
import { AuthContext } from "../../store/authContext";

import Logo from "../Logo";
import Button from "../UI/Button";

const Header = () => {
  const navigate = useNavigate();
  const { token: isLoggedin, removeTokenInLocalStorage } =
    useContext(AuthContext);

  const handleLogout = () => {
    removeTokenInLocalStorage();
    toast.success("로그아웃 되었습니다.");
    navigate("/signin");
  };

  return (
    <HeaderContainer>
      <Logo onClick={() => navigate("/")} />

      {isLoggedin ? (
        <Button onClick={handleLogout} variant="secondary" size="small">
          로그아웃
        </Button>
      ) : (
        <ButtonWrapper>
          <Button
            onClick={() => navigate("/signin")}
            variant="textOnly"
            size="small"
          >
            로그인
          </Button>
          <Button
            onClick={() => navigate("/signup")}
            variant="primary"
            size="small"
          >
            회원가입
          </Button>
        </ButtonWrapper>
      )}
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.div`
  position: absolute;
  top: 0;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 0 auto;
  height: 80px;
  background: rgba(255, 255, 255, 0.5);
  padding: 0 20px;

  @media (min-width: 768px) {
    padding: 0 30px;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 12px;
`;
