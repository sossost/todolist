/** @jsxImportSource @emotion/react */

import { useNavigate } from "react-router-dom";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { accessTokenState } from "../../store/recoilAtoms";
import { toast } from "react-hot-toast";

import Logo from "../Logo";
import Button from "../UI/Button";

const Header = () => {
  const navigate = useNavigate();
  const isLoggedin = useRecoilValue(accessTokenState);
  const logout = useResetRecoilState(accessTokenState);

  const handleLogout = () => {
    logout();
    toast.success("로그아웃 되었습니다.");
    navigate("/signin");
  };

  return (
    <div
      css={{
        position: "absolute",
        top: 0,
        boxSizing: "border-box",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        margin: "0 auto",
        height: 80,
        background: "rgba(255, 255, 255, 0.5)",
        padding: "0 30px",
      }}
    >
      <Logo onClick={() => navigate("/")} />
      <div
        css={{
          display: "flex",
          gap: 12,
        }}
      >
        {isLoggedin ? (
          <>
            <Button onClick={handleLogout} variant="textOnly">
              로그아웃
            </Button>
          </>
        ) : (
          <>
            <Button
              onClick={() => navigate("/signin")}
              variant="textOnly"
              size="small"
            >
              로그인
            </Button>
            <Button
              onClick={() => navigate("/signup")}
              variant="secondary"
              size="small"
            >
              회원가입
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
