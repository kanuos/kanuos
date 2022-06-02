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

  const commonCls = `uppercase absolute text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black bg-contain leading-[0.75] md:leading-[0.75] xl:leading-[0.75] w-min max-w-xs sm:max-w-sm md:max-w-md break-words text-right block box-decoration-clone`;

  return (
    <header className="min-h-screen h-full w-full mx-auto relative block pt-20">
      <section className="flex flex-col items-start px-8 md:px-10 h-4/5 md:h-3/4 w-full max-w-4xl mx-auto">
        {children}
      </section>
      {showScroll && (
        <div className="absolute bottom-10 sm:bottom-20 left-0 w-full text-center">
          <p className="text-xs inline-flex items-center justify-center gap-x-0.5 w-max mx-auto font-semibold uppercase">
            <small className="scroll-text">s</small>
            <small className="scroll-text">c</small>
            <small className="scroll-text">r</small>
            <small className="scroll-text">o</small>
            <small className="scroll-text">l</small>
            <small className="scroll-text">l</small>
            <small className="scroll-text">↓</small>
          </p>
        </div>
      )}
      <div
        className={`absolute bottom-32 sm:bottom-36 right-2 bg-contain bg-repeat w-auto h-auto grid place-items-end pointer-events-none `}
      >
        <h2 className={`z-0 opacity-50 ${commonCls}`}>{styledContent}</h2>
        <h2
          className={`styledText z-10 opacity-100 ${commonCls} ${
            isDarkMode
              ? "bg-[url('/styledDark.webp')]"
              : "bg-[url('/styledImg.webp')]"
          }`}
        >
          {styledContent}
        </h2>
      </div>
    </header>
  );
};
