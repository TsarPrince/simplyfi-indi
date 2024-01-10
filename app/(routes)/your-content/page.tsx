"use client";

import clsx from "clsx";
import Container from "@/components/Container";
import NextButton from "@/components/NextButton";
import WelcomeCard2 from "@/components/yourContent/WelcomeCard2";
import DiscussionCard from "@/components/dashboard/DiscussionCard";
import FilterCard from "@/components/yourContent/FilterCard";
import useSWR from "swr";
import {
  getAllDiscussions,
  getFilteredDiscussions,
} from "@/queries/discussion";
import { getAllPolls, getFilteredPolls } from "@/queries/poll";
import {
  getAllInformation,
  getFilteredInformation,
} from "@/queries/information";
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
import Link from "next/link";
import PollSkeleton from "@/components/skeletons/PollSkeleton";
import InformationSkeleton from "@/components/skeletons/InformationSkeleton";
import DiscussionSkeleton from "@/components/skeletons/DiscussionSkeleton";
import MetricSkeleton from "@/components/skeletons/MetricSkeleton";

export default function Home() {
  const [activeTab, setActiveTab] = useState<Filter>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: discussions,
    error: discussionError,
    isLoading: discussionLoading,
  } = useSWR("getAllDiscussions", async () => {
    const { data, error } = await getAllDiscussions;
    if (error) throw error.message;
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
    data: information,
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

  const {
    data: filteredPolls,
    error: filteredPollsError,
    isLoading: filteredPollsLoading,
  } = useSWR(`getFilteredPolls?q=${searchQuery}`, async () => {
    const { data, error } = await getFilteredPolls(searchQuery);
    if (error) throw error.message;
    return data;
  });

  const {
    data: filteredDiscussions,
    error: filteredDiscussionsError,
    isLoading: filteredDiscussionsLoading,
  } = useSWR(`getFilteredDiscussions?q=${searchQuery}`, async () => {
    const { data, error } = await getFilteredDiscussions(searchQuery);
    if (error) throw error.message;
    return data;
  });

  const {
    data: filteredInformation,
    error: filteredInformationError,
    isLoading: filteredInformationLoading,
  } = useSWR(`getFilteredInformation?q=${searchQuery}`, async () => {
    const { data, error } = await getFilteredInformation(searchQuery);
    if (error) throw error.message;
    return data;
  });

  return (
    <div className="relative overflow-x-hidden">
      <Link href="/">
        <NextButton
          className={clsx("z-10 fixed rotate-180 top-6 left-4 md:left-16")}
        />
      </Link>
      <div className="bg-lightGray flex w-screen overflow-x-hidden min-h-screen">
        <Container className={"flex justify-center"}>
          <div className="relative grid grid-cols-1 md:grid-cols-4 space-y-8 md:space-y-0 md:space-x-8">
            {/* col - 1 */}
            <div className="flex flex-col space-y-8">
              <WelcomeCard2 />
            </div>

            {/* col - 2 */}
            <div className="flex flex-col space-y-4 col-span-2">
              <FilterCard
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
              <div className="">
                {
                  <Box
                    className="bg-green"
                    text={pascalCase(activeTab)}
                    type="discussion"
                  >
                    {searchQuery &&
                      filteredDiscussions?.length === 0 &&
                      filteredInformation?.length === 0 &&
                      filteredPolls?.length === 0 && (
                        <div
                          className="relative p-4 flex flex-col items-center justify-center h-96 rounded-3xl overflow-hidden bg-red-500 mt-4"
                          style={{
                            backgroundImage: "url('/images/404.png')",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",
                            backgroundSize: "cover",
                          }}
                        >
                          <div className="absolute inset-0 bg-black/50"></div>
                          <p className="mt-4 text-TitleMedium text-center text-white z-0">
                            {`Uh Oh! No results matched your query: “${searchQuery}”`}
                          </p>
                        </div>
                      )}
                    {(activeTab === "Polls" || activeTab === "All") && (
                      <>
                        {(filteredPollsLoading || pollLoading) && (
                          <PollSkeleton />
                        )}
                        {searchQuery
                          ? filteredPolls?.map((poll, key) => (
                              <div
                                className="bg-lightBlue p-4 pt-0 mt-4 rounded-3xl"
                                key={key}
                              >
                                <PollCard poll={poll} />
                              </div>
                            ))
                          : polls?.map((poll, key) => (
                              <div
                                className="bg-lightBlue p-4 pt-0 mt-4 rounded-3xl"
                                key={key}
                              >
                                <PollCard poll={poll} />
                              </div>
                            ))}
                      </>
                    )}

                    {(activeTab === "Posts" || activeTab === "All") && (
                      <>
                        {(filteredInformationLoading || informationLoading) && (
                          <InformationSkeleton />
                        )}
                        {searchQuery
                          ? filteredInformation
                              ?.filter((information) => information.flag)
                              .map((information, key) => (
                                <PostCard key={key} information={information} />
                              ))
                          : information
                              ?.filter((information) => information.flag)
                              .map((information, key) => (
                                <PostCard key={key} information={information} />
                              ))}
                      </>
                    )}

                    {(activeTab === "Discussions" || activeTab === "All") && (
                      <>
                        {(filteredDiscussionsLoading || discussionLoading) && (
                          <DiscussionSkeleton />
                        )}
                        {searchQuery
                          ? filteredDiscussions?.map((discussion, key) => (
                              <DiscussionCard
                                key={key}
                                discussion={discussion}
                              />
                            ))
                          : discussions?.map((discussion, key) => (
                              <DiscussionCard
                                key={key}
                                discussion={discussion}
                              />
                            ))}
                      </>
                    )}

                    {(activeTab === "Information" || activeTab === "All") && (
                      <>
                        {(filteredInformationLoading || informationLoading) ?? (
                          <InformationSkeleton />
                        )}
                        {searchQuery
                          ? filteredInformation
                              ?.filter((information) => !information.flag)
                              .map((information, key) => (
                                <InformationCard
                                  key={key}
                                  information={information}
                                />
                              ))
                          : information
                              ?.filter((information) => !information.flag)
                              .map((information, key) => (
                                <InformationCard
                                  key={key}
                                  information={information}
                                />
                              ))}
                      </>
                    )}
                  </Box>
                }
              </div>
            </div>

            {/* col - 3 */}
            <div className="flex flex-col space-y-2">
              {metricLoading ? (
                <>
                  <MetricSkeleton />
                  <MetricSkeleton />
                  <MetricSkeleton />
                </>
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
