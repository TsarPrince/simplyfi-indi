import clsx from "clsx";
import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  full?: boolean;
  border?: boolean;
}

const Button = ({ className, children, full, border }: ButtonProps) => {
  return (
    <button
      className={clsx(
        "flex items-center space-x-2 bg-transparent px-12 py-3 md:px-16 rounded-[4rem] text-BodyLarge hover:rounded-3xl hover:opacity-75 transition-all duration-300",
        full ? "w-full" : "",
        border ? "border" : "",
        className
      )}
    >
      <span className="text-center w-full">{children}</span>
    </button>
  );
};

export default Button;
