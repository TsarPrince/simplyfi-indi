import Button from "@/components/Button";
import Container from "@/components/Container";
import NextButton from "@/components/NextButton";
import DiscussionClient from "@/components/discussion/DiscussionClient";
import InformationClient from "@/components/information/InformationClient";
import { getDiscussionById } from "@/queries/discussion";
import { getInformationById } from "@/queries/information";
import { resolveImageURL } from "@/utils/resolveImageURL";
import Link from "next/link";

export default async function Page({ params }: { params: { id: string } }) {
  // SSR
  const { data: information, error } = await getInformationById(params.id);
  if (!information) return <></>;

  return (
    <div className="md:grid grid-cols-3 md:h-screen overflow-y-hidden">
      <div className="bg-lightGray">
        <Container>
          <div className="space-y-4">
            <div>
              <Link href="/">
                <NextButton variant="back" />
              </Link>
              <h1 className="text-TitleMedium pt-16">{information.title}</h1>
              <p className="text-BodyMedium opacity-40">
                {new Date(information.created_at).toLocaleString()}
              </p>
              <img
                className="mt-4 rounded-3xl max-h-96 w-full object-cover"
                src={resolveImageURL(information.image || "")}
                alt={information.title}
              />
            </div>
          </div>
        </Container>
      </div>
      <div className="bg-lightGray col-span-2 h-screen">
        <Container className="h-full">
          <InformationClient content={information.content} />
        </Container>
      </div>
    </div>
  );
}

export const revalidate = 0;
