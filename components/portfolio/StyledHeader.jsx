export const StyledHeader = ({
  children,
  styledText = "",
  isDarkMode = false,
  showScroll = true,
}) => {
  const styledContent = styledText.split(" ").map((text, i) => (
    <div key={i}>
      <span>{text}</span>
      <br />
    </div>
  ));
  return (
    <header className="min-h-screen h-full w-full mx-auto relative block pt-20">
      <section className="flex flex-col items-start px-8 md:px-10 h-4/5 md:h-3/4 w-full max-w-4xl mx-auto">
        {children}
      </section>
      {showScroll && (
        <div className="absolute bottom-10 sm:bottom-20 left-0 w-full text-center">
          <p className="text-xs inline-flex items-center justify-center gap-x-0.5 w-max mx-auto font-semibold">
            <small className="scroll-text">s</small>
            <small className="scroll-text">c</small>
            <small className="scroll-text">r</small>
            <small className="scroll-text">o</small>
            <small className="scroll-text">l</small>
            <small className="scroll-text">l</small>
          </p>
        </div>
      )}
      <div
        className={`absolute bottom-24 sm:bottom-36 right-2 bg-contain bg-repeat w-auto h-auto grid place-items-end pointer-events-none `}
      >
        <h2
          className={`uppercase absolute z-0 text-4xl sm:text-6xl lg:text-7xl font-black bg-contain leading-[0.75] md:leading-[0.75] xl:leading-[0.75] w-min max-w-[17rem] sm:max-w-sm md:max-w-md break-words text-right block box-decoration-clone opacity-30`}
        >
          {styledContent}
        </h2>
        <h2
          className={`styledText uppercase absolute z-10 text-4xl sm:text-6xl lg:text-7xl ${
            isDarkMode
              ? "bg-[url('/styledDark.webp')]"
              : "bg-[url('/styledImg.webp')]"
          } opacity-100 font-black bg-contain leading-[0.75] md:leading-[0.75] xl:leading-[0.75] w-min max-w-[17rem] sm:max-w-sm md:max-w-md break-words text-right block box-decoration-clone`}
        >
          {styledContent}
        </h2>
      </div>
    </header>
  );
};
