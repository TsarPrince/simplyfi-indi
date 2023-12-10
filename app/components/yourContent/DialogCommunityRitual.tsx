import React, { useState } from "react";
import Button from "../Button";
import MyDialog from "../global/Dialog";
import clsx from "clsx";

const DialogCommunityRitual = () => {
  const [open, setOpen] = useState(false);

  const communityRituals = [
    {
      day: "Sunday",
      title: "Sunday Spotlight",
      description:
        "Every Sunday, we’ll shine a light on a member of our community. This is an opportunity to learn about their experiences, their thoughts on AI, and their role in our community.",
    },
    {
      day: "Monday",
      title: "Weekly AI Challenge",
      description:
        "Each Monday, we'll launch a new AI-related challenge to encourage experimentation, learning, and collaboration. Share your results and insights with the community!",
    },
    {
      day: "Tuesday",
      title: "Information Tuesday",
      description:
        "We will share a fascinating information article, which will get you thinking about the current state of AI.",
    },
    {
      day: "Wednesday",
      title: "Open Forum",
      description:
        "This is your chance to raise any topic related to AI and discuss it with fellow community members. Share your thoughts, questions, and insights.",
    },
    {
      day: "Thursday",
      title: "Thursday Throwback",
      description:
        "Each Thursday, we'll revisit a past event, discussion, or article that sparked interesting conversations and insights within our community.",
    },
    {
      day: "Friday",
      title: "Friday Feedback",
      description:
        "We will share key metrics and data around the community's activity, engagement, and growth. This is an opportunity to understand how we're doing and provide feedback on how we can improve.",
    },
    {
      day: "Saturday",
      title: "Product Poll",
      description:
        "We will ask your opinion to influence product decisions. Your feedback is invaluable in shaping the future of our community platform.",
    },
  ];

  return (
    <div>
      <Button full border onClick={() => setOpen(true)}>
        View Full Ritual
      </Button>
      <MyDialog open={open} setOpen={setOpen} title="Community Ritual">
        <ul className="px-14 py-0 space-y-2">
          {communityRituals.map((ritual, key) => {
            const today = new Date().getDay() === key;
            return (
              <li key={key} className="relative divide-x !m-0">
                <div
                  className={clsx(
                    "absolute w-8 h-8 rounded-full -left-4 top-8",
                    today ? "bg-green" : "bg-gray"
                  )}
                ></div>
                <div className="pl-8 pt-8 last:pb-8 space-y-2">
                  <p className="text-TitleSmall2">
                    {today ? "Today" : ritual.day}
                  </p>
                  <p className="text-TitleSmall2">{ritual.title}</p>
                  <p className="text-BodyMedium2 text-black">
                    {ritual.description}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </MyDialog>
    </div>
  );
};

export default DialogCommunityRitual;
