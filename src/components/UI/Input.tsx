/** @jsxImportSource @emotion/react */

import {
  Children,
  HTMLAttributes,
  InputHTMLAttributes,
  ReactElement,
  cloneElement,
} from "react";
import uuid from "react-uuid";
import { colors } from "../../constants/color";

interface InputProps extends HTMLAttributes<HTMLDivElement> {
  label?: string;
  children: ReactElement;
}

const Input = ({ label, children, ...props }: InputProps) => {
  const firstChild = Children.only(children);
  const id = firstChild.props.id ?? uuid();

  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        width: "100%",
        gap: 6,
      }}
      {...props}
    >
      <label
        htmlFor={id}
        css={{
          fontSize: "16px",
          fontWeight: 500,
          color: colors.mainFont,
        }}
      >
        {label}
      </label>
      {cloneElement(firstChild, {
        id,
        ...firstChild.props,
      })}
    </div>
  );
};

export default Input;

interface TextFiledProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

Input.TextFiled = ({ error, ...props }: TextFiledProps) => {
  return (
    <input
      css={{
        boxSizing: "border-box",
        border: "none",
        outline: "none",
        width: "100%",
        padding: "12px 16px",
        fontSize: "16px",
        background: "rgba(255, 255, 255, 0.2)",
        color: colors.mainFont,
        borderRadius: "10px",
        boxShadow: `inset 0 0 0 1px ${error ? colors.error : colors.secondary}`,
        "&:focus": {
          boxShadow: `inset 0 0 0 2px ${error ? colors.error : colors.primary}`,
        },
      }}
      {...props}
    />
  );
};
