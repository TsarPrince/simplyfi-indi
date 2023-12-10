"use client";

import { useRouter } from "next/navigation";
import { Dialog, Transition } from "@headlessui/react";

export default function MyDialog({
  open,
  setOpen,
  title,
  children,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title?: string;
  children?: React.ReactNode;
}) {
  return (
    <Transition show={open}>
      <Dialog
        // omit open as Dialog infers it from Transition
        // causes Dialog to disappear abruptly if enabled!
        // open={open}
        onClose={() => setOpen(false)}
        className="relative z-50"
      >
        {/* The backdrop, rendered as a fixed sibling to the panel container */}
        <Transition.Child
          enter="ease-out duration-150"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        </Transition.Child>

        {/* Full-screen container to center the panel */}
        <div className="fixed inset-0 flex w-screen items-center justify-center">
          {/* The actual dialog panel  */}
          <Transition.Child
            enter="ease-out duration-150"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-100"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="bg-white rounded-3xl max-w-lg overflow-hidden">
              <div className="divide-y">
                <div className="relative">
                  <div className="py-4 text-BodyLarge text-center">{title}</div>
                  <button
                    className="absolute p-2 rounded-full right-4 top-1/2 -translate-y-1/2 hover:opacity-75 focus:opacity-75 active:scale-95 transition-all duration-150"
                    onClick={() => setOpen(false)}
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
                <div className="max-h-[32rem] overflow-y-scroll">
                  {children}
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
