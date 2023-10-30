import React from "react";

const StatsCard = () => {
  return (
    <div className="bg-brown border p-6 rounded-[2rem] max-w-xl">
      <div className="grid grid-rows-2 divide-y divide-gray/20 gap-2">
        {/* row 1 */}
        <div className="grid grid-cols-3 divide-x divide-gray/10">
          <div className="col-span-1">
            <p className="text-BodySmall">Total users</p>
            <p className="text-TitleMedium">1,567</p>
          </div>
          <div className="col-span-2 pl-4">
            <p className="text-BodySmall">Active weekly</p>
            <p className="text-TitleMedium">87%</p>
          </div>
        </div>

        {/* row 2 */}
        <div className="grid grid-cols-3 divide-x divide-gray/10 pt-2">
          <div className="">
            <p className="text-TitleMedium">2</p>
            <p className="text-BodySmall">On-going polls</p>
          </div>
          <div className="pl-4">
            <p className="text-TitleMedium">3</p>
            <p className="text-BodySmall">Interesting reads</p>
          </div>
          <div className="pl-4">
            <p className="text-TitleMedium">1</p>
            <p className="text-BodySmall">New announcement</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
