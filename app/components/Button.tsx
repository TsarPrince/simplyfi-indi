import clsx from "clsx";
import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  full?: boolean;
}

const Button = ({ className, children, full }: ButtonProps) => {
  return (
    <button
      className={clsx(
        "flex items-center space-x-2 bg-transparent p-4 md:px-16 rounded-[4rem] border text-BodyLarge hover:rounded-3xl hover:opacity-75 transition-all duration-300",
        className,
        full ? "w-full" : ""
      )}
    >
      <span className="text-center w-full">{children}</span>
    </button>
  );
};

export default Button;
