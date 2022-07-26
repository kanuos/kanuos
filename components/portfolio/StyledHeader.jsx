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
    <header
      className={`h-screen w-full mx-auto relative pt-12 grid ${
        showScroll ? "grid-rows-2" : "grid-rows-1"
      }`}
    >
      <section className="flex flex-col items-start px-8 h-auto w-full max-w-4xl mx-auto row-span-1">
        {children}
      </section>
      <div
        className={`relative w-full row-span-2 h-auto flex flex-col items-end ${
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

        {showScroll && (
          <div className={`w-max mx-auto my-2`}>
            <Mouse />
          </div>
        )}
      </div>
    </header>
  );
};
