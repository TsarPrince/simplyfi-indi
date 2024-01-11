import React from "react";

const Footer = () => {
  return (
    // mix-blend-multiply to allow the background to show through
    // when Popover/Modal is open in /your-content
    <div className="pointer-events-none bg-lightGray mix-blend-multiply md:bg-transparent sm:fixed bottom-0 p-4 w-full md:px-10">
      <div className="text-TitleMedium">
        <span className="text-gray">Public</span>
        <span className="text-green">HQ</span>
      </div>
    </div>
  );
};

export default Footer;
