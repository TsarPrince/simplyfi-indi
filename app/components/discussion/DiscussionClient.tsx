"use client";

import { Discussion } from "@/types";
import React, { useState } from "react";
import Button from "../Button";
import { ToastContentProps, toast } from "react-toastify";
import getUser from "@/utils/getUser";
import { likeComment, postComment, reportComment } from "@/queries/discussion";
import { mutate } from "swr";
import { usePathname } from "next/navigation";
import Input from "../Input";
import { dateToDuration } from "@/queries/dateToDuration";
import Comment from "./Comment";

const DiscussionClient = ({ discussion }: { discussion: Discussion }) => {
  const pathname = usePathname();
  const [comment, setComment] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const create = async () => {
      const user = await getUser(pathname);
      const { data, error } = await postComment({
        discussion_id: discussion.id,
        title: comment,
        user_id: user.id,
      });
      if (error) throw error;
      setComment("");
      mutate("getAllDiscussions");
    };

    toast.promise(create, {
      pending: "Posting comment...",
      success: "Done!",
      error: {
        render({ data }: ToastContentProps<any>) {
          return data.message;
        },
      },
    });
  };

  return (
    <div className="flex flex-col justify-between h-full">
      {/* Section - 1 */}
      <div>
        {/* Publish and Share */}
        <div className="flex space-x-2 pb-12 justify-end">
          <select className="bg-green text-gray focus:ring-0 border-none rounded-full text-BodyLarge">
            <option value="1">Published</option>
            <option value="2">Draft</option>
            <option value="2">Archive</option>
          </select>
          <Button className="!bg-brown !px-6 !py-2">
            <span>Share</span>
            <svg
              width="13"
              height="14"
              viewBox="0 0 13 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.4008 8.40904C10.0169 8.41177 9.63835 8.50594 9.29231 8.68478C8.94626 8.86362 8.64136 9.12269 8.39949 9.44337L5.08557 7.80102C5.24138 7.28788 5.24138 6.73472 5.08557 6.22158L8.39949 4.57923C8.79042 5.08659 9.33541 5.42911 9.93829 5.54636C10.5412 5.6636 11.1632 5.54803 11.6945 5.22003C12.2259 4.89203 12.6325 4.3727 12.8425 3.75369C13.0525 3.13468 13.0524 2.45577 12.8423 1.8368C12.6322 1.21783 12.2255 0.698579 11.6941 0.370687C11.1627 0.0427949 10.5407 -0.0726584 9.93783 0.044703C9.33497 0.162064 8.79003 0.504696 8.39919 1.01213C8.00835 1.51956 7.79674 2.15917 7.80169 2.81808C7.80364 2.98457 7.81886 3.15058 7.84717 3.31428L4.41629 5.01253C4.05051 4.62786 3.58732 4.36784 3.08474 4.26504C2.58217 4.16225 2.06257 4.22125 1.59104 4.43466C1.11951 4.64807 0.717016 5.0064 0.433993 5.46474C0.150969 5.92309 0 6.46108 0 7.0113C0 7.56152 0.150969 8.09951 0.433993 8.55786C0.717016 9.0162 1.11951 9.37453 1.59104 9.58794C2.06257 9.80135 2.58217 9.86036 3.08474 9.75756C3.58732 9.65476 4.05051 9.39474 4.41629 9.01007L7.84717 10.7083C7.81886 10.872 7.80364 11.038 7.80169 11.2045C7.80169 11.7574 7.95413 12.2979 8.23973 12.7576C8.52532 13.2173 8.93126 13.5756 9.40619 13.7872C9.88112 13.9988 10.4037 14.0541 10.9079 13.9463C11.4121 13.8384 11.8752 13.5722 12.2387 13.1812C12.6022 12.7903 12.8498 12.2922 12.9501 11.7499C13.0503 11.2076 12.9989 10.6455 12.8021 10.1347C12.6054 9.62393 12.2723 9.18733 11.8449 8.88016C11.4174 8.57299 10.9149 8.40904 10.4008 8.40904ZM10.4008 1.42034C10.6579 1.42034 10.9091 1.50232 11.1229 1.6559C11.3366 1.80949 11.5031 2.02779 11.6015 2.28319C11.6999 2.53859 11.7256 2.81963 11.6755 3.09077C11.6253 3.3619 11.5015 3.61096 11.3198 3.80643C11.138 4.00191 10.9065 4.13503 10.6544 4.18896C10.4023 4.2429 10.141 4.21522 9.90352 4.10942C9.66605 4.00363 9.46308 3.82448 9.32028 3.59462C9.17748 3.36477 9.10127 3.09453 9.10127 2.81808C9.10127 2.44738 9.23819 2.09186 9.4819 1.82973C9.72562 1.5676 10.0562 1.42034 10.4008 1.42034ZM2.60338 8.40904C2.34635 8.40904 2.09509 8.32706 1.88137 8.17348C1.66766 8.01989 1.50109 7.8016 1.40272 7.54619C1.30436 7.29079 1.27863 7.00975 1.32877 6.73862C1.37892 6.46748 1.50269 6.21843 1.68444 6.02295C1.86619 5.82747 2.09775 5.69435 2.34984 5.64042C2.60194 5.58649 2.86324 5.61417 3.1007 5.71996C3.33817 5.82575 3.54114 6.0049 3.68394 6.23476C3.82674 6.46462 3.90296 6.73485 3.90296 7.0113C3.90296 7.382 3.76604 7.73752 3.52232 7.99965C3.2786 8.26178 2.94805 8.40904 2.60338 8.40904ZM10.4008 12.6023C10.1438 12.6023 9.89255 12.5203 9.67884 12.3667C9.46512 12.2131 9.29855 11.9948 9.20019 11.7394C9.10183 11.484 9.07609 11.203 9.12624 10.9318C9.17638 10.6607 9.30015 10.4116 9.4819 10.2162C9.66365 10.0207 9.89521 9.88757 10.1473 9.83364C10.3994 9.7797 10.6607 9.80738 10.8982 9.91318C11.1356 10.019 11.3386 10.1981 11.4814 10.428C11.6242 10.6578 11.7004 10.9281 11.7004 11.2045C11.7004 11.5752 11.5635 11.9307 11.3198 12.1929C11.0761 12.455 10.7455 12.6023 10.4008 12.6023Z"
                fill="#273648"
              />
            </svg>
          </Button>
        </div>
        {/* comments */}
        <div className="space-y-4 h-[calc(100vh-10rem-56px)] overflow-y-scroll">
          {discussion.comment.map((comment, key) => (
            <Comment comment={comment} key={key} />
          ))}
        </div>
      </div>

      {/* Section - 2 */}
      <form onSubmit={(e) => handleSubmit(e)}>
        <Input
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          type="text"
          placeholder="Keep the conversation going..."
          className="focus-within:ring-green/50 border-none !p-1 bg-white"
          adornment={
            <Button className="!bg-green !px-8">
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 1L10 12"
                  stroke="#273648"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M21 1L14 21L10 12L1 8L21 1Z"
                  stroke="#273648"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Button>
          }
          adornmentPosition="end"
        />
      </form>
    </div>
  );
};

export default DiscussionClient;
