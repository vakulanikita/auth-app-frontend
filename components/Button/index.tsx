import clsx from "clsx";
import React from "react";
import s from "./Button.module.scss";

interface ButtonProps {
  children: React.ReactNode;
  variant: "primary";
  isLoading: boolean;
  isDisabled: boolean;
  type?: "submit" | "button" | "reset";
  onClick?: () => void
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant,
  isLoading,
  isDisabled,
  type = "button",
  onClick
}) => {
  return (
    <button
      type={type}
      className={clsx(s.root, s[variant], isLoading && s.loading, isDisabled && s.disabled)}
      disabled={isLoading}
      onClick={onClick}
    >
      {/* {children} */}
      {!isLoading ? (
        children
      ) : (
        <svg viewBox="0 0 50 50" className={s.spinner}>
          <circle className={s.ring} cx="25" cy="25" r="22.5" />
          <circle className={s.line} cx="25" cy="25" r="22.5" />
        </svg>
      )}
    </button>
  );
};

export default Button;
