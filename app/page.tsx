import DiscussionCard from "@/app/components/DiscussionCard";
import InformationCard from "@/app/components/InformationCard";
import InformationCardAll from "@/app/components/InformationCardAll";
import PollCard from "@/app/components/PollCard";
import PostCard from "@/app/components/PostCard";
import StatsCard from "@/app/components/StatsCard";
import WelcomeCard from "@/app/components/WelcomeCard";
import Container from "@/app/components/Container";

export default function Home() {
  return (
    <>
      <div className="bg-lightGray">
        <Container className="flex justify-center">
          <div className="flex flex-col space-y-8 md:flex-row md:space-y-0 md:space-x-8">
            <div className="flex flex-col space-y-8">
              <WelcomeCard />
              <PollCard />
            </div>
            <div className="flex flex-col space-y-8">
              <InformationCard />
              <DiscussionCard />
            </div>
            <div className="flex flex-col space-y-8">
              <StatsCard />
              <PostCard />
            </div>
            <div className="flex flex-col space-y-8">
              {/* <InformationCardAll /> */}
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
