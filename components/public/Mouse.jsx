import React from "react";

const Mouse = () => {
  return (
    <div className="p-4 w-full text-center">
      <div className="mx-auto grid place-items-center h-8 w-5 border-2 border-current rounded-t-3xl rounded-b-2xl">
        <span className="h-1.5 w-1 rounded-full bg-primary animate-bounce"></span>
      </div>
      <p className="text-xs inline-flex my-2 items-center justify-center gap-x-0.5 w-max mx-auto font-semibold uppercase animate-pulse">
        <small>scroll</small>
      </p>
    </div>
  );
};

export default Mouse;
