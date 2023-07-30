/** @jsxImportSource @emotion/react */

import { ReactNode } from "react";
import { colors } from "../../constants/color";

const AuthForm = ({ children }: { children: ReactNode }) => {
  return (
    <div
      css={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        margin: "20px 0",
      }}
    >
      <form
        css={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          width: "320px",
          padding: "20px",
        }}
      >
        <h1
          css={{
            fontSize: "22px",
            color: colors.mainFont,
            marginBottom: "20px",
            width: "100%",
          }}
        >
          회원가입
        </h1>
        {children}
      </form>
    </div>
  );
};

export default AuthForm;
