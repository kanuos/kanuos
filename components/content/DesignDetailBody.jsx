import Image from "next/image";
import dynamic from "next/dynamic";
import { useContext } from "react";
// import : external

// import : internal
import { PUBLIC_URLS, titleCase } from "../../utils";
import { ThemeContext } from "../../contexts/ThemeContext";

const PageLink = dynamic(() =>
  import("../portfolio/PageLink").then((m) => m.PageLink)
);
const DetailHeader = dynamic(() =>
  import("../detail/Header").then((m) => m.DetailHeader)
);
const Conclusion = dynamic(() =>
  import("../detail/Conclusion").then((m) => m.Conclusion)
);
const UserFlow = dynamic(() => import("./UserFlow").then((m) => m.UserFlow));
const Screens = dynamic(() => import("./UserFlow").then((m) => m.Screens));
const MarkdownStep = dynamic(() =>
  import("../public/PageStepComponent").then((m) => m.MarkdownStep)
);

export const DesignDetailBody = ({ design = null }) => {
  const { isDarkMode } = useContext(ThemeContext);

  if (!design) return <></>;

  return (
    <div
      className={
        "scrollbar-none relative h-full w-full min-h-screen " +
        (isDarkMode ? "bg-hero--dark" : "bg-hero--light")
      }
    >
      <DetailHeader
        caption={
          <small className="font-bold uppercase">{design.category}</small>
        }
        title={design.title}
        items={[
          {
            heading: "author",
            content: (
              <PageLink href={PUBLIC_URLS.portfolio.url} label="Sounak" />
            ),
          },
          {
            heading: "tags",
            content: design.tags.map((tag) => tag.tag),
          },
          {
            heading: "year",
            content: new Date(design.date).getUTCFullYear(),
          },
        ]}
        thumbnail={design.thumbnail}
        figcaption={design.caption}
      />

      {/* user flow + screens */}
      <section
        className={`relative h-full w-full mt-10 pt-20 ${
          isDarkMode ? "nav-dark" : "nav-light"
        }`}
      >
        <div className="w-full max-w-4xl mx-auto px-8 border-b pb-4">
          <MarkdownStep text={design.desc} firstLetter={true} />
        </div>

        <section className="px-8 content--secondary w-full max-w-4xl mx-auto mt-10">
          <MarkdownStep text={design.role} />
        </section>

        {/* fonts */}
        <section className="px-8 w-full max-w-4xl mx-auto my-20">
          <h2 className="heading--main text-center pb-6">Typography</h2>

          <article
            className={`px-8 mt-8 flex flex-col gap-y-10 after-line--center lg:after:hidden w-full max-w-3xl mx-auto lg:max-w-none lg:flex-row lg:justify-center lg:items-stretch h-auto lg:gap-6 ${
              design.typography.length > 1 ? "skill__card__container" : ""
            }`}
          >
            {design.typography.map(({ family, desc }, i) => (
              <section
                key={i}
                className={`p-6 z-10 w-5/6 lg:w-full group max-w-lg lg:hover:scale-105 transition-all will-change-transform ${
                  design.typography.length > 1 ? "skill__card" : ""
                } ${
                  i % 2
                    ? "ml-auto lg:ml-0 lg:translate-y-6"
                    : "mr-auto lg:mr-0 lg:-translate-y-6"
                } max-w-lg rounded-md drop-shadow-2xl ${
                  isDarkMode
                    ? "bg-dark__light text-light"
                    : "bg-light text-dark"
                }`}
              >
                <strong
                  className={`heading--secondary capitalize font-bold break-words bg-gradient-to-r group-odd:from-primary group-even:from-secondary bg-clip-text lg:group-hover:text-transparent will-change-transform ${
                    isDarkMode ? "to-light" : "to-dark"
                  }`}
                >
                  {family}
                </strong>
                <MarkdownStep text={desc} />
              </section>
            ))}
          </article>
        </section>

        {/* colors */}
        <section className="px-8 w-full max-w-4xl mx-auto pt-20">
          <h2 className="heading--main text-center">Color Palette</h2>
          <div className="text-center w-max mb-4 mx-auto opacity-75">
            <MarkdownStep
              text={`For this project **${design.colorPalette?.length}** colors were picked.`}
            />
          </div>
          <ul
            className={`gap-6 mt-20 w-full transition-all flex flex-wrap items-center justify-center`}
          >
            {design.colorPalette?.map(({ hex }, i) => (
              <li
                key={i}
                className={`w-32 h-32 rounded-full grid place-items-center p-2 ${
                  isDarkMode ? "light-shadow" : "drop-shadow-xl"
                }`}
                style={{
                  backgroundImage: `linear-gradient(${hex}, ${hex}, ${hex})`,
                }}
              >
                <p
                  className={`w-fit h-auto text-xs rounded-full uppercase ${
                    isDarkMode ? "nav-dark" : "nav-light"
                  } p-2 text-center`}
                >
                  <small className="font-bold">{hex}</small>
                </p>
              </li>
            ))}
          </ul>
        </section>
        <div className="px-8 mt-20">
          <h2 className="heading--main text-center">User Flow</h2>
          <UserFlow steps={design.userFlowSteps} isDarkMode={isDarkMode} />
        </div>

        <div className="mt-10">
          <h2 className="heading--main text-center">All pages</h2>
          <p className="text-xs opacity-40 w-3/4 max-w-lg mx-auto mb-10 text-center">
            Here&apos;s a list of all the screens and pages for{" "}
            {titleCase(design.title)}
          </p>
          <Screens steps={design.userFlowSteps} isDarkMode={isDarkMode} />
        </div>
      </section>

      {/* external resources */}
      {design.externalResources.length > 0 && (
        <>
          <section className="w-full max-w-4xl mx-auto px-8">
            <div className="flex flex-col items-start mb-10 gap-y-2 md:gap-y-6">
              <h2 className="heading--main capitalize">external resources</h2>
              <p className="content--secondary">
                This project uses {design.externalResources.length} assets in
                its design. Here&apos;s a list of all the assets along with the
                artists and links to their accounts!
              </p>
            </div>
            <ul className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 gap-20 md:gap-x-6 md:gap-y-12 w-full place-items-center">
              {design.externalResources.map(
                ({ poster, courtesy, photographer }, i) => (
                  <li
                    key={i}
                    className="flex flex-col w-full max-w-xs even:ml-auto odd:mr-auto md:even:ml-0 md:odd:mr-0 items-start group gap-6"
                  >
                    <div className="w-full h-96 aspect-video overflow-hidden rounded-md filter shadow-xl group-hover:shadow-2xl group-hover:drop-shadow-2xl transition-all group-hover:even:rotate-1 group-hover:odd:-rotate-1 md:group-hover:scale-110 relative">
                      <figure className="relative w-full h-full group">
                        <Image
                          loader={({ src, width }) => `${src}?w=${width}&q=100`}
                          layout="fill"
                          alt={`Pic courtesy ${photographer}`}
                          src={poster}
                          objectFit="cover"
                          priority={true}
                          className="h-full w-full object-cover grayscale-0 group-hover:grayscale transition-all"
                        />
                      </figure>
                      <figcaption className="absolute bg-light bg-opacity-90 inset-0 grid place-items-center z-20 translate-y-full group-hover:translate-y-0 transition-all group-hover:pointer-events-auto pointer-events-none">
                        <div className="flex flex-col items-center justify-center gap-2">
                          <p className="text-xs opacity-75">
                            <small>Photo Credit</small>
                          </p>
                          <div
                            className="w-max"
                            title={`Go to ${titleCase(photographer)}'s profile`}
                          >
                            <PageLink
                              isExternal={true}
                              label={titleCase(photographer)}
                              href={courtesy}
                            />
                          </div>
                        </div>
                      </figcaption>
                    </div>
                  </li>
                )
              )}
            </ul>
          </section>
        </>
      )}
      {/* conclusion */}
      <Conclusion
        heading="Conclusion"
        text={`This project is a work of imagination and bears resemblance with no product. If you want to use this design in your project, please ask me for permission. If you wish to see this design as a project, let me know the same.`}
        repo={null}
        demo={null}
      />
      <div className="mx-auto w-max">
        <PageLink
          label="Check out all designs"
          href={PUBLIC_URLS.designs.url}
        />
        <div className="mx-auto w-max relative after-line--center mt-4 pb-40"></div>
      </div>
    </div>
  );
};
