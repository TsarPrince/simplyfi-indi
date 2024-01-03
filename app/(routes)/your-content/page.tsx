"use client";

import clsx from "clsx";
import Container from "@/components/Container";
import NextButton from "@/components/NextButton";
import { useRouter } from "next/navigation";
import WelcomeCard2 from "@/components/yourContent/WelcomeCard2";
import DiscussionCard from "@/components/dashboard/DiscussionCard";
import FilterCard from "@/components/yourContent/FilterCard";
import useSWR from "swr";
import { getAllDiscussions } from "@/queries/discussion";
import { getAllPolls } from "@/queries/poll";
import { getAllInformation } from "@/queries/information";
import Spinner from "@/components/global/Spinner";
import Box from "@/components/dashboard/Box";
import PollCard from "@/components/dashboard/PollCard";
import InformationCard from "@/components/dashboard/InformationCard";
import PostCard from "@/components/dashboard/PostCard";
import { useState } from "react";
import { ActiveSideWindow, Filter } from "@/types";
import pascalCase from "@/utils/pascalCase";
import { getAllMetrics } from "@/queries/metric";
import MetricCard from "@/components/yourContent/MetricCard";

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

  const {
    data: metric,
    error: metricError,
    isLoading: metricLoading,
  } = useSWR("getAllMetrics", async () => {
    const { data, error } = await getAllMetrics;
    if (error) throw error.message;
    return data;
  });

  return (
    <div className="relative overflow-x-hidden">
      <NextButton
        className={clsx("z-10 fixed rotate-180 top-6 left-4 md:left-16")}
        onClick={() => router.push("/")}
      />
      <div className="bg-lightGray flex w-screen overflow-x-hidden min-h-screen">
        <Container className={"flex justify-center"}>
          <div className="relative grid grid-cols-1 md:grid-cols-4 space-y-8 md:space-y-0 md:space-x-8">
            {/* col - 1 */}
            <div className="flex flex-col space-y-8">
              <WelcomeCard2 />
            </div>

            {/* col - 2 */}
            <div className="flex flex-col space-y-4 col-span-2">
              <FilterCard activeTab={activeTab} setActiveTab={setActiveTab} />
              <div className="">
                {pollLoading ? (
                  <Spinner />
                ) : (
                  <Box
                    className="bg-green"
                    text={pascalCase(activeTab)}
                    type="discussion"
                  >
                    {(activeTab === "Polls" || activeTab === "All") &&
                      polls?.map((poll, key) => (
                        <div
                          className="bg-lightBlue p-4 pt-0 mt-4 rounded-3xl"
                          key={key}
                        >
                          <PollCard poll={poll} />
                        </div>
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
              {metricLoading ? (
                <Spinner />
              ) : (
                metric?.map((metric, key) => (
                  <MetricCard key={key} metric={metric} />
                ))
              )}
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
