/** @jsxImportSource @emotion/react */

import { ReactNode } from "react";
import { colors } from "../../constants/color";

const ErrorText = ({ children }: { children: ReactNode }) => {
  return (
    <p
      css={{
        fontSize: "12px",
        color: colors.error,
        padding: "4px 15px",
      }}
    >
      {children}
    </p>
  );
};

export default ErrorText;
