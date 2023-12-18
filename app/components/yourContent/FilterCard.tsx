"use client";

import React from "react";
import Button from "../Button";

const FilterCard = () => {
  return (
    <div className="bg-lightBlue border p-6 rounded-[2rem] space-y-4 w-[calc(100vw-2rem)] md:w-full">
      <p className="text-BodyLarge opacity-70">Filter</p>
      <div className="flex space-x-2 overflow-x-scroll">
        <Button border className="!px-2 !py-3">
          All
        </Button>
        <Button border className="!px-2 !py-3">
          Polls
        </Button>
        <Button border className="!px-2 !py-3">
          Announcements
        </Button>
        <Button border className="!px-2 !py-3 !bg-white">
          Discussions
        </Button>
        <Button border className="!px-2 !py-3">
          Posts
        </Button>
      </div>

      <div className="flex items-center justify-center bg-lightBlue rounded-full border pl-4 overflow-hidden transition-all duration-300 focus-within:ring-4 focus-within:ring-blue/50 focus-within:border-blue">
        <svg
          width="18"
          height="19"
          viewBox="0 0 18 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.7473 16.9825L14.4102 13.67C15.7056 12.0537 16.3329 10.0021 16.1631 7.93721C15.9934 5.87227 15.0396 3.95088 13.4978 2.56813C11.9559 1.18538 9.94333 0.446361 7.87376 0.503034C5.80419 0.559708 3.83498 1.40777 2.37103 2.87283C0.907077 4.33789 0.0596628 6.3086 0.00303206 8.37974C-0.0535986 10.4509 0.684859 12.465 2.06656 14.008C3.44826 15.551 5.36819 16.5056 7.43156 16.6754C9.49493 16.8453 11.5449 16.2175 13.16 14.9212L16.47 18.2337C16.5536 18.3181 16.6531 18.3851 16.7627 18.4308C16.8723 18.4765 16.9899 18.5 17.1086 18.5C17.2274 18.5 17.3449 18.4765 17.4546 18.4308C17.5642 18.3851 17.6636 18.3181 17.7473 18.2337C17.9094 18.0659 18 17.8416 18 17.6081C18 17.3747 17.9094 17.1504 17.7473 16.9825ZM8.11399 14.9212C6.8687 14.9212 5.65139 14.5516 4.61597 13.8593C3.58056 13.1669 2.77355 12.1828 2.297 11.0315C1.82045 9.88009 1.69577 8.61316 1.93871 7.39088C2.18165 6.1686 2.78131 5.04586 3.66186 4.16464C4.54241 3.28343 5.66429 2.68331 6.88565 2.44018C8.107 2.19706 9.37297 2.32184 10.5235 2.79875C11.674 3.27566 12.6573 4.08328 13.3491 5.11948C14.041 6.15568 14.4102 7.37392 14.4102 8.62015C14.4102 10.2913 13.7469 11.894 12.5661 13.0757C11.3853 14.2573 9.78386 14.9212 8.11399 14.9212Z"
            fill="#273648"
          />
        </svg>

        <input
          type="text"
          className="w-full bg-transparent border-none py-3 focus:ring-0"
          placeholder="Search"
        />
      </div>
    </div>
  );
};

export default FilterCard;
