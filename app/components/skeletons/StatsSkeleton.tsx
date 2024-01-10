import React from "react";

const StatsSkeleton = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className="bg-brown p-6 rounded-[2rem] max-w-xl">
      <div className="grid grid-rows-2 divide-y divide-gray/20 gap-2">
        {/* row 1 */}
        <div className="grid grid-cols-3 divide-x divide-gray/10 animate-pulse">
          <div className="col-span-1 space-y-2">
            <div className="h-2.5 bg-gray/25 rounded-full w-12"></div>
            <div className="h-3 bg-gray/40 rounded-full w-24"></div>
          </div>
          <div className="col-span-2 pl-4">
            <div className="flex space-x-2 md:space-x-6">
              <div className="space-y-2">
                <div className="h-2.5 bg-gray/25 rounded-full w-12"></div>
                <div className="h-3 bg-gray/40 rounded-full w-24"></div>
              </div>
              <div className="w-16">
                <svg
                  width="61"
                  height="61"
                  viewBox="0 0 61 61"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    className="text-gray/25"
                    opacity="0.2"
                    d="M37.2734 54.2267C24.1695 57.9675 10.5142 50.3772 6.7734 37.2733C3.03258 24.1695 10.6228 10.5142 23.7267 6.77334C36.8306 3.03253 50.4859 10.6228 54.2267 23.7267C57.9675 36.8305 50.3773 50.4858 37.2734 54.2267ZM25.4887 12.9455C15.7936 15.7132 10.1779 25.8163 12.9455 35.5114C15.7132 45.2064 25.8163 50.8222 35.5114 48.0545C45.2065 45.2868 50.8223 35.1837 48.0546 25.4886C45.2869 15.7936 35.1838 10.1778 25.4887 12.9455Z"
                    fill="currentColor"
                  />
                  <path
                    className="text-gray/40"
                    d="M30.105 9.1515C30.0711 7.31692 31.5371 5.77904 33.3596 5.99168C37.8488 6.51545 42.1311 8.26569 45.7217 11.0801C50.1884 14.5812 53.3117 19.515 54.5652 25.0502C55.8187 30.5853 55.1258 36.3834 52.6032 41.4673C50.0807 46.5512 45.8827 50.6101 40.7167 52.96C35.5508 55.3099 29.7327 55.8072 24.2429 54.368C18.7531 52.9288 13.9272 49.6411 10.5785 45.059C7.22983 40.4769 5.56308 34.8805 5.85912 29.2129C6.09709 24.657 7.59171 20.2789 10.1468 16.5508C11.1841 15.0372 13.3067 14.9428 14.6673 16.1739C16.0279 17.405 16.1015 19.4944 15.1406 21.0575C13.5709 23.6109 12.653 26.5315 12.4948 29.5595C12.2785 33.7009 13.4964 37.7902 15.9433 41.1383C18.3902 44.4865 21.9165 46.8888 25.9279 47.9404C29.9393 48.992 34.1906 48.6287 37.9654 46.9116C41.7402 45.1945 44.8077 42.2287 46.6509 38.5138C48.4942 34.799 49.0005 30.5624 48.0846 26.5178C47.1686 22.4732 44.8864 18.868 41.6226 16.3098C39.2361 14.4392 36.4315 13.212 33.4753 12.7174C31.6655 12.4146 30.139 10.9861 30.105 9.1515Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* row 2 */}
        <div className="grid grid-cols-3 divide-x divide-gray/10 pt-2 animate-pulse">
          <div className="space-y-2 py-4">
            <div className="h-3 bg-gray/40 rounded-full w-12"></div>
            <div className="h-2.5 bg-gray/25 rounded-full w-24"></div>
          </div>
          <div className="space-y-2 py-4 pl-4">
            <div className="h-3 bg-gray/40 rounded-full w-12"></div>
            <div className="h-2.5 bg-gray/25 rounded-full w-24"></div>
          </div>
          <div className="space-y-2 py-4 pl-4">
            <div className="h-3 bg-gray/40 rounded-full w-12"></div>
            <div className="h-2.5 bg-gray/25 rounded-full w-24"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsSkeleton;
