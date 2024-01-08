"use client";

import { Discussion } from "@/types";
import React, { useState } from "react";
import Button from "../Button";
import { ToastContentProps, toast } from "react-toastify";
import getUser from "@/utils/getUser";
import { postComment } from "@/queries/discussion";
import { usePathname } from "next/navigation";
import Input from "../Input";
import Comment from "./Comment";
import revalidateDiscussion from "@/actions/revalidateDiscussion";

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
      revalidateDiscussion();
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
      <div className="mt-12 space-y-4 h-[calc(100vh-5rem-56px)] overflow-y-scroll">
        {discussion.comment.map((comment, key) => (
          <Comment comment={comment} key={key} revalidate={true} />
        ))}
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
