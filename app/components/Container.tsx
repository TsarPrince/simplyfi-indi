import React from "react";

const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="p-4 md:px-16 md:py-14 max-w-[140rem] mx-auto flex justify-center">
      {children}
    </div>
  );
};

export default Container;
