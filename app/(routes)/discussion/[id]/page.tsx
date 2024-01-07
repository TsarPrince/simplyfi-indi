import Container from "@/components/Container";
import NextButton from "@/components/NextButton";
import DiscussionClient from "@/components/discussion/DiscussionClient";
import { getDiscussionById } from "@/queries/discussion";
import Link from "next/link";

export default async function Page({ params }: { params: { id: string } }) {
  // SSR
  const { data, error } = await getDiscussionById(params.id);
  const discussion = data?.[0];
  if (!discussion) return <></>;

  discussion.comment?.sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  return (
    <div className="md:grid grid-cols-3 md:h-screen overflow-y-hidden">
      <div className="bg-brown">
        <Container>
          <div className="space-y-4">
            <div>
              <Link href="/">
                <NextButton variant="back" />
              </Link>
              <h1 className="text-TitleMedium">{discussion.title}</h1>
              <p className="text-BodyMedium opacity-40">
                {new Date(discussion.created_at).toLocaleString()}
              </p>
            </div>
            <div className="flex space-x-6">
              <div className="flex items-center space-x-2">
                {/* Comments count */}
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.51055 0C6.52703 0 5.55313 0.193985 4.64447 0.570878C3.73581 0.947772 2.91018 1.50019 2.21472 2.1966C0.810174 3.60306 0.02111 5.51063 0.02111 7.49967C0.0145626 9.23144 0.61337 10.9109 1.71372 12.247L0.215836 13.7469C0.111914 13.8524 0.0415158 13.9863 0.0135247 14.1318C-0.0144664 14.2772 0.00120348 14.4278 0.0585572 14.5644C0.120763 14.6993 0.221606 14.8127 0.348284 14.8901C0.474962 14.9676 0.621764 15.0056 0.770054 14.9993H7.51055C9.49688 14.9993 11.4018 14.2092 12.8064 12.8027C14.2109 11.3963 15 9.4887 15 7.49967C15 5.51063 14.2109 3.60306 12.8064 2.1966C11.4018 0.790141 9.49688 0 7.51055 0ZM7.51055 13.4994H2.57501L3.27153 12.8019C3.41102 12.6614 3.48932 12.4713 3.48932 12.2732C3.48932 12.0751 3.41102 11.885 3.27153 11.7445C2.29085 10.7636 1.68015 9.47248 1.54348 8.09124C1.40681 6.70999 1.75263 5.32402 2.52201 4.16946C3.29138 3.0149 4.43673 2.16317 5.7629 1.7594C7.08908 1.35563 8.51403 1.42479 9.795 1.9551C11.076 2.48541 12.1337 3.44405 12.7879 4.66771C13.4422 5.89137 13.6526 7.30433 13.3831 8.66587C13.1137 10.0274 12.3812 11.2533 11.3104 12.1346C10.2395 13.016 8.89667 13.4983 7.51055 13.4994Z"
                    fill="#4EC2C2"
                  />
                </svg>
                <span>{discussion.comment?.length}</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg
                  width="18"
                  height="15"
                  viewBox="0 0 18 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.25803 7.69412C9.69518 7.28659 10.0458 6.78255 10.2861 6.2162C10.5265 5.64985 10.6508 5.03445 10.6508 4.41176C10.6508 3.24169 10.2192 2.11954 9.451 1.29218C8.68276 0.46481 7.64081 1.57863e-07 6.55435 1.57863e-07C5.4679 1.57863e-07 4.42595 0.46481 3.65771 1.29218C2.88947 2.11954 2.45788 3.24169 2.45788 4.41176C2.45788 5.03445 2.58225 5.64985 2.82257 6.2162C3.06289 6.78255 3.41353 7.28659 3.85068 7.69412C2.70379 8.25343 1.73073 9.15664 1.04786 10.2958C0.364992 11.4349 0.00120588 12.7617 0 14.1176C0 14.3517 0.0863182 14.5761 0.239966 14.7416C0.393613 14.907 0.602004 15 0.819294 15C1.03658 15 1.24498 14.907 1.39862 14.7416C1.55227 14.5761 1.63859 14.3517 1.63859 14.1176C1.63859 12.7136 2.1565 11.367 3.07838 10.3741C4.00027 9.3813 5.25061 8.82353 6.55435 8.82353C7.8581 8.82353 9.10844 9.3813 10.0303 10.3741C10.9522 11.367 11.4701 12.7136 11.4701 14.1176C11.4701 14.3517 11.5564 14.5761 11.7101 14.7416C11.8637 14.907 12.0721 15 12.2894 15C12.5067 15 12.7151 14.907 12.8687 14.7416C13.0224 14.5761 13.1087 14.3517 13.1087 14.1176C13.1075 12.7617 12.7437 11.4349 12.0608 10.2958C11.378 9.15664 10.4049 8.25343 9.25803 7.69412ZM6.55435 7.05882C6.06823 7.05882 5.59302 6.90358 5.18883 6.61271C4.78463 6.32185 4.4696 5.90844 4.28357 5.42475C4.09754 4.94106 4.04886 4.40883 4.1437 3.89535C4.23854 3.38187 4.47263 2.91021 4.81637 2.54001C5.16011 2.16981 5.59806 1.91771 6.07485 1.81557C6.55163 1.71343 7.04583 1.76585 7.49495 1.9662C7.94407 2.16655 8.32793 2.50583 8.59801 2.94114C8.86808 3.37644 9.01224 3.88823 9.01224 4.41176C9.01224 5.11381 8.75328 5.7871 8.29234 6.28352C7.8314 6.77994 7.20623 7.05882 6.55435 7.05882ZM14.5343 7.34118C15.0586 6.70529 15.4011 5.91975 15.5205 5.07912C15.64 4.23849 15.5313 3.37859 15.2075 2.60294C14.8838 1.82729 14.3588 1.16894 13.6957 0.707138C13.0326 0.245338 12.2598 -0.000227294 11.4701 1.57863e-07C11.2528 1.57863e-07 11.0444 0.092962 10.8908 0.258435C10.7371 0.423909 10.6508 0.648339 10.6508 0.882353C10.6508 1.11637 10.7371 1.3408 10.8908 1.50627C11.0444 1.67174 11.2528 1.76471 11.4701 1.76471C12.122 1.76471 12.7472 2.04359 13.2081 2.54001C13.669 3.03643 13.928 3.70972 13.928 4.41176C13.9268 4.87521 13.8127 5.33021 13.5971 5.73125C13.3814 6.1323 13.0717 6.46534 12.6991 6.69706C12.5776 6.77252 12.4761 6.88029 12.4044 7.01007C12.3327 7.13984 12.2931 7.28726 12.2894 7.43824C12.286 7.58803 12.318 7.73629 12.3825 7.86905C12.447 8.00181 12.5419 8.11469 12.6581 8.19706L12.9776 8.42647L13.0841 8.48824C14.0717 8.99269 14.9049 9.79058 15.4855 10.7879C16.0661 11.7853 16.3699 12.9405 16.3613 14.1176C16.3613 14.3517 16.4476 14.5761 16.6013 14.7416C16.7549 14.907 16.9633 15 17.1806 15C17.3979 15 17.6063 14.907 17.7599 14.7416C17.9136 14.5761 17.9999 14.3517 17.9999 14.1176C18.0066 12.7636 17.6917 11.4302 17.0851 10.2442C16.4786 9.05812 15.6005 8.05881 14.5343 7.34118Z"
                    fill="#4EC2C2"
                  />
                </svg>
                <span>100</span>
              </div>
            </div>

            <div>
              <p className="text-BodyMedium font-bold">Context and links</p>
              <p className="text-BodyMedium">
                Lorem ipsum dolor sit amet consectetur. Vitae ultrices donec
                consequat quis id convallis varius. Tempor velit varius eu
                gravida. Auctor mauris quisque vulputate ut a faucibus
                pellentesque bibendum. Tincidunt maecenas venenatis cursus quam
                in.
              </p>
            </div>

            <div className="space-y-2">
              {[
                {
                  title: "Title",
                  description:
                    "Lorem ipsum dolor sit amet consectetur. Pretium molestie velit euismod congue urna pellentesque.",
                },
                {
                  title: "Title",
                  description:
                    "Lorem ipsum dolor sit amet consectetur. Pretium molestie velit euismod congue urna pellentesque.",
                },
                {
                  title: "Title",
                  description:
                    "Lorem ipsum dolor sit amet consectetur. Pretium molestie velit euismod congue urna pellentesque.",
                },
              ].map((link, key) => (
                <div key={key} className="bg-white rounded-3xl p-4">
                  <div className="border-l-2 pl-4 border-gray border-opacity-50">
                    <p className="text-BodyMedium">{link.title}</p>
                    <p className="text-BodySmall">{link.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </div>
      <div className="bg-lightGray col-span-2 h-screen">
        <Container className="h-full">
          <DiscussionClient discussion={discussion} />
        </Container>
      </div>
    </div>
  );
}

export const revalidate = 0;
