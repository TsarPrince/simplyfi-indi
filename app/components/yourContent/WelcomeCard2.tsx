import React from "react";
import Button from "../Button";
import getDay from "../../utils/getDay";
import DialogAddNewPost from "@/components/yourContent/DialogAddNewPost";
import DialogCommunityRitual from "./DialogCommunityRitual";
import DialogCommunityRules from "./DialogCommunityRules";
import Link from "next/link";
import { Tables } from "@/types/database.types";
import Spinner from "../global/Spinner";
import useSWR from "swr";
import { getRitual } from "@/queries/ritual";

const WelcomeCard2 = () => {
  const FULL_DAY = getDay(new Date().getDay());
  const [DAY, MONTH, DATE, YEAR] = new Date().toDateString().split(" ");

  const {
    data: ritual,
    error: ritualError,
    isLoading: ritualLoading,
  } = useSWR("getRitual", async () => {
    const { data, error } = await getRitual;
    if (error) throw error.message;
    return data;
  });

  let contentType,
    addContentLink = "";

  const CONTENTS = {
    ANNOUNCEMENT: { name: "Announcement", link: "/add-announcement" },
    INFORMATION: { name: "Info Post", link: "/add-info-post" },
    DISCUSSION: { name: "Discussion", link: "/add-discussion" },
    POLL: { name: "Poll", link: "/add-poll" },
    METRIC: { name: "Metric", link: "/add-metric" },
  };
  ritual?.find((ritual) => {
    if (ritual.day === DAY.toUpperCase()) {
      const { name, link } = CONTENTS[ritual.content_type];
      contentType = name;
      addContentLink = link;
    }
  });

  return (
    <div className="max-w-xl space-y-12">
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
            <p className="text-TitleSmall2">{FULL_DAY}</p>
            <p className="text-TitleSmall2">
              {MONTH.toUpperCase()} {DATE} <br /> {YEAR}
            </p>
          </div>
          <p className="text-BodyMedium">
            Keep up with your <br /> Community Ritual
          </p>
          <div className="space-y-2 w-full">
            {ritualLoading ? (
              <div className="bg-white rounded-full h-[51px] flex items-center justify-center">
                <div className="w-32 h-2.5 bg-slate-300 rounded-full animate-pulse"></div>
              </div>
            ) : (
              <Link href={addContentLink}>
                <Button className="!bg-white" full>
                  Create a new {contentType}
                </Button>
              </Link>
            )}
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
