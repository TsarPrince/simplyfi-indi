import React from "react";

const NextButton = () => {
  return (
    <button className="hover:opacity-70 transition duration-300">
      <svg
        width="26"
        height="20"
        viewBox="0 0 26 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
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
    </button>
  );
};

export default NextButton;
