/** @jsxImportSource @emotion/react */

import { ReactNode } from "react";
import { colors } from "../../constants/color";
import { css } from "@emotion/react";

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
        css={css`
          position: absolute;
          top: 40%;
          left: 50%;
          transform: translate(-50%, -55%);
          display: flex;
          flex-direction: column;
          width: 100%;
          max-width: 450px;
          padding: 30px;
          border-radius: 20px;
          background: rgba(255, 255, 255, 0.5);
          @media (min-width: 768px) {
            width: 100%;
            max-width: 360px;
            padding: 40px;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -55%);
          }
        `}
      >
        <h1
          css={{
            fontSize: "19px",
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
