import clsx from "clsx";
import React, { ButtonHTMLAttributes } from "react";

interface NextButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  variant?: "default" | "back";
}

const NextButton = ({ className, onClick, text, variant }: NextButtonProps) => {
  return (
    <button
      className={clsx("hover:opacity-70 transition duration-300", className)}
      onClick={onClick}
    >
      <div className="flex items-center space-x-4">
        <svg
          width="26"
          height="20"
          viewBox="0 0 26 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={
            variant === "back" ? "rotate-180 transition-all duration-300" : ""
          }
        >
          <path
            d="M16.3444 1.64581L24.6986 10L16.3444 18.3542"
            stroke="#273648"
            strokeWidth="2"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M1.30146 10H24.4647"
            stroke="#273648"
            strokeWidth="2"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <h1 className="text-TitleMedium">{text}</h1>
      </div>
    </button>
  );
};

export default NextButton;
