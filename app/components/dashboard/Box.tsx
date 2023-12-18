import React from "react";
import NextArrow from "@/components/NextButton";
import { ActiveSideWindow } from "@/types";
import clsx from "clsx";

const Box = ({
  toggleSideWindow,
  className,
  text,
  children,
  variant,
  fullHeight = false,
}: {
  toggleSideWindow: (window?: ActiveSideWindow, state?: boolean) => void;
  className?: string;
  text?: string;
  children?: React.ReactNode;
  variant?: "sidebar" | "deault";
  fullHeight?: boolean;
}) => {
  return (
    <div
      className={clsx(
        "border p-6 rounded-[2rem] overflow-y-hidden",
        fullHeight && "h-full",
        className
      )}
    >
      <div className="flex justify-between">
        <p className="text-BodyLarge opacity-70">{text}</p>
        <NextArrow
          onClick={() => toggleSideWindow()}
          variant={variant === "sidebar" ? "close" : "default"}
        />
      </div>
      <div>{children}</div>
    </div>
  );
};

export default Box;
