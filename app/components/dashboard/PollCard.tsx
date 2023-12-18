import React from "react";
import NextArrow from "@/components/NextButton";
import { ActiveSideWindow, Poll } from "@/types";

const PollCard = ({
  toggleSideWindow,
  poll,
}: {
  toggleSideWindow: (window?: ActiveSideWindow, state?: boolean) => void;
  poll?: Poll;
}) => {
  if (!poll) return null;
  const totalVotes = poll.poll_option.reduce(
    (acc, option) => acc + option.poll_vote.length,
    0
  );

  return (
    <div>
      <p className="text-BodyLarge mt-8">{poll.title}</p>
      {/* options */}
      <div className="mt-4 space-y-2">
        {poll.poll_option
          ?.map((option) => ({
            title: option.title,
            percentage: Math.round(
              (option.poll_vote.length / totalVotes) * 100
            ),
          }))
          .map((option, key) => (
            <div
              key={key}
              className={`relative z-0 text-BodyMedium bg-white px-4 py-3 flex justify-between rounded-xl overflow-hidden`}
            >
              <div
                className="absolute bg-green bg-opacity-60 inset-0 -z-10"
                style={{ width: `${option.percentage}%` }}
              ></div>
              <p>{option.title}</p>
              <p className="text-BodyMedium text-green">
                {option.percentage} %
              </p>
            </div>
          ))}
      </div>
      <div className="flex place-content-end my-8">
        <NextArrow onClick={() => toggleSideWindow("poll", true)} />
      </div>
    </div>
  );
};

export default PollCard;
