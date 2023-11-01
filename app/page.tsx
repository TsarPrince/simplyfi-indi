"use client";

import { useState } from "react";
import clsx from "clsx";
import { ActiveSideWindow } from "@/app/types";

import StatsCard from "@/app/components/StatsCard";
import WelcomeCard from "@/app/components/WelcomeCard";
import Container from "@/app/components/Container";
import NextButton from "@/app/components/NextButton";
import DiscussionCard from "@/app/components/DiscussionCard";
import DiscussionCardAll from "@/app/components/DiscussionCardAll";
import InformationCard from "@/app/components/InformationCard";
import InformationCardAll from "@/app/components/InformationCardAll";
import PollCard from "@/app/components/PollCard";
import PollCardAll from "@/app/components/PollCardAll";
import PostCard from "@/app/components/PostCard";
import PostCardAll from "@/app/components/PostCardAll";

export default function Home() {
  const [sideWindowOpen, setSideWindowOpen] = useState(false);
  const [active, setActive] = useState<ActiveSideWindow>();

  const toggleSideWindow = (window?: ActiveSideWindow, state?: boolean) => {
    // toggle active state if no state is passed explicitly
    setSideWindowOpen((sideWindowOpen) => (state ? state : !sideWindowOpen));
    setActive(window);
  };

  return (
    <div className="relative overflow-x-hidden">
      <NextButton
        className={clsx(
          "z-10 fixed rotate-180 top-6 left-16",
          sideWindowOpen ? "" : "hidden"
        )}
        onClick={() => toggleSideWindow(active)}
      />
      <div className="bg-lightGray flex w-screen overflow-x-hidden">
        <Container
          className={clsx(
            "flex justify-center transition duration-300",
            sideWindowOpen ? " -translate-x-[32rem]" : ""
          )}
        >
          <div className="flex flex-col space-y-8 md:flex-row md:space-y-0 md:space-x-8">
            <div className="flex flex-col space-y-8">
              <WelcomeCard />
              <PollCard toggleSideWindow={toggleSideWindow} />
            </div>
            <div className="flex flex-col space-y-8">
              <InformationCard toggleSideWindow={toggleSideWindow} />
              <DiscussionCard toggleSideWindow={toggleSideWindow} />
            </div>
            <div className="flex flex-col space-y-8">
              <StatsCard />
              <PostCard toggleSideWindow={toggleSideWindow} />
            </div>
          </div>
        </Container>
        <div
          className={clsx(
            "absolute right-0 p-4 md:px-16 md:py-14 transition duration-300 w-[calc(32rem+5rem)]",
            sideWindowOpen ? "" : "translate-x-[calc(32rem+5rem)]"
          )}
        >
          {active === "poll" && <PollCardAll />}
          {active === "information" && <InformationCardAll />}
          {active === "discussion" && <DiscussionCardAll />}
          {active === "post" && <PostCardAll />}
        </div>
      </div>
    </div>
  );
}
