export const StyledHeader = ({
  children,
  styledText = "",
  isDarkMode = false,
}) => {
  return (
    <header className="h-[97vh] lg:h-screen w-full mx-auto relative grid place-items-center">
      <section className="flex flex-col items-start px-10 h-4/5 md:h-3/4 w-full max-w-4xl">
        {children}
      </section>
      <div className="absolute bottom-20 right-2 w-full grid place-items-end pointer-events-none">
        <h2
          className={`uppercase ${
            isDarkMode
              ? "bg-[url('/styledDark.webp')]"
              : "bg-[url('/styledImg.webp')]"
          } bg-clip-text text-transparent text-7xl md:text-8xl xl:text-9xl font-black bg-contain leading-[0.75] md:leading-[0.75] xl:leading-[0.75] w-min max-w-xs md:max-w-md xl:max-w-xl break-words text-right`}
        >
          {styledText}
        </h2>
      </div>
    </header>
  );
};
