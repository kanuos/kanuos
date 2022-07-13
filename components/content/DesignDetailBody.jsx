import Image from "next/image";
import { useContext, useState } from "react";
// import : external
import { motion } from "framer-motion";

// import : internal
import { PUBLIC_URLS, titleCase } from "../../utils";
import { ThemeContext } from "../../contexts/ThemeContext";
import { PageLink } from "../portfolio/PageLink";
import { CTA } from "../portfolio/CTA";
import { DetailHeader } from "../detail/Header";
import { Conclusion } from "../detail/Conclusion";
import { Screens, UserFlow } from "./UserFlow";
import { MarkdownStep } from "../public/PageStepComponent";

export const DesignDetailBody = ({ design = null }) => {
  const { isDarkMode } = useContext(ThemeContext);
  const [tab, setTab] = useState(0);

  function selectTab(i) {
    return () => setTab(i);
  }

  if (!design) return <></>;

  const colors = [...design.colorPalette, ...design.colorPalette];

  return (
    <div
      className={
        "scrollbar-none relative h-full w-full min-h-screen " +
        (isDarkMode ? "bg-hero--dark" : "bg-hero--light")
      }
    >
      <DetailHeader
        category={design.category}
        isDarkMode={isDarkMode}
        back={{
          url: PUBLIC_URLS.designs.url,
          text: "Back to designs",
        }}
        title={design.title}
        desc={design.desc}
        date={design.date}
        tags={design.tags}
      />

      {/* thumbnail */}
      <figure className="h-auto overflow-hidden w-full max-w-7xl mx-auto relative px-8">
        <Image
          layout="responsive"
          height={"100%"}
          width="100%"
          src={design.thumbnail}
          className="rounded-lg drop-shadow-xl block object-cover"
          alt={`Design thumbnail of ${design.title}`}
          loader={({ src, width }) => `${src}?w=${width}&q=100`}
        />
        <figcaption className="content--sub italic text-center mt-2">
          {titleCase(design.caption)}
        </figcaption>
      </figure>

      <div className="mt-20 w-full max-w-4xl mx-auto flex items-center justify-center gap-4 flex-wrap">
        <CTA
          label="My role"
          cb={selectTab(0)}
          btnMode={true}
          isActive={tab === 0}
          tiny={true}
          isDarkMode={isDarkMode}
        />
        <CTA
          label="Typography"
          cb={selectTab(1)}
          btnMode={true}
          isActive={tab === 1}
          tiny={true}
          isDarkMode={isDarkMode}
        />
        <CTA
          label="Colors"
          cb={selectTab(2)}
          btnMode={true}
          isActive={tab === 2}
          tiny={true}
          isDarkMode={isDarkMode}
        />
      </div>

      {/* role */}
      {tab === 0 && (
        <section className="px-8 content--secondary w-full max-w-4xl mx-auto mt-10">
          <MarkdownStep text={design.role} />
        </section>
      )}

      {/* fonts */}
      {tab === 1 && (
        <section className="px-8 w-full max-w-4xl mx-auto mt-10">
          <ul className="flex flex-col items-start justify-around gap-y-6 w-full py-4">
            {design.typography.map(({ family, desc }, i) => (
              <li
                key={i}
                className="content--secondary gap-2 max-w-4xl w-full mx-auto"
              >
                <h2 className="heading--sub text-primary mb-2">
                  {titleCase(family)}
                </h2>
                <MarkdownStep text={desc} />
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* colors */}
      {tab === 2 && (
        <section className="px-8 w-full max-w-4xl mx-auto mt-10">
          <ul
            className={`gap-6 w-full transition-all flex flex-wrap items-center justify-center`}
          >
            {colors.map(({ hex }, i) => (
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
      )}

      {/* user flow + screens */}
      <section
        className={`relative h-full w-full my-10 py-20 px-8 ${
          isDarkMode ? "nav-dark" : "nav-light"
        }`}
      >
        <div>
          <h2 className="heading--main text-center">User flow</h2>
          <UserFlow steps={design.userFlowSteps} isDarkMode={isDarkMode} />
        </div>

        <div>
          <h2 className="heading--main text-center">All pages</h2>
          <p className="content--secondary opacity-75 text-justify w-3/4 max-w-lg mx-auto">
            {titleCase(design.title)} has {design.userFlowSteps.length} pages
            and are listed below. By default, grid view is selected. To view the
            full sized images click the list view.
          </p>
          <Screens steps={design.userFlowSteps} isDarkMode={isDarkMode} />
        </div>
      </section>

      {/* external resources */}
      {design.externalResources.length > 0 && (
        <>
          <section className="w-full max-w-4xl mx-auto px-8 lg:px-0">
            <div className="flex flex-col items-start mb-10 gap-y-2 md:gap-y-6">
              <h2 className="heading--main capitalize">external resources</h2>
              <p className="content--secondary text-justify">
                This project uses {design.externalResources.length} assets in
                its design. Here's a list of all the assets along with the
                artists and links to their accounts!
              </p>
            </div>
            <ul className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 gap-20 md:gap-x-6 md:gap-y-12 w-full px-6 place-items-center">
              {design.externalResources.map(
                ({ poster, courtesy, photographer }, i) => (
                  <li
                    key={i}
                    className="flex flex-col w-full max-w-xs even:ml-auto odd:mr-auto md:even:ml-0 md:odd:mr-0 items-start group gap-6"
                  >
                    <div className="bg-light w-full h-60 aspect-square overflow-hidden p-2.5 filter shadow-xl group-hover:shadow-2xl group-hover:drop-shadow-2xl transition-all group-hover:even:rotate-1 group-hover:odd:-rotate-1 md:group-hover:scale-110">
                      <figure className="relative w-full h-full">
                        <Image
                          loader={({ src, width }) => `${src}?w=${width}&q=100`}
                          layout="fill"
                          alt={`Pic courtesy ${photographer}`}
                          src={poster}
                          objectFit="cover"
                          priority={true}
                          className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all"
                        />
                      </figure>
                    </div>

                    <div className="px-4">
                      <p className="content--secondary">
                        <small>Asset Credit</small>
                      </p>
                      <div className="w-max">
                        <PageLink
                          isExternal={true}
                          label={titleCase(photographer)}
                          href={courtesy}
                        />
                      </div>
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
