import clsx from "clsx";
import React, { ButtonHTMLAttributes } from "react";

interface NextButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  variant?: "default" | "close" | "back";
}

const NextButton = ({ className, onClick, text, variant }: NextButtonProps) => {
  return (
    <button
      className={clsx("hover:opacity-70 transition duration-300", className)}
      onClick={onClick}
    >
      <div className="flex items-center space-x-4">
        {variant === "close" ? (
          // cross svg
          <svg
            width="14"
            height="15"
            viewBox="0 0 14 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13 13.7606L1 1.49219M13 1.49219L1 13.7607"
              stroke="#273648"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        ) : (
          // next svg
          <svg
            width="26"
            height="20"
            viewBox="0 0 26 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            // next svg flipped
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
        )}
        <h1 className="text-TitleMedium">{text}</h1>
      </div>
    </button>
  );
};

export default NextButton;
