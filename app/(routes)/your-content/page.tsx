"use client";

import clsx from "clsx";
import Container from "@/components/Container";
import NextButton from "@/components/NextButton";
import { useRouter } from "next/navigation";
import WelcomeCard2 from "@/components/yourContent/WelcomeCard2";
import StatsCard2 from "@/components/yourContent/StatsCard2";
import DiscussionCard from "@/components/dashboard/DiscussionCard";
import FilterCard from "@/components/yourContent/FilterCard";
import useSWR from "swr";
import {
  getAllDiscussions,
  getAllInformation,
  getAllPolls,
} from "@/queries/discussion";
import Spinner from "@/components/global/Spinner";
import Box from "@/components/dashboard/Box";
import PollCard from "@/components/dashboard/PollCard";
import InformationCard from "@/components/dashboard/InformationCard";
import PostCard from "@/components/dashboard/PostCard";
import { useState } from "react";
import { ActiveSideWindow, Filter } from "@/types";
import pascalCase from "@/utils/pascalCase";

export default function Home() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<Filter>("All");

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
    <div className="relative overflow-x-hidden">
      <NextButton
        className={clsx("z-10 fixed rotate-180 top-6 left-4 md:left-16")}
        onClick={() => router.push("/")}
      />
      <div className="bg-lightGray flex w-screen overflow-x-hidden">
        <Container className={"flex justify-center"}>
          <div className="grid grid-cols-1 md:grid-cols-4 space-y-8 md:space-y-0 md:space-x-8">
            {/* col - 1 */}
            <div className="flex flex-col space-y-8">
              <WelcomeCard2 />
            </div>

            {/* col - 2 */}
            <div className="flex flex-col space-y-2 col-span-2">
              <FilterCard activeTab={activeTab} setActiveTab={setActiveTab} />
              <div className="space-y-2">
                {pollLoading ? (
                  <Spinner />
                ) : (
                  <Box
                    className="bg-blue"
                    text={pascalCase(activeTab)}
                    type="poll"
                  >
                    {(activeTab === "Polls" || activeTab === "All") &&
                      polls?.map((information, key) => (
                        <PollCard key={key} poll={information} />
                      ))}

                    {(activeTab === "Posts" || activeTab === "All") &&
                      informations
                        ?.filter((information) => information.flag)
                        .map((information, key) => (
                          <PostCard key={key} information={information} />
                        ))}

                    {(activeTab === "Discussions" || activeTab === "All") &&
                      discussions?.map((discussion, key) => (
                        <DiscussionCard key={key} discussion={discussion} />
                      ))}

                    {(activeTab === "Information" || activeTab === "All") &&
                      informations
                        ?.filter((information) => !information.flag)
                        .map((information, key) => (
                          <InformationCard
                            key={key}
                            information={information}
                          />
                        ))}
                  </Box>
                )}
              </div>
            </div>

            {/* col - 3 */}
            <div className="flex flex-col space-y-2">
              <StatsCard2 />
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
