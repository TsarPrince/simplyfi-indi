import React from "react";

const PollSkeleton = () => {
  return (
    <div className="bg-blue p-4 mt-4 rounded-3xl overflow-hidden]">
      <div className="h-full">
        <div className="rounded-3xl flex flex-col space-y-3 h-full">
          <div className="space-y-3 animate-pulse">
            <div className="h-4 bg-slate-400 opacity-40 rounded-full w-full"></div>
            <div className="h-4 bg-slate-400 opacity-40 rounded-full w-full"></div>
            <div className="h-4 bg-slate-400 opacity-40 rounded-full w-36"></div>
          </div>
          {/* poll options */}
          <div className="pt-4 space-y-2">
            {[1, 2, 3, 4].map((_, key) => (
              <div
                key={key}
                className="bg-white h-[48px] rounded-xl w-full flex items-center px-2 justify-between"
              >
                <div className="h-2.5 bg-slate-200 rounded-full w-40 animate-pulse"></div>
                <div className="h-2.5 bg-slate-200 rounded-full w-8 animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PollSkeleton;
