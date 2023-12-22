"use client";

import React, { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const StatsCard = () => {
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    setPercentage(87);
  }, []);

  return (
    <div className="bg-brown p-6 rounded-[2rem] max-w-xl">
      <div className="grid grid-rows-2 divide-y divide-gray/20 gap-2">
        {/* row 1 */}
        <div className="grid grid-cols-3 divide-x divide-gray/10">
          <div className="col-span-1">
            <p className="text-BodySmall">Total users</p>
            <p className="text-TitleMedium">1,567</p>
          </div>
          <div className="col-span-2 pl-4">
            <div className="flex space-x-2 md:space-x-6">
              <div>
                <p className="text-BodySmall">Active weekly</p>
                <p className="text-TitleMedium">87%</p>
              </div>
              <div className="w-16">
                <CircularProgressbar
                  value={percentage}
                  strokeWidth={12}
                  styles={buildStyles({
                    pathColor: "#273648",
                    trailColor: "#27364833",
                    pathTransitionDuration: 0.5,
                  })}
                />
              </div>
            </div>
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
