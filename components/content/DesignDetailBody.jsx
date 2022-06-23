import Image from "next/image";
import { useContext } from "react";
// import : external
import { motion } from "framer-motion";
import Markdown from "react-markdown";

// import : internal
import { PUBLIC_URLS, titleCase } from "../../utils";
import { ThemeContext } from "../../contexts/ThemeContext";
import { PageLink } from "../portfolio/PageLink";
import { DetailHeader } from "../detail/Header";
import { Conclusion } from "../detail/Conclusion";
import GridContent from "../detail/GridContent";
import UserFlow from "./UserFlow";

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
      <figure className="min-h-[75vh] xl:min-h-[95vh] w-full relative flex flex-col items-center justify-evenly md:p-10">
        <div className="min-h-[75vh] xl:min-h-[95vh] relative w-full md:w-11/12 mx-auto md:rounded-md overflow-hidden">
          <Image
            loader={({ src, width }) => `${src}?w=${width}`}
            src={design.thumbnail}
            layout="fill"
            className="object-cover inset-0 h-full w-full"
            alt={`Design thumbnail of ${design.title}`}
          />
        </div>
        <figcaption className="content--sub text-center italic mt-4">
          {titleCase(design.caption)}
        </figcaption>
      </figure>

      {/* role */}
      <GridContent text={design.role} heading="About project" />

      {/* user flow */}
      <UserFlow
        text={`This project design has **${
          design.userFlowSteps.length
        }** pages/screens viz *${design.userFlowSteps
          .map((el) => el.title)
          .join(
            ", "
          )}*. A brief description of what the basic funtionalities of the page are given along with the designs, UI and overall appearance. The flow sticks as close to the actual site's user flow as possible. The designs are created using **Figma**.`}
        heading="User flow + pages"
        steps={design.userFlowSteps}
      />

      {/* typography */}
      <GridContent
        text={`To create this design, **${design.typography.length}** font families and **${design.colorPalette.length}** color schemes have been used. A brief summary of the same are detailed below`}
        heading="colors + fonts"
      />
      <ul className="flex flex-col items-start justify-around gap-y-6 w-full py-4">
        {design.typography.map(({ family, desc }, i) => (
          <li
            key={i}
            className="section-wrapper gap-4 max-w-5xl w-full mx-auto md:grid md:grid-cols-4"
          >
            <h2 className="heading--sub uppercase md:col-start-2 md:col-end-5">
              {family}
            </h2>
            <div className="markdown-editor-wrapper text-justify md:col-start-2 md:col-end-5">
              <Markdown>{desc}</Markdown>
            </div>
          </li>
        ))}
      </ul>

      {/* colors */}
      <div className="section-wrapper gap-4 max-w-5xl w-full mx-auto md:grid md:grid-cols-4">
        <h2 className="heading--sub uppercase md:col-start-2 md:col-end-5">
          Color palette
        </h2>
        <ul className="md:col-start-2 md:col-end-5 flex flex-wrap items-center justify-start gap-6 mt-6">
          {design.colorPalette.map(({ hex }, i) => (
            <li key={i} className={`flex flex-col items-center gap-y-2`}>
              <div
                style={{
                  backgroundImage: `radial-gradient(farthest-corner, ${hex},${hex},${hex}, currentColor)`,
                }}
                className={`h-20 w-20 shadow-lg rounded-full z-20 block`}
              ></div>
              <p className={`uppercase content--sub text-center`}>
                <small>{hex}</small>
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* external resources */}
      {design.externalResources.length > 0 && (
        <section className="my-28">
          <GridContent
            heading="External resources"
            text={`To create the design for **${titleCase(design.title)}**, ${
              design.externalResources.length
            } images/posters were used. A link to the artist's account is provided along with the images. I wholeheartedly thank them for letting me use their IP for my design.`}
          />
          <ul className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto gap-20 md:gap-x-6 md:gap-y-12 w-full px-6 place-items-center mt-20">
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
      )}

      {/* conclusion */}
      <Conclusion
        heading="Conclusion"
        text={`This project is a work of imagination and bears resemblance with no product. If you want to use this design in your project, please ask me for permission. If you wish to see this design as a project, let me know the same.`}
        repo={null}
        demo={null}
      />
    </div>
  );
};
