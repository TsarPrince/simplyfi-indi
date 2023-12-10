import clsx from "clsx";
import React, { ButtonHTMLAttributes } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  full?: boolean;
  border?: boolean;
}

const Button = ({
  className,
  children,
  onClick,
  full,
  border,
}: ButtonProps) => {
  return (
    <button
      className={clsx(
        "flex items-center space-x-2 bg-transparent px-12 py-3 md:px-16 rounded-full text-BodyLarge hover:opacity-75 focus:opacity-75 active:scale-95 transition-all duration-150",
        full ? "w-full" : "",
        border ? "border" : "",
        className
      )}
      onClick={onClick}
    >
      <span className="text-center w-full">{children}</span>
    </button>
  );
};

export default Button;
