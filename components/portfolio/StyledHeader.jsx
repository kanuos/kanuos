import { Fragment } from "react";
import Mouse from "../public/Mouse";

export const StyledHeader = ({
  children,
  styledText = "",
  showScroll = true,
}) => {
  const styledContent = styledText.split(" ").map((text, i) => (
    <Fragment key={i}>
      <>{text}</>
      <br />
    </Fragment>
  ));

  return (
    <header className="h-[90vh] md:h-screen w-full mx-auto relative mb-10 md:pt-10 grid grid-rows-2 gap-10">
      <section className="flex flex-col items-start px-8 md:px-10 h-auto w-full max-w-4xl mx-auto row-span-1">
        {children}
      </section>
      <div
        className={`w-full row-span-1 h-auto flex flex-col items-end justify-center pointer-events-none max-w-7xl mx-auto`}
      >
        <h2
          className={`uppercase text-5xl sm:text-6xl pr-4 lg:text-7xl xl:text-8xl font-black bg-contain styledText w-min max-w-xs tracking-tighter sm:max-w-sm md:max-w-lg break-words text-right block z-10 opacity-100 text-transparent bg-gradient-to-br from-primary to-secondary bg-clip-text`}
        >
          {styledContent}
        </h2>

        {showScroll && (
          <div className="w-max mx-auto my-2">
            <Mouse />
          </div>
        )}
      </div>
    </header>
  );
};
