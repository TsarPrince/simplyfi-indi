"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import useSWR from "swr";
import { ActiveSideWindow } from "@/types";

import Container from "@/components/Container";
import NextButton from "@/components/NextButton";
import WelcomeCard from "@/components/dashboard/WelcomeCard";
import PollCard from "@/components/dashboard/PollCard";
import InformationCard from "@/components/dashboard/InformationCard";
import DiscussionCard from "@/components/dashboard/DiscussionCard";
import StatsCard from "@/components/dashboard/StatsCard";
import PostCard from "@/components/dashboard/PostCard";
import { getAllDiscussions } from "@/queries/discussion";
import { getAllPolls } from "@/queries/poll";
import { getAllInformation } from "@/queries/information";
import Box from "@/components/dashboard/Box";
import PollSkeleton from "@/components/skeletons/PollSkeleton";
import InformationSkeleton from "@/components/skeletons/InformationSkeleton";
import DiscussionSkeleton from "@/components/skeletons/DiscussionSkeleton";
import StatsSkeleton from "@/components/skeletons/StatsSkeleton";
import { getAllProfiles } from "@/queries/profile";
import DialogGetNotificationsPermission from "@/components/dashboard/DialogGetNotificationsPermission";

export default function Home() {
  const [sideWindowOpen, setSideWindowOpen] = useState(false);
  const [active, setActive] = useState<ActiveSideWindow>();
  const containerRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const toggleSideWindow = (window?: ActiveSideWindow, state?: boolean) => {
    // toggle active state if no state is passed explicitly
    setSideWindowOpen((sideWindowOpen) => (state ? state : !sideWindowOpen));
    if (window) {
      setActive(window);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    const sidebar = sidebarRef.current;
    const offset = 80; // 5rem

    if (container && sidebar) {
      const containerWidth = container.clientWidth;
      const sidebarWidth = sidebar.clientWidth;

      // if both windows overflow the screen
      // translate both to the left by an extra overlowShift
      let overflowShift = 0;
      if (containerWidth + sidebarWidth > innerWidth) {
        overflowShift = (containerWidth + sidebarWidth - innerWidth) / 2;
      }

      // switch translateX depending on sideWindowOpen
      if (sideWindowOpen) {
        container.style.transform = `translateX(${
          -sidebarWidth / 2 - overflowShift
        }px)`;
        sidebar.style.transform = `translateX(${
          (containerWidth + sidebarWidth - innerWidth - offset) / 2 -
          overflowShift
        }px)`;
      } else {
        container.style.transform = "translateX(0px)";
        sidebar.style.transform = `translateX(100%)`;
      }
    }
  }, [sideWindowOpen]);

  const {
    data: discussions,
    error: discussionError,
    isLoading: discussionLoading,
  } = useSWR("getAllDiscussions", async () => {
    const { data, error } = await getAllDiscussions;
    if (error) throw error.message;

    // remove comment if comment_spam is more than 3
    data.forEach((discussion) => {
      discussion.comment = discussion.comment.filter(
        (comment) => comment.comment_spam.length <= 3
      );
    });

    // sort comments in descending order of created_at
    return data.map((discussion) => {
      discussion.comment = discussion.comment.sort((a, b) => {
        return (
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      });
      return discussion;
    });
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

  const {
    data: profiles,
    error: profilesError,
    isLoading: profilesLoading,
  } = useSWR("getAllProfiles", async () => {
    const { data, error } = await getAllProfiles;
    if (error) throw error.message;
    return data;
  });

  return (
    <div className="bg-lightGray relative h-screen overflow-x-hidden overflow-y-scroll md:overflow-y-auto">
      <NextButton
        className={clsx(
          "z-10 fixed top-6 left-10",
          sideWindowOpen ? "rotate-180 visible" : "rotate-0 invisible"
        )}
        onClick={() => toggleSideWindow(active)}
      />
      <div
        className="bg-lightGray relative flex w-screen overflow-x-hidden"
        style={{
          // ranges from 0.64 to 0.86 approx
          // scale: "0.64",
          transformOrigin: "top",
        }}
      >
        <Container
          className={clsx("flex justify-center transition duration-300")}
          ref={containerRef}
        >
          <DialogGetNotificationsPermission />
          <div className="grid grid-cols-1 md:grid-cols-12 space-y-8 md:flex-row md:space-y-0 md:space-x-4">
            {/* col - 1 */}
            <div className="col-span-3 flex flex-col space-y-4">
              <WelcomeCard subscribersCount={profiles?.length} />
              <div className="flex-1">
                <Box
                  toggleSideWindow={() => toggleSideWindow("poll", true)}
                  className="bg-blue"
                  text="Poll Results"
                  fullHeight
                  type="poll"
                >
                  {pollLoading ? (
                    <PollSkeleton />
                  ) : (
                    <PollCard
                      toggleSideWindow={toggleSideWindow}
                      poll={polls?.[0]}
                    />
                  )}
                </Box>
              </div>
            </div>

            {/* col - 2 */}
            <div className="col-span-5 flex flex-col space-y-4">
              <Box
                toggleSideWindow={() => toggleSideWindow("information", true)}
                className="bg-blue"
                text="Fresh off the press"
                type="information"
              >
                {informationLoading ? (
                  <InformationSkeleton />
                ) : (
                  <InformationCard
                    information={
                      informations?.filter(
                        (information) => !information.flag
                      )[0]
                    }
                  />
                )}
              </Box>
              <div className="flex-1">
                <Box
                  toggleSideWindow={() => toggleSideWindow("discussion", true)}
                  className="bg-green"
                  text="Discussions at a glance"
                  fullHeight
                  type="discussion"
                >
                  {discussionLoading ? (
                    <DiscussionSkeleton />
                  ) : (
                    <DiscussionCard discussion={discussions?.[0]} />
                  )}
                </Box>
              </div>
            </div>

            {/* col - 3 */}
            <div className="col-span-4 flex flex-col space-y-4">
              {profilesLoading ||
              pollLoading ||
              informationLoading ||
              discussionLoading ? (
                <StatsSkeleton />
              ) : (
                <StatsCard
                  numOfUsers={profiles?.length}
                  numOfPolls={polls?.length}
                  numOfPosts={
                    informations?.filter((information) => information.flag)
                      .length
                  }
                />
              )}

              <div className="flex-1">
                <Box
                  toggleSideWindow={() => toggleSideWindow("post", true)}
                  className="bg-brown"
                  text="Your Information Posts"
                  fullHeight
                  type="post"
                >
                  {informationLoading ? (
                    <InformationSkeleton />
                  ) : (
                    <PostCard
                      information={
                        informations?.filter(
                          (information) => information.flag
                        )[0]
                      }
                    />
                  )}
                </Box>
              </div>
            </div>
          </div>
        </Container>

        {/* Sidebar */}
        {/* Initially hidden - translateX managed by useEffect */}
        <div
          className={clsx(
            "absolute right-0 p-4 md:py-8 transition duration-300 w-[28rem] h-full"
          )}
          ref={sidebarRef}
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
                  <>
                    <DiscussionCard key={key} discussion={discussion} />
                  </>
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
