import React, { useState } from "react";
import Button from "../Button";
import MyDialog from "../global/Dialog";
import { useRouter } from "next/navigation";

const DialogAddNewPost = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <div>
      <Button onClick={() => setOpen(true)} full border className="bg-white">
        Add new post
      </Button>
      <MyDialog open={open} setOpen={setOpen} title="Add Post">
        <ul className="p-14 pt-8 space-y-2">
          {[
            { title: "Poll", href: "/add-poll" },
            { title: "Metric", href: "/add-metric" },
            { title: "Announcement", href: "/add-announcement" },
            { title: "Discussion", href: "/add-discussion" },
            { title: "Information Post", href: "/add-info-post" },
          ].map((post, key) => (
            <li key={key}>
              <Button
                full
                border
                className="bg-white"
                onClick={() => router.push(post.href)}
              >
                {post.title}
              </Button>
            </li>
          ))}
        </ul>
      </MyDialog>
    </div>
  );
};

export default DialogAddNewPost;
