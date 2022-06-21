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
    <header className="h-[95vh] w-full mx-auto relative mb-6 pt-4 md:pt-10 grid grid-rows-2 gap-4">
      <section className="flex flex-col items-start px-8 md:px-10 h-auto w-full max-w-5xl mx-auto row-span-1">
        {children}
      </section>
      <div
        className={`w-full row-span-1 h-auto flex flex-col items-end justify-around pointer-events-none max-w-7xl mx-auto`}
      >
        <h2 className="styledText">{styledContent}</h2>

        {showScroll && (
          <div className="w-max mx-auto my-2">
            <Mouse />
          </div>
        )}
      </div>
    </header>
  );
};
