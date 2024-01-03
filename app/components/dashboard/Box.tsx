import React from "react";
import NextArrow from "@/components/NextButton";
import { ActiveSideWindow } from "@/types";
import clsx from "clsx";

import decorative1 from "/public/images/decorative1.svg";
import decorative2 from "/public/images/decorative2.svg";
import decorative3 from "/public/images/decorative3.svg";

const Box = ({
  toggleSideWindow,
  className,
  text,
  children,
  variant,
  fullHeight = false,
  type,
}: {
  toggleSideWindow?: (window?: ActiveSideWindow, state?: boolean) => void;
  className?: string;
  text?: string;
  children?: React.ReactNode;
  variant?: "sidebar" | "deault";
  fullHeight?: boolean;
  type?: "poll" | "information" | "discussion" | "post";
}) => {
  let style = {};
  if (type === "discussion") {
    style = {
      backgroundImage: `url(${decorative2.src})`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "bottom left",
    };
  }
  if (type === "information") {
    style = {
      backgroundImage: `url(${decorative1.src})`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "bottom left",
    };
  }
  if (type === "poll") {
  }
  if (type === "post") {
    style = {
      backgroundImage: `url(${decorative3.src})`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "bottom left",
      backgroundSize: "contain",
    };
  }

  return (
    <div
      className={clsx(
        "p-6 rounded-[3rem] overflow-y-hidden",
        fullHeight && "h-full",
        className
      )}
      style={style}
    >
      <div className="flex justify-between">
        <p className="text-BodyLarge opacity-70">{text}</p>
        {toggleSideWindow !== undefined &&
          (type === "poll" ? (
            variant === "sidebar" && (
              <NextArrow onClick={() => toggleSideWindow()} variant={"close"} />
            )
          ) : (
            <NextArrow
              onClick={() => toggleSideWindow()}
              variant={variant === "sidebar" ? "close" : "default"}
            />
          ))}
      </div>
      <div className={clsx("h-full space-y-6")}>{children}</div>
    </div>
  );
};

export default Box;
