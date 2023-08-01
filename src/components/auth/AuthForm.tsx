/** @jsxImportSource @emotion/react */

import { ReactNode } from "react";
import { colors } from "../../constants/color";

interface AuthFormProps {
  children: ReactNode;
  title: string;
}

const AuthForm = ({ children, title }: AuthFormProps) => {
  return (
    <div
      css={{
        width: "100%",
        height: "100%",
        display: "flex",
      }}
    >
      <form
        css={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          flexDirection: "column",
          width: "360px",
          padding: "40px",
          borderRadius: "20px",
          background: "rgba(255, 255, 255, 0.5)",
        }}
      >
        <h1
          css={{
            fontSize: "22px",
            color: colors.mainFont,
            marginBottom: "16px",
            width: "100%",
          }}
        >
          {title}
        </h1>
        {children}
      </form>
    </div>
  );
};

export default AuthForm;
