import React from "react";
import Button from "../Button";
import getDay from "../../utils/getDay";
import DialogAddNewPost from "@/components/yourContent/DialogAddNewPost";
import DialogCommunityRitual from "./DialogCommunityRitual";
import DialogCommunityRules from "./DialogCommunityRules";
import Link from "next/link";

const WelcomeCard2 = () => {
  const DAY = getDay(new Date().getDay());
  const [_, MONTH, DATE, YEAR] = new Date().toDateString().split(" ");

  return (
    <div className="max-w-xl space-y-12 pt-12 3xl:pt-4">
      <div>
        <h2 className="text-TitleLarge2 mt-10 md:mt-0">
          Your <br />
          Content
        </h2>
      </div>
      <div className="space-y-6">
        <DialogAddNewPost />
        <div className="bg-lightBlue p-6 rounded-[2rem] space-y-3 max-w-xl flex flex-col items-center">
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
            <Link href="/add-info-post">
              <Button className="!bg-white" full>
                Create a new Info Post
              </Button>
            </Link>
            <DialogCommunityRitual />
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-BodyLarge opacity-70">Quick Links</p>
        <Button full border className="bg-lightGray">
          Make an Announcement
        </Button>
        <Button full border className="bg-lightGray">
          Drafts
        </Button>
        <Button full border className="bg-lightGray">
          Feeds
        </Button>
      </div>
      <div className="space-y-2">
        <p className="text-BodyLarge opacity-70">Community</p>
        <DialogCommunityRules />
      </div>
    </div>
  );
};

export default WelcomeCard2;
