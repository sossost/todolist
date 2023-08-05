/** @jsxImportSource @emotion/react */

import { colors } from "../../constants/color";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "textOnly";
  size?: "small" | "medium" | "large";
  isFullWidth?: boolean;
  disabled?: boolean;
}

const Button = ({
  children,
  variant = "primary",
  size = "medium",
  isFullWidth,
  disabled,
  ...props
}: ButtonProps) => {
  return (
    <button
      css={{
        fontFamily: "inherit",
        outline: "none",
        lineHeight: "24px",
        borderRadius: "10px",
        transition: "all .4s ease",
        width: isFullWidth ? "100%" : "auto",
        cursor: disabled ? "not-allowed" : "pointer",
        filter: disabled ? "opacity(0.7)" : "none",
        ...TYPE_VARIANTS[variant],
        ...TYPE_SIZES[size],
      }}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

const TYPE_VARIANTS = {
  primary: {
    border: `1px solid ${colors.primary}`,
    backgroundColor: colors.primary,
    color: "white",
    "&:hover": {
      backgroundColor: colors.tertiary,
    },
  },
  secondary: {
    border: `1px solid ${colors.primary}`,
    backgroundColor: "transparent",
    color: colors.primary,
    "&:hover": {
      backgroundColor: colors.primary,
      color: "white",
    },
  },
  textOnly: {
    border: "1px solid transparent",
    backgroundColor: "transparent",
    color: colors.primary,
    "&:hover": {
      border: `1px solid ${colors.primary}`,
    },
  },
};

const TYPE_SIZES = {
  small: {
    fontSize: "13px",
    padding: "3px 9px",
    fontWeight: "500",
  },
  medium: {
    fontSize: "16px",
    padding: "8px 16px",
    fontWeight: "600",
  },
  large: {
    fontSize: "20px",
    padding: "10px 20px",
    fontWeight: "700",
  },
};
