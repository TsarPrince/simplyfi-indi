import React from "react";
import NextArrow from "./NextButton";
import Image from "next/image";
import dummy from "public/images/dummy.png";

const DiscussionCard = () => {
  return (
    <div className="bg-blue border p-6 rounded-[2rem] max-w-xl">
      <div className="flex justify-between">
        <p className="text-BodyLarge opacity-70">Fresh off the press</p>
        <NextArrow />
      </div>
      <div className="bg-white border p-4 rounded-3xl flex flex-col space-y-3 mt-4">
        <img src={dummy.src} alt="dummy" />
        <p className="text-BodyMedium2 opacity-40">06/23/23 14:00</p>
        <p className="text-TitleSmall2">
          Studies link emotional wellness to tech usage.
        </p>
      </div>
    </div>
  );
};

export default DiscussionCard;
