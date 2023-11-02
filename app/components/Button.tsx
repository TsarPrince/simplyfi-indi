import clsx from "clsx";
import React, { ButtonHTMLAttributes } from "react";

const Button = ({
  className,
  children,
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className={clsx(
        "w-full flex items-center space-x-2 bg-transparent p-4 md:px-16 rounded-[4rem] border text-BodyLarge hover:rounded-3xl hover:opacity-75 transition-all duration-300",
        className
      )}
    >
      <span className="text-center w-full">{children}</span>
    </button>
  );
};

export default Button;
