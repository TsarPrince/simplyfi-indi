import Link from "next/link";
import React from "react";
import Button from "@/components/Button";
import DialogSubscribers from "@/components/dashboard/DialogSubscribers";
import formatNumber from "@/utils/formatNumber";

const WelcomeCard = ({ subscribersCount }: { subscribersCount?: number }) => {
  return (
    <div className="max-w-xl space-y-4">
      <div>
        <h2 className="text-TitleLarge2">
          Welcome <br />
          User 👋
        </h2>
      </div>
      <div>
        <p className="text-TitleSmall opacity-60">Your subscribers</p>
        <h2 className="text-TitleLarge2">
          {formatNumber(subscribersCount) || "—"}
        </h2>
      </div>
      <div className="space-y-2">
        <DialogSubscribers />
        <div>
          <Link href="/your-content">
            <Button full className="!bg-green py-6">
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
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WelcomeCard;
