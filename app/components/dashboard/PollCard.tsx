import React from "react";
import NextArrow from "@/components/NextButton";
import { ActiveSideWindow, Poll } from "@/types";
import getUser from "@/utils/getUser";
import { usePathname } from "next/navigation";
import { castVote } from "@/queries/poll";
import { ToastContentProps, toast } from "react-toastify";
import { mutate } from "swr";

const PollCard = ({
  toggleSideWindow,
  poll,
}: {
  toggleSideWindow?: (window?: ActiveSideWindow, state?: boolean) => void;
  poll?: Poll;
}) => {
  const pathname = usePathname();
  if (!poll) return null;

  const handleOptionClick = (poll_option_id: number) => {
    const create = async () => {
      const user = await getUser(pathname);
      console.log(user);
      const { data, error } = await castVote({
        poll_option_id,
        user_id: user.id,
      });
      if (error) throw error;
      mutate("getAllPolls");
    };

    toast.promise(create, {
      pending: "Casting your vote...",
      success: "Done!",
      error: {
        render({ data }: ToastContentProps<any>) {
          return data.message;
        },
      },
    });
  };

  const totalVotes = poll.poll_option.reduce(
    (acc, option) => acc + option.poll_vote.length,
    0
  );

  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        <p className="text-BodyLarge mt-8">{poll.title}</p>
        {/* options */}
        <div className="mt-4 space-y-2">
          {poll.poll_option
            ?.map((option) => ({
              id: option.id,
              title: option.title,
              percentage: totalVotes
                ? Math.round((option.poll_vote.length / totalVotes) * 100)
                : 0,
            }))
            .map((option, key) => (
              <div
                key={key}
                className={`cursor-pointer relative z-0 text-BodyMedium bg-white px-4 py-3 flex justify-between items-center rounded-xl overflow-hidden`}
                onClick={() => handleOptionClick(option.id)}
              >
                <div
                  className="absolute bg-green bg-opacity-60 inset-0 -z-10 transition-all duration-300"
                  style={{ width: `${option.percentage}%` }}
                ></div>
                {/* select-none so voting an option on mobile doesn't selects the text beneath unintentionally */}
                <p className="select-none">{option.title}</p>
                {/* mix-blend-multiply for enhaced color on 100% votes */}
                {/* flex-shrink-0 so percentage and % symbol doesn't split in 2 lines */}
                <p className="text-BodyMedium text-green mix-blend-multiply select-none flex-shrink-0">
                  {option.percentage} %
                </p>
              </div>
            ))}
        </div>
      </div>

      {toggleSideWindow && (
        <div className="flex place-content-end my-8">
          <NextArrow onClick={() => toggleSideWindow("poll", true)} />
        </div>
      )}
    </div>
  );
};

export default PollCard;
