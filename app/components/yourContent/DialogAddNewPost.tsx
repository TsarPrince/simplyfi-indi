import React, { useState } from "react";
import Button from "@/components/Button";
import MyDialog from "@/components/global/Dialog";
import Link from "next/link";

const DialogAddNewPost = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setOpen(true)} full className="bg-white">
        Add new post
      </Button>
      <MyDialog open={open} setOpen={setOpen} title="Add Post">
        <ul className="p-14 pt-8 space-y-2">
          {[
            { title: "Poll", href: "/add-poll" },
            { title: "Metric", href: "/add-metric" },
            { title: "Announcement", href: "/your-content" },
            { title: "Discussion", href: "/add-discussion" },
            { title: "Information Post", href: "/add-info-post" },
          ].map((post, key) => (
            <li key={key}>
              <Link href={post.href}>
                <Button full border className="bg-white !px-12">
                  {post.title}
                </Button>
              </Link>
            </li>
          ))}
        </ul>
      </MyDialog>
    </div>
  );
};

export default DialogAddNewPost;
