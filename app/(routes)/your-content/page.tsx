"use client";

import clsx from "clsx";
import Container from "@/components/Container";
import NextButton from "@/components/NextButton";
import { useRouter } from "next/navigation";
import WelcomeCard2 from "@/components/yourContent/WelcomeCard2";
import StatsCard2 from "@/components/yourContent/StatsCard2";
import DiscussionCardInner from "@/components/dashboard/DiscussionCard";
import FilterCard from "@/components/yourContent/FilterCard";
import WelcomeCard from "@/components/dashboard/WelcomeCard";

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
          <div className="grid grid-cols-1 md:grid-cols-4 space-y-8 md:space-y-0 md:space-x-8">
            <div className="flex flex-col space-y-8">
              <WelcomeCard2 />
            </div>
            <div className="flex flex-col space-y-2 col-span-2">
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
