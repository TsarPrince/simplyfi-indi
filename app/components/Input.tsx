import clsx from "clsx";
import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  adornment?: React.ReactNode;
  adornmentPosition?: "start" | "end";
}

const Input = ({
  type,
  className,
  adornment,
  adornmentPosition,
  ...inputProps
}: InputProps) => {
  switch (type) {
    case "text":
      return (
        <div
          className={clsx(
            "flex items-center justify-center rounded-full border px-4 overflow-hidden transition-all duration-300 focus-within:ring-4",
            className
          )}
        >
          {adornmentPosition === "start" && adornment}
          <input
            type={type}
            required
            className="w-full bg-transparent border-none py-3 focus:ring-0"
            {...inputProps}
          />
          {adornmentPosition === "end" && adornment}
        </div>
      );
    case "number":
      return (
        <div
          className={clsx(
            "flex items-center justify-center rounded-full border overflow-hidden transition-all duration-300 focus-within:ring-4",
            className
          )}
        >
          <input
            type={type}
            step={0.01}
            required
            className="w-full bg-transparent border-none py-3 focus:ring-0"
            {...inputProps}
          />
        </div>
      );
    case "datetime-local":
      return (
        <div
          className={clsx(
            "flex items-center justify-center rounded-full border overflow-hidden transition-all duration-300 focus-within:ring-4",
            className
          )}
        >
          <input
            type={type}
            required
            className="w-full bg-transparent border-none py-3 focus:ring-0"
            {...inputProps}
          />
        </div>
      );

    default:
      return null;
  }
};

export default Input;
