import { Popover, Transition } from "@headlessui/react";
import Button from "../Button";
import Link from "next/link";
import clsx from "clsx";

export default function MyPopover({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <Popover className="">
      <Popover.Button as="div">
        <Button full border className="bg-white">
          Add new post
        </Button>
      </Popover.Button>
      <Popover.Overlay className="fixed inset-0 bg-black opacity-30" />

      <Transition
        enter="transition duration-150 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-100 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
        className="absolute z-10 top-[calc(100vh/2)] left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-3xl"
      >
        <Popover.Panel>
          {({ close }) => (
            <div className="divide-y">
              <div className="relative">
                <div className="py-4 text-BodyLarge text-center">New post</div>
                <button
                  className="absolute p-2 right-4 top-1/2 -translate-y-1/2 hover:opacity-75 active:scale-95 transition-all duration-150"
                  onClick={() => close()}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13 13L1 1M13 1L1 13"
                      stroke="#273648"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
              <ul className="p-14 pt-8 space-y-2">
                {[
                  { title: "Poll", href: "/add-poll" },
                  { title: "Metric", href: "/add-metric" },
                  { title: "Announcement", href: "/add-announcement" },
                  { title: "Discussion", href: "/add-discussion" },
                  { title: "Information Post", href: "/add-info-post" },
                ].map((post, key) => (
                  <li key={key}>
                    <Link href={post.href}>
                      <Button full border className="bg-white !px-32">
                        {post.title}
                      </Button>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
