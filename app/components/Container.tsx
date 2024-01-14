import clsx from "clsx";
import React, { forwardRef } from "react";

interface ContainerProps {
  className?: string;
  children?: React.ReactNode;
}

const Container = forwardRef<HTMLDivElement, ContainerProps>((props, ref) => (
  <div
    className={clsx(
      "p-4 md:px-10 md:py-8 max-w-screen-xl mx-auto",
      props.className
    )}
    ref={ref}
  >
    {props.children}
  </div>
));

Container.displayName = "Container";
export default Container;
