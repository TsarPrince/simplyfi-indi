import clsx from "clsx";
import React from "react";

const Input = ({
  type,
  className,
  placeholder,
  adornment,
  adornmentPosition,
}: {
  type: "text";
  className?: string;
  placeholder?: string;
  adornment?: React.ReactNode;
  adornmentPosition?: "start" | "end";
}) => {
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
            type="text"
            required
            className="w-full bg-transparent border-none py-3 focus:ring-0"
            placeholder={placeholder}
          />
          {adornmentPosition === "end" && adornment}
        </div>
      );

    default:
      return null;
  }
};

export default Input;
