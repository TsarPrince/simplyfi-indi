import React from "react";
import Link from "next/link";
import Container from "@/components/Container";
import NextButton from "@/components/NextButton";
import clsx from "clsx";

const AddLayout = ({
  title,
  subTitle,
  sidebarSuggestions,
  sidebarSuggestionAction,
  children,
  center = true,
}: {
  title: string;
  subTitle: string;
  sidebarSuggestions: any[];
  sidebarSuggestionAction: any;
  children: React.ReactNode;
  center?: boolean;
}) => {
  return (
    <div className="bg-lightGray flex w-screen min-h-screen overflow-x-hidden">
      <Container className="flex flex-col lg:flex-row w-full lg:h-screen">
        {/* sidebar */}
        <aside className="flex flex-col lg:pr-12 relative">
          <div className="flex">
            <Link href={"/your-content"}>
              <NextButton variant="back" text={title} />
            </Link>
          </div>
          {/* Suggested Polls */}
          <div className="flex flex-col justify-center h-full">
            <p className="text-TitleSmall2 opacity-40">{subTitle}</p>
            <ul className="flex space-x-0 sm:space-x-4 lg:space-x-0 flex-col sm:flex-row lg:flex-col space-y-3 sm:space-y-0 lg:space-y-3 py-4">
              {sidebarSuggestions.map((sidebarSuggestion, key) => (
                <li key={key}>
                  <button
                    className="bg-white w-full h-full rounded-[2rem] py-4 px-8 space-y-4 flex flex-col items-center justify-center max-w-sm transition-all duration-300 focus-within:ring-4 focus-within:ring-blue/50"
                    onClick={() => sidebarSuggestionAction(sidebarSuggestion)}
                  >
                    <svg
                      width="16"
                      height="21"
                      viewBox="0 0 16 21"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M8 1.75C4.52397 1.75 1.75 4.46727 1.75 7.76594C1.75 9.77053 2.57093 11.4993 4.03534 12.576C4.3581 12.8133 4.63421 13.1672 4.73996 13.6162C4.82675 13.9847 4.92608 14.4337 5.02447 14.9095H7.25V13.8271C7.25 13.6844 7.29071 13.5447 7.36734 13.4243L8.16916 12.1649L6.37011 10.7521C6.06687 10.5139 5.9936 10.0847 6.20068 9.75941L7.36734 7.92697C7.5898 7.57756 8.05339 7.47465 8.4028 7.69711C8.7522 7.91957 8.85512 8.38316 8.63266 8.73256L7.83084 9.99195L9.62989 11.4048C9.93313 11.6429 10.0064 12.0722 9.79932 12.3974L8.75 14.0456V14.9095H10.9755C11.0739 14.4337 11.1732 13.9847 11.26 13.6162C11.3658 13.1672 11.6419 12.8133 11.9647 12.576C13.4291 11.4993 14.25 9.77053 14.25 7.76594C14.25 4.46727 11.476 1.75 8 1.75ZM10.6887 16.4095H5.31128C5.42169 17.0471 5.50831 17.6509 5.53454 18.0844C5.56215 18.5408 5.90326 18.9498 6.40621 19.0585L6.60219 19.1009C7.52262 19.2997 8.47738 19.2997 9.39781 19.1009L9.59379 19.0585C10.0967 18.9498 10.4379 18.5408 10.4655 18.0844C10.4917 17.6509 10.5783 17.0471 10.6887 16.4095ZM0.25 7.76594C0.25 3.59116 3.74404 0.25 8 0.25C12.256 0.25 15.75 3.59116 15.75 7.76594C15.75 10.1898 14.7464 12.3926 12.8532 13.7845C12.7668 13.848 12.7307 13.9148 12.7201 13.9601C12.6017 14.4627 12.4575 15.128 12.326 15.8029C12.1432 16.7412 11.9944 17.6512 11.9627 18.175C11.8927 19.3332 11.0406 20.2805 9.91056 20.5247L9.71459 20.567C8.58538 20.811 7.41462 20.811 6.28541 20.567L6.08944 20.5247C4.95941 20.2805 4.10735 19.3332 4.03727 18.175C4.00558 17.6512 3.85678 16.7412 3.67399 15.8029C3.5425 15.128 3.3983 14.4627 3.27991 13.9601C3.26925 13.9148 3.23315 13.848 3.14681 13.7845C1.25357 12.3926 0.25 10.1898 0.25 7.76594Z"
                        fill="#4EC2C2"
                      />
                    </svg>
                    <p className="text-center text-BodyLarge">
                      {sidebarSuggestion.question}
                    </p>
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="hidden lg:block absolute bg-gray/50 w-[1px] right-0 -top-14 -bottom-14"></div>
        </aside>

        {/* main */}
        <main
          className={clsx(
            "flex-1 pt-12 lg:pt-0 lg:pl-12 lg:overflow-y-scroll",
            center ? "flex items-center" : ""
          )}
        >
          {children}
        </main>
      </Container>
    </div>
  );
};

export default AddLayout;
