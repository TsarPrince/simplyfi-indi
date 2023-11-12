import React from "react";
import NextArrow from "./NextButton";
import { ActiveSideWindow } from "@/types";
import DiscussionCardInner from "./DiscussionCardInner";

const DiscussionCard = ({
  toggleSideWindow,
}: {
  toggleSideWindow: (window?: ActiveSideWindow, state?: boolean) => void;
}) => {
  return (
    <div className="bg-green border p-6 rounded-[2rem] max-w-xl">
      <div className="flex justify-between">
        <p className="text-BodyLarge opacity-70">Discussions at a glance</p>
        <NextArrow onClick={() => toggleSideWindow("discussion", true)} />
      </div>
      <DiscussionCardInner />
    </div>
  );
};

export default DiscussionCard;
