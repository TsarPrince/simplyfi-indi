import React from "react";
import NextArrow from "./NextButton";
import dummy from "public/images/dummy.png";
import { ActiveSideWindow, Information } from "@/types";

const InformationCard = ({
  toggleSideWindow,
  information,
}: {
  toggleSideWindow: (window?: ActiveSideWindow, state?: boolean) => void;
  information?: Information;
}) => {
  if (!information) return null;
  return (
    <div className="bg-blue border p-6 rounded-[2rem] max-w-xl">
      <div className="flex justify-between">
        <p className="text-BodyLarge opacity-70">Fresh off the press</p>
        <NextArrow onClick={() => toggleSideWindow("information", true)} />
      </div>
      <div className="bg-white border p-4 rounded-3xl flex flex-col space-y-3 mt-4">
        {information.image && (
          <img
            src={information.image}
            alt="dummy"
            className="h-44 object-cover rounded-3xl"
          />
        )}
        <p className="text-BodyMedium2 opacity-40">
          {new Date(information.created_at).toLocaleString()}
        </p>
        <p className="text-TitleSmall2">{information.title}</p>
      </div>
    </div>
  );
};

export default InformationCard;
