import { Fragment } from "react";
import Mouse from "../public/Mouse";

export const StyledHeader = ({
  children,
  styledText = "",
  showScroll = true,
  isDarkMode = false,
}) => {
  const styledContent = styledText.split(" ").map((text, i) => (
    <Fragment key={i}>
      <>{text}</>
      <br />
    </Fragment>
  ));

  return (
    <header className="h-[95vh] w-full mx-auto relative mb-6 pt-4 md:pt-10 grid grid-rows-2">
      <section className="flex flex-col items-start px-8 h-auto w-full max-w-4xl mx-auto row-span-1">
        {children}
      </section>
      <div
        className={`w-full row-span-1 h-auto flex flex-col items-end ${
          showScroll ? "justify-around gap-y-10" : "justify-start"
        } pointer-events-none max-w-6xl mx-auto mt-auto`}
      >
        <h2
          className={`styledText ${
            isDarkMode ? "styledText--dark" : "styledText--light"
          }`}
        >
          {styledContent}
        </h2>

        <div
          className={`w-max mx-auto my-2 ${
            showScroll ? "visible" : "invisible"
          }`}
        >
          <Mouse />
        </div>
      </div>
    </header>
  );
};
