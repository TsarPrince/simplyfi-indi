import React from "react";
import NextArrow from "./NextButton";

const PollCard = () => {
  return (
    <div className="bg-blue border p-6 rounded-[2rem] max-w-xl">
      <p className="text-BodyLarge opacity-70">Poll Results</p>
      <p className="text-BodyLarge mt-8">
        What’s one thing that you hate doing on your phone?
      </p>
      {/* options */}
      <div className="mt-4 space-y-2">
        {[
          { title: "Social media", percentage: 40 },
          { title: "Constant notifications", percentage: 50 },
          { title: "Too many apps", percentage: 10 },
          { title: "Subscriptions!!!!", percentage: 65 },
        ].map((option, key) => (
          <div
            key={key}
            className={`relative z-0 text-BodyMedium bg-white px-4 py-3 flex justify-between rounded-xl overflow-hidden`}
          >
            <div
              className="absolute bg-green bg-opacity-60 inset-0 -z-10"
              style={{ width: `${option.percentage}%` }}
            ></div>
            <p>{option.title}</p>
            <p className="text-BodyMedium text-green">{option.percentage} %</p>
          </div>
        ))}
      </div>
      <div className="flex place-content-end my-8">
        <NextArrow />
      </div>
    </div>
  );
};

export default PollCard;
