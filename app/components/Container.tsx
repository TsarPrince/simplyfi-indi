import clsx from "clsx";
import React, { useRef } from "react";

const Container = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={clsx("p-4 md:px-16 md:py-8 max-w-[108rem] mx-auto", className)}
    >
      {children}
    </div>
  );
};

export default Container;
