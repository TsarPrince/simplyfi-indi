import React from "react";
import NextArrow from "@/components/NextButton";
import { ActiveSideWindow } from "@/types";
import clsx from "clsx";

const Box = ({
  toggleSideWindow,
  className,
  text,
  children,
}: {
  toggleSideWindow: (window?: ActiveSideWindow, state?: boolean) => void;
  className?: string;
  text?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div className={clsx("border p-6 rounded-[2rem] max-w-xl", className)}>
      <div className="flex justify-between">
        <p className="text-BodyLarge opacity-70">{text}</p>
        <NextArrow onClick={() => toggleSideWindow()} />
      </div>
      {children}
    </div>
  );
};

export default Box;
