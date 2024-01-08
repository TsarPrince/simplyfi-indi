import { dateToDuration } from "@/utils/dateToDuration";
import { Comment } from "@/types";
import React, { useState } from "react";
import Button from "../Button";
import { ToastContentProps, toast } from "react-toastify";
import getUser, { getUserIdSync } from "@/utils/getUser";
import {
  likeComment,
  reportComment,
  unlikeComment,
} from "@/queries/discussion";
import { usePathname } from "next/navigation";
import { mutate } from "swr";
import revalidateDiscussion from "@/actions/revalidateDiscussion";
import Spinner from "../global/Spinner";

const CommentSingle = ({
  comment,
  revalidate,
}: {
  comment: Comment;
  revalidate?: boolean;
}) => {
  const MAX_COMMENT_LENGTH = 90;

  const pathname = usePathname();
  const [more, setMore] = useState(false);
  const [postingLike, setPostingLike] = useState(false);

  const handleUnLike = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id?: number
  ) => {
    e.preventDefault();
    if (!id) return;

    const create = async () => {
      setPostingLike(true);
      const { data, error } = await unlikeComment(id);
      console.log({ data, error, id });
      setPostingLike(false);
      if (error) {
        toast.error(error.message);
        console.log(error);
      }
      if (revalidate) revalidateDiscussion();
      mutate("getAllDiscussions");
    };
    create();
  };

  const handleLike = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    comment: Comment
  ) => {
    e.preventDefault();

    const create = async () => {
      setPostingLike(true);
      const user = await getUser(pathname);
      const { data, error } = await likeComment({
        comment: comment.id,
        user_id: user.id,
      });
      setPostingLike(false);
      if (error) {
        toast.error(error.message);
        console.log(error);
      }
      if (revalidate) revalidateDiscussion();
      mutate("getAllDiscussions");
    };
    create();
  };

  const handleSpam = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    comment: Comment
  ) => {
    e.preventDefault();

    const create = async () => {
      const user = await getUser(pathname);
      const { data, error } = await reportComment({
        comment: comment.id,
        user_id: user.id,
      });
      if (error) throw error;
      if (revalidate) revalidateDiscussion();
      mutate("getAllDiscussions");
    };

    toast.promise(create, {
      pending: "Marking as spam...",
      success: "Done!",
      error: {
        render({ data }: ToastContentProps<any>) {
          return data.message;
        },
      },
    });
  };

  return (
    <div className="flex space-x-4">
      <div className="">
        <img
          className="flex-shrink-0 w-8 h-8 rounded-full object-cover ring-2 ring-slate-200"
          src={comment.user_id.avatar_url ?? ""}
          alt={comment.user_id.full_name ?? ""}
        />
      </div>
      <div className="flex-1">
        <div className="flex justify-between">
          <p className="text-BodyMedium">{comment.user_id.full_name}</p>
          <p
            className="text-BodyMedium2 opacity-60"
            title={new Date(comment.created_at).toLocaleString()}
          >
            {/* ⚠️ TODO : toLocaleString will throw Hydration Error */}
            {/* ⚠️ TODO : dateToDuration also throws Hydration Error when time in s changes b/w client and server */}
            {dateToDuration(new Date(comment.created_at))}
          </p>
        </div>
        <div className="flex justify-between items-center">
          <div className="max-w-screen-md">
            {comment.title.length > MAX_COMMENT_LENGTH ? (
              <>
                <p className="text-BodyMedium2 inline">
                  {more
                    ? comment.title
                    : comment.title.slice(0, MAX_COMMENT_LENGTH) + "..."}
                </p>
                <Button
                  className="text-BodyMedium text-green !p-0 ml-2 !inline"
                  onClick={() => setMore((more) => !more)}
                >
                  {more ? "Read less" : "Read more"}
                </Button>
              </>
            ) : (
              <p className="text-BodyMedium2 inline">{comment.title}</p>
            )}
          </div>
          {/* Like */}
          {comment.comment_like
            ?.map((comment) => comment.user_id)
            .includes(getUserIdSync()) ? (
            <Button
              className="!p-1"
              onClick={(e) => {
                handleUnLike(
                  e,
                  comment.comment_like?.find(
                    (like) => like.user_id === getUserIdSync()
                  )?.id
                );
              }}
            >
              <svg
                width="22"
                height="20"
                viewBox="0 0 22 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  className="text-red-400"
                  d="M19.4578 2.59133C18.9691 2.08683 18.3889 1.68663 17.7503 1.41358C17.1117 1.14054 16.4272 1 15.7359 1C15.0446 1 14.3601 1.14054 13.7215 1.41358C13.0829 1.68663 12.5026 2.08683 12.0139 2.59133L10.9997 3.63785L9.98554 2.59133C8.99842 1.57276 7.6596 1.00053 6.26361 1.00053C4.86761 1.00053 3.52879 1.57276 2.54168 2.59133C1.55456 3.6099 1 4.99139 1 6.43187C1 7.87235 1.55456 9.25383 2.54168 10.2724L3.55588 11.3189L10.9997 19L18.4436 11.3189L19.4578 10.2724C19.9467 9.76814 20.3346 9.16942 20.5992 8.51045C20.8638 7.85148 21 7.14517 21 6.43187C21 5.71857 20.8638 5.01225 20.5992 4.35328C20.3346 3.69431 19.9467 3.09559 19.4578 2.59133Z"
                  fill="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-BodyMedium2">
                {comment.comment_like?.length}
              </span>
            </Button>
          ) : postingLike ? (
            <Button className="!py-1 !px-2">
              <Spinner />
            </Button>
          ) : (
            <Button className="!p-1" onClick={(e) => handleLike(e, comment)}>
              <svg
                width="22"
                height="20"
                viewBox="0 0 22 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                color="currentColor"
              >
                <path
                  opacity="0.4"
                  d="M19.4578 2.59133C18.9691 2.08683 18.3889 1.68663 17.7503 1.41358C17.1117 1.14054 16.4272 1 15.7359 1C15.0446 1 14.3601 1.14054 13.7215 1.41358C13.0829 1.68663 12.5026 2.08683 12.0139 2.59133L10.9997 3.63785L9.98554 2.59133C8.99842 1.57276 7.6596 1.00053 6.26361 1.00053C4.86761 1.00053 3.52879 1.57276 2.54168 2.59133C1.55456 3.6099 1 4.99139 1 6.43187C1 7.87235 1.55456 9.25383 2.54168 10.2724L3.55588 11.3189L10.9997 19L18.4436 11.3189L19.4578 10.2724C19.9467 9.76814 20.3346 9.16942 20.5992 8.51045C20.8638 7.85148 21 7.14517 21 6.43187C21 5.71857 20.8638 5.01225 20.5992 4.35328C20.3346 3.69431 19.9467 3.09559 19.4578 2.59133Z"
                  stroke="#273648"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-BodyMedium2">
                {comment.comment_like?.length}
              </span>
            </Button>
          )}
        </div>
        {/* Report Spam */}
        <Button
          className="!p-0 opacity-60 text-BodySmall hover:opacity-100 group"
          onClick={(e) => {
            handleSpam(e, comment);
          }}
        >
          <span className="group-hover:text-pink-500 group-hover:font-semibold transition duration-300">
            Report Spam
          </span>
          <span className="group-hover:text-pink-500 group-hover:font-semibold transition duration-300">
            {comment.comment_spam?.length}
          </span>
        </Button>
      </div>
    </div>
  );
};

export default CommentSingle;
