"use client";

import { useState } from "react";
import clsx from "clsx";

import StatsCard2 from "@/app/components/StatsCard2";
import WelcomeCard from "@/app/components/WelcomeCard";
import Container from "@/app/components/Container";
import NextButton from "@/app/components/NextButton";
import { useRouter } from "next/navigation";
import WelcomeCard2 from "../components/WelcomeCard2";
import DiscussionCardAll from "../components/DiscussionCardAll";
import DiscussionCardInner from "../components/DiscussionCardInner";
import FilterCard from "../components/FilterCard";

export default function Home() {
  const router = useRouter();

  return (
    <div className="relative overflow-x-hidden">
      <NextButton
        className={clsx("z-10 fixed rotate-180 top-6 left-4 md:left-16")}
        onClick={() => router.push("/")}
      />
      <div className="bg-lightGray flex w-screen overflow-x-hidden">
        <Container className={"flex justify-center"}>
          <div className="grid grid-cols-1 md:grid-cols-3 space-y-8 md:space-y-0 md:space-x-8">
            <div className="flex flex-col space-y-8">
              <WelcomeCard2 />
            </div>
            <div className="flex flex-col space-y-2">
              <FilterCard />
              <div className="space-y-2">
                {[1, 2, 3].map((card, key) => (
                  <DiscussionCardInner key={key} />
                ))}
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <StatsCard2 />
              <div className="space-y-2">
                {[1, 2, 3].map((card, key) => (
                  <DiscussionCardInner key={key} />
                ))}
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
