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
    <header className="h-screen w-full mx-auto relative block pt-20">
      <section className="flex flex-col items-start px-8 h-4/5 md:h-3/4 w-full max-w-4xl mx-auto">
        {children}
      </section>
      {showScroll && (
        <div className="absolute bottom-10 left-0 w-full text-center">
          <p className="text-xs inline-flex items-center justify-center gap-x-0.5 w-max mx-auto font-semibold uppercase">
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
        className={`absolute bottom-24 right-2 bg-contain bg-repeat w-auto h-auto grid place-items-end pointer-events-none `}
      >
        <h2
          className={`styledText uppercase absolute z-10 text-6xl sm:text-7xl ${
            isDarkMode
              ? "bg-[url('/styledDark.webp')]"
              : "bg-[url('/styledImg.webp')]"
          } opacity-100 xl:text-8xl font-black bg-contain leading-[0.75] md:leading-[0.75] xl:leading-[0.75] w-min max-w-[17rem] sm:max-w-[30rem] xl:max-w-lg break-words text-right block box-decoration-clone`}
        >
          {styledContent}
        </h2>
      </div>
    </header>
  );
};
