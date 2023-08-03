/** @jsxImportSource @emotion/react */

import { InputHTMLAttributes } from "react";
import { colors } from "../../constants/color";

const EditInput = ({ ...props }: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      css={{
        boxSizing: "content-box",
        outline: "none",
        border: "none",
        padding: "8px 10px 6px 10px",
        fontSize: "16px",
        lineHeight: "16px",
        fontWeight: 600,
        width: "100%",
        color: colors.mainFont,
        background: "rgba(255, 255, 255, 0.3)",
        borderRadius: "10px",
        boxShadow: `inset 0 0 0 1px ${colors.secondary}`,
        "&:focus": {
          boxShadow: `inset 0 0 0 2px ${colors.primary}`,
        },
      }}
      {...props}
    />
  );
};

export default EditInput;
