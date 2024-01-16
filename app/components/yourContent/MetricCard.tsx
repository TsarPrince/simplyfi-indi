import React from "react";
import formatNumber from "@/utils/formatNumber";
import DialogPostUpdate from "./DialogPostUpdate";

import { Metric } from "@/types";
import clsx from "clsx";

const MetricCard = ({ metric }: { metric: Metric }) => {
  const value = metric.metric_value[0]?.value;
  let formattedValue = formatNumber(value);
  if (metric.symbol == "PERCENTAGE") {
    formattedValue = `${value || ""}%`;
  }
  if (metric.symbol == "DOLLAR") {
    formattedValue = `$${formatNumber(value)}`;
  }

  // calculate percentageIncrease, absoluteIncrease, updateSince
  const prevValue = metric.metric_value[1]?.value;
  const prevTime = new Date(metric.metric_value[1]?.created_at);
  const [_, MONTH, DATE, YEAR] = prevTime.toDateString().split(" ");

  const percentageIncrease = Math.round(
    ((value - prevValue) / prevValue) * 100
  );
  const absoluteIncrease = value - prevValue;
  const updateSince = `${DATE} ${MONTH}`;

  return (
    <div className="bg-brown p-6 rounded-[2rem] max-w-xl space-y-8">
      <div className="flex justify-between">
        <p className="text-BodyMedium2 opacity-60">
          Updated : {new Date(metric.created_at).toLocaleDateString()}
        </p>
        <button>
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity="0.6"
              d="M14.4012 10.8116C13.8696 10.8151 13.3454 10.9362 12.8663 11.1661C12.3871 11.3961 11.965 11.7292 11.6301 12.1415L7.04156 10.0299C7.2573 9.37013 7.2573 8.65893 7.04156 7.99917L11.6301 5.88759C12.1713 6.5399 12.926 6.98029 13.7607 7.13103C14.5955 7.28177 15.4567 7.13318 16.1924 6.71147C16.9282 6.28976 17.4911 5.62204 17.7819 4.82617C18.0726 4.0303 18.0726 3.15743 17.7816 2.3616C17.4907 1.56578 16.9277 0.898173 16.1919 0.476598C15.4561 0.055022 14.5948 -0.0934179 13.7601 0.0574753C12.9253 0.208369 12.1708 0.648895 11.6296 1.30131C11.0885 1.95372 10.7955 2.77608 10.8023 3.62325C10.805 3.83731 10.8261 4.05075 10.8653 4.26122L6.11486 6.44469C5.6084 5.95011 4.96705 5.61579 4.27118 5.48362C3.57532 5.35146 2.85587 5.42732 2.20298 5.70171C1.55009 5.97609 0.992792 6.4368 0.600913 7.0261C0.209034 7.61541 0 8.3071 0 9.01453C0 9.72196 0.209034 10.4137 0.600913 11.003C0.992792 11.5923 1.55009 12.053 2.20298 12.3274C2.85587 12.6017 3.57532 12.6776 4.27118 12.5454C4.96705 12.4133 5.6084 12.079 6.11486 11.5844L10.8653 13.7678C10.8261 13.9783 10.805 14.1917 10.8023 14.4058C10.8023 15.1167 11.0134 15.8116 11.4088 16.4026C11.8043 16.9937 12.3664 17.4544 13.024 17.7264C13.6816 17.9984 14.4052 18.0696 15.1033 17.9309C15.8014 17.7923 16.4426 17.4499 16.9459 16.9473C17.4492 16.4446 17.792 15.8042 17.9308 15.107C18.0697 14.4098 17.9984 13.6871 17.7261 13.0304C17.4537 12.3736 16.9924 11.8123 16.4006 11.4174C15.8087 11.0224 15.1129 10.8116 14.4012 10.8116ZM14.4012 1.82615C14.7571 1.82615 15.105 1.93155 15.4009 2.12902C15.6968 2.32649 15.9274 2.60715 16.0636 2.93553C16.1998 3.26391 16.2354 3.62524 16.166 3.97384C16.0966 4.32245 15.9252 4.64266 15.6735 4.89398C15.4219 5.14531 15.1013 5.31647 14.7522 5.38581C14.4032 5.45515 14.0414 5.41956 13.7126 5.28355C13.3838 5.14753 13.1027 4.91719 12.905 4.62166C12.7073 4.32613 12.6018 3.97868 12.6018 3.62325C12.6018 3.14663 12.7913 2.68953 13.1288 2.35251C13.4662 2.01549 13.9239 1.82615 14.4012 1.82615ZM3.60468 10.8116C3.24879 10.8116 2.90089 10.7062 2.60498 10.5088C2.30906 10.3113 2.07843 10.0306 1.94223 9.70225C1.80604 9.37387 1.77041 9.01254 1.83984 8.66393C1.90927 8.31533 2.08065 7.99512 2.3323 7.74379C2.58395 7.49246 2.90458 7.32131 3.25363 7.25197C3.60268 7.18262 3.96448 7.21821 4.29328 7.35423C4.62208 7.49025 4.90311 7.72059 5.10084 8.01612C5.29856 8.31165 5.40409 8.6591 5.40409 9.01453C5.40409 9.49115 5.21451 9.94825 4.87706 10.2853C4.5396 10.6223 4.08191 10.8116 3.60468 10.8116ZM14.4012 16.2029C14.0453 16.2029 13.6974 16.0975 13.4015 15.9C13.1056 15.7026 12.8749 15.4219 12.7387 15.0935C12.6025 14.7652 12.5669 14.4038 12.6363 14.0552C12.7058 13.7066 12.8771 13.3864 13.1288 13.1351C13.3804 12.8837 13.7011 12.7126 14.0501 12.6432C14.3992 12.5739 14.761 12.6095 15.0898 12.7455C15.4186 12.8815 15.6996 13.1119 15.8973 13.4074C16.095 13.7029 16.2006 14.0504 16.2006 14.4058C16.2006 14.8824 16.011 15.3395 15.6735 15.6765C15.3361 16.0136 14.8784 16.2029 14.4012 16.2029Z"
              fill="#273648"
            />
          </svg>
        </button>
      </div>
      <div className="flex flex-col justify-center items-center">
        <p className="text-BodyMedium2 opacity-60">{metric.name}</p>
        <p className="text-TitleLarge2">{formattedValue}</p>
        <div className="text-BodyMedium2 opacity-60">
          {metric.metric_value.length > 1 ? (
            <div className="flex space-x-2 items-center">
              <svg
                width="12"
                height="15"
                viewBox="0 0 12 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={clsx(absoluteIncrease >= 0 ? "" : "rotate-180")}
              >
                <path
                  d="M11.0006 6.00059L6.00002 1L0.999435 6.00059"
                  stroke="#273648"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinejoin="round"
                />
                <path
                  d="M6 15.0048L6 1.13989"
                  stroke="#273648"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinejoin="round"
                />
              </svg>
              {/* if percentageIncrease is Infinity or -Infinity */}
              {/* show percentageIncrease instead of absoluteIncrease */}
              {isFinite(percentageIncrease) ? (
                <span
                  title={`${
                    absoluteIncrease >= 0 ? "+" : ""
                  }${absoluteIncrease} since ${updateSince}`}
                >
                  {percentageIncrease}% since {updateSince}
                </span>
              ) : (
                <span>
                  {absoluteIncrease >= 0 ? "+" : ""}
                  {absoluteIncrease} since {updateSince}
                </span>
              )}
            </div>
          ) : (
            <span>Post an update to see trends.</span>
          )}
        </div>
      </div>
      <div>
        <DialogPostUpdate metric={metric} />
      </div>
    </div>
  );
};

export default MetricCard;
