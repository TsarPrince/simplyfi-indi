import Link from "next/link";
import React from "react";

const WelcomeCard = () => {
  return (
    <div className="max-w-xl space-y-4">
      <div>
        <h2 className="text-TitleLarge2">
          Welcome <br />
          Shreyas 👋
        </h2>
      </div>
      <div>
        <p className="text-TitleSmall opacity-60">Your subscribers</p>
        <h2 className="text-TitleLarge2">1,576</h2>
      </div>
      <div className="space-y-2">
        <button className="flex items-center space-x-2 bg-white px-12 py-6 rounded-[4rem] border text-BodyLarge hover:rounded-3xl hover:opacity-75 transition-all duration-300">
          View All My Subscribers
        </button>
        <button>
          <Link href="/your-content">
            <div className="flex items-center space-x-2 bg-green px-12 py-6 rounded-[4rem] border text-BodyLarge hover:rounded-3xl hover:opacity-75 transition-all duration-300">
              <span>View All My Content</span>
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
            </div>
          </Link>
        </button>
      </div>
    </div>
  );
};

export default WelcomeCard;
