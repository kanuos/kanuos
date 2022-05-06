export const StyledHeader = ({
  children,
  styledText = "",
  isDarkMode = false,
}) => {
  const styledContent = styledText.split(" ").map((text, i) => (
    <div key={i}>
      <span>{text}</span>
      <br />
    </div>
  ));
  return (
    <header className="h-screen w-full mx-auto relative grid place-items-center">
      <section className="flex flex-col items-start px-10 h-4/5 md:h-3/4 w-full max-w-4xl">
        {children}
      </section>
      <div
        className={`absolute bottom-20 right-2 bg-contain bg-repeat w-auto h-auto grid place-items-end pointer-events-none `}
      >
        <h2
          className={`styledText uppercase absolute z-10 text-6xl ${
            isDarkMode
              ? "bg-[url('/styledDark.webp')]"
              : "bg-[url('/styledImg.webp')]"
          } opacity-100 sm:text-7xl md:text-8xl xl:text-[8.5rem] font-black bg-contain leading-[0.75] md:leading-[0.75] xl:leading-[0.75] w-min max-w-[20rem] md:max-w-lg xl:max-w-2xl break-words text-right block box-decoration-clone`}
        >
          {styledContent}
        </h2>
      </div>
    </header>
  );
};
