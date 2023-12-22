"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { ActiveSideWindow } from "@/types";

import Container from "@/components/Container";
import NextButton from "@/components/NextButton";
import WelcomeCard from "@/components/dashboard/WelcomeCard";
import PollCard from "@/components/dashboard/PollCard";
import InformationCard from "@/components/dashboard/InformationCard";
import DiscussionCard from "@/components/dashboard/DiscussionCard";
import StatsCard from "@/components/dashboard/StatsCard";
import PostCard from "@/components/dashboard/PostCard";
import {
  getAllDiscussions,
  getAllInformation,
  getAllPolls,
} from "../queries/discussion";
import useSWR from "swr";
import Spinner from "../components/global/Spinner";
import Box from "@/components/dashboard/Box";

export default function Home() {
  const [sideWindowOpen, setSideWindowOpen] = useState(false);
  const [active, setActive] = useState<ActiveSideWindow>();

  const toggleSideWindow = (window?: ActiveSideWindow, state?: boolean) => {
    // toggle active state if no state is passed explicitly
    setSideWindowOpen((sideWindowOpen) => (state ? state : !sideWindowOpen));
    if (window) {
      setActive(window);
    }
  };

  const {
    data: discussions,
    error: discussionError,
    isLoading: discussionLoading,
  } = useSWR("getAllDiscussions", async () => {
    const { data, error } = await getAllDiscussions;
    if (error) throw error.message;
    return data;
  });

  const {
    data: polls,
    error: pollError,
    isLoading: pollLoading,
  } = useSWR("getAllPolls", async () => {
    const { data, error } = await getAllPolls;
    if (error) throw error.message;
    return data;
  });

  const {
    data: informations,
    error: informationError,
    isLoading: informationLoading,
  } = useSWR("getAllInformation", async () => {
    const { data, error } = await getAllInformation;
    if (error) throw error.message;
    return data;
  });

  return (
    <div className="bg-lightGray relative h-screen overflow-x-hidden overflow-y-scroll md:overflow-y-auto">
      <NextButton
        className={clsx(
          "z-10 fixed top-6 left-16",
          sideWindowOpen ? "rotate-180 visible" : "rotate-0 invisible"
        )}
        onClick={() => toggleSideWindow(active)}
      />
      <div
        className="bg-lightGray relative flex w-screen overflow-x-hidden"
        style={{
          // ranges from 0.64 to 0.86 approx
          // scale: "0.86",
          transformOrigin: "top",
        }}
      >
        <Container
          className={clsx(
            "flex justify-center transition duration-300",
            sideWindowOpen ? " -translate-x-[32rem]" : ""
          )}
        >
          <div className="grid grid-cols-1 md:grid-cols-12 space-y-8 md:flex-row md:space-y-0 md:space-x-8">
            {/* col - 1 */}
            <div className="col-span-3 flex flex-col space-y-8">
              <WelcomeCard />
              <div className="flex-1">
                {pollLoading ? (
                  <Spinner />
                ) : (
                  <Box
                    toggleSideWindow={() => toggleSideWindow("poll", true)}
                    className="bg-blue"
                    text="Poll Results"
                    fullHeight
                    type="poll"
                  >
                    <PollCard
                      toggleSideWindow={toggleSideWindow}
                      poll={polls?.[0]}
                    />
                  </Box>
                )}
              </div>
            </div>

            {/* col - 2 */}
            <div className="col-span-5 flex flex-col space-y-8">
              {informationLoading ? (
                <Spinner />
              ) : (
                <Box
                  toggleSideWindow={() => toggleSideWindow("information", true)}
                  className="bg-blue"
                  text="Fresh off the press"
                  type="information"
                >
                  <InformationCard
                    information={
                      informations?.filter(
                        (information) => !information.flag
                      )[0]
                    }
                  />
                </Box>
              )}
              <div className="flex-1">
                {discussionLoading ? (
                  <Spinner />
                ) : (
                  <Box
                    toggleSideWindow={() =>
                      toggleSideWindow("discussion", true)
                    }
                    className="bg-green"
                    text="Discussions at a glance"
                    fullHeight
                    type="discussion"
                  >
                    <DiscussionCard discussion={discussions?.[0]} />
                  </Box>
                )}
              </div>
            </div>

            {/* col - 3 */}
            <div className="col-span-4 flex flex-col space-y-8">
              <StatsCard />
              <div className="flex-1">
                {informationLoading ? (
                  <Spinner />
                ) : (
                  <Box
                    toggleSideWindow={() => toggleSideWindow("post", true)}
                    className="bg-brown"
                    text="Your Information Posts"
                    fullHeight
                    type="post"
                  >
                    <PostCard
                      information={
                        informations?.filter(
                          (information) => information.flag
                        )[0]
                      }
                    />
                  </Box>
                )}
              </div>
            </div>
          </div>
        </Container>

        {/* Sidebar */}
        {/* Initially hidden */}
        <div
          className={clsx(
            "absolute right-0 p-4 md:px-16 md:py-8 transition duration-300 w-[calc(32rem+5rem)] h-full",
            sideWindowOpen ? "" : "translate-x-[calc(32rem+5rem)]"
          )}
        >
          <div className="h-full overflow-y-scroll">
            {active === "poll" && (
              <Box
                className="bg-blue"
                toggleSideWindow={() => toggleSideWindow()}
                text="All Polls"
                variant="sidebar"
                type={active}
              >
                {polls?.map((information, key) => (
                  <PollCard
                    key={key}
                    poll={information}
                    toggleSideWindow={toggleSideWindow}
                  />
                ))}
              </Box>
            )}
            {active === "information" && (
              <Box
                className="bg-blue"
                toggleSideWindow={() => toggleSideWindow()}
                text="All Posts"
                variant="sidebar"
                type={active}
              >
                {informations
                  ?.filter((information) => !information.flag)
                  .map((information, key) => (
                    <InformationCard key={key} information={information} />
                  ))}
              </Box>
            )}
            {active === "discussion" && (
              <Box
                className="bg-green"
                toggleSideWindow={() => toggleSideWindow()}
                text="All Discussions"
                variant="sidebar"
                type={active}
              >
                {discussions?.map((discussion, key) => (
                  <DiscussionCard key={key} discussion={discussion} />
                ))}
              </Box>
            )}
            {active === "post" && (
              <Box
                className="bg-brown"
                toggleSideWindow={() => toggleSideWindow()}
                text="All Information Posts"
                variant="sidebar"
                type={active}
              >
                {informations
                  ?.filter((information) => information.flag)
                  .map((information, key) => (
                    <PostCard key={key} information={information} />
                  ))}
              </Box>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
