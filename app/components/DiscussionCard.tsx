import React from "react";
import NextArrow from "./NextButton";
import { ActiveSideWindow, DbResult, DbResultOk, Discussion } from "@/types";
import DiscussionCardInner from "./DiscussionCardInner";
import { getAllDiscussions } from "@/queries/discussion";

const DiscussionCard = ({
  toggleSideWindow,
  discussion,
}: {
  toggleSideWindow: (window?: ActiveSideWindow, state?: boolean) => void;
  discussion?: Discussion;
}) => {
  return (
    <div className="bg-green border p-6 rounded-[2rem] max-w-xl">
      <div className="flex justify-between">
        <p className="text-BodyLarge opacity-70">Discussions at a glance</p>
        <NextArrow onClick={() => toggleSideWindow("discussion", true)} />
      </div>
      <DiscussionCardInner discussion={discussion} />
    </div>
  );
};

export default DiscussionCard;
