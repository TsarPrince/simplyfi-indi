import React from "react";
import NextArrow from "./NextButton";
import dummy from "public/images/dummy.png";

const InformationCardAll = () => {
  return (
    <div className="bg-blue border p-6 rounded-[2rem] max-w-xl max-h-[calc(100vh-2rem)] overflow-y-scroll">
      <div className="flex justify-between">
        <p className="text-BodyLarge opacity-70">Fresh off the press</p>
        <NextArrow />
      </div>
      {[1, 2, 3, 4, 5, 6].map((card, key) => (
        <div
          key={key}
          className="bg-white border p-4 rounded-3xl flex flex-col space-y-3 mt-4"
        >
          <img src={dummy.src} alt="dummy" />
          <p className="text-BodyMedium2 opacity-40">06/23/23 14:00</p>
          <p className="text-TitleSmall2">
            Studies link emotional wellness to tech usage.
          </p>
        </div>
      ))}
    </div>
  );
};

export default InformationCardAll;
