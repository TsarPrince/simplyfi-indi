import React from "react";
import clsx from "clsx";

const LoadingSkeleton = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={clsx(
        "bg-white mt-4 rounded-3xl overflow-hidden h-[calc(100%-42px)]",
        className
      )}
    >
      <div className="animate-pulse h-full">
        <div className="p-4 rounded-3xl flex flex-col space-y-3 h-full">
          {children}
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
