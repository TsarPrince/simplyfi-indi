import Link from "next/link";
import React from "react";
import Button from "./Button";
import getDay from "../utils/getDay";

const WelcomeCard2 = () => {
  const DAY = getDay(new Date().getDay());
  const [_, MONTH, DATE, YEAR] = new Date().toDateString().split(" ");

  return (
    <div className="max-w-xl space-y-12">
      <div>
        <h2 className="text-TitleLarge2">
          Your <br />
          Content
        </h2>
      </div>
      <div className="space-y-6">
        <Button className="!bg-green">Add new post</Button>
        <div className="bg-green border p-6 rounded-[2rem] space-y-3 max-w-xl flex flex-col items-center">
          <div className="text-center">
            <p className="text-TitleSmall2">{DAY}</p>
            <p className="text-TitleSmall2">
              {MONTH.toUpperCase()} {DATE} <br /> {YEAR}
            </p>
          </div>
          <p className="text-BodyMedium">
            Keep up with your <br /> Community Ritual
          </p>
          <div className="space-y-2 w-full">
            <Button className="!bg-lightBlue">Create a new Info Post</Button>
            <Button>View Full Ritual</Button>
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-BodyLarge opacity-70">Quick Links</p>
        <Button className="bg-lightGray">Make an Announcement</Button>
        <Button className="bg-lightGray">Drafts</Button>
        <Button className="bg-lightGray">Feeds</Button>
      </div>
      <div className="space-y-2">
        <p className="text-BodyLarge opacity-70">Community</p>
        <Button className="bg-lightGray">Community Guidelines</Button>
      </div>
    </div>
  );
};

export default WelcomeCard2;
