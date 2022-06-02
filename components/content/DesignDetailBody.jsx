import Image from "next/image";
import { useContext } from "react";
// import : external
import { motion } from "framer-motion";
import Markdown from "react-markdown";

// import : internal
import { PUBLIC_URLS } from "../../utils";
import { ThemeContext } from "../../contexts/ThemeContext";
import { PageLink } from "../portfolio/PageLink";
import { ImageCarousel } from "./ImageCarousel";
import { DetailHeader } from "../detail/Header";

export const DesignDetailBody = ({ design }) => {
  const { isDarkMode } = useContext(ThemeContext);
  return (
    <div
      className={
        "scrollbar-none overflow-hidden relative h-full w-full min-h-screen " +
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

      <div className="relative h-auto w-full max-w-4xl mx-auto">
        {/* role */}
        <section className="section-wrapper">
          <div className="flex flex-col md:flex-row gap-4 mt-10 md:gap-x-14">
            <h2 className="heading--secondary shrink-0 grow">My Role</h2>
            <div className="markdown-editor-wrapper text-justify md:w-5/6">
              <Markdown>{design.role}</Markdown>
            </div>
          </div>
        </section>
      </div>
      {/* thumbnail */}
      <figure className="h-[75vh] xl:h-screen w-full relative flex flex-col items-center justify-evenly">
        <div className="h-5/6 relative w-full">
          <Image
            loader={({ src, width }) => `${src}?w=${width}`}
            src={design.thumbnail}
            layout="fill"
            className="object-cover top-0 left-0 h-full w-full"
            alt={`Design thumbnail of ${design.title}`}
          />
        </div>
        <figcaption className="content--sub text-center italic">
          {design.caption}
        </figcaption>
      </figure>

      <div className="relative h-auto w-full max-w-4xl mx-auto">
        <h2 className="heading--main w-min mx-auto py-20 text-center leading-relaxed">
          Style Guide
        </h2>
        {/* typography */}
        <section className="section-wrapper pb-20">
          <h2 className="heading--secondary mb-10 md:mx-auto">Typography</h2>
          <ul className="flex flex-col items-start justify-around gap-y-6 w-full py-4 after-line md:after-line--center">
            {design.typography.map(({ family, desc }, i) => (
              <li
                key={i}
                className="relative z-10 flex flex-col justify-center rounded-md w-full md:w-3/4 md:even:ml-auto md:odd:mr-auto gap-4 p-6 md:odd:items-start md:even:items-end group nav-light drop-shadow-xl"
              >
                <strong className={`heading--sub`}>{family}</strong>
                <p className="content--sub text-justify md:group-even:text-right md:group-odd:text-left">
                  {desc}
                </p>
              </li>
            ))}
          </ul>
        </section>

        {/* colors */}
        <section className="section-wrapper pb-20">
          <h2 className="heading--secondary mb-10 md:mx-auto">Color palette</h2>
          <div className="w-full py-4 after-line md:after-line--center">
            <ul className="grid grid-cols-4 gap-y-6 gap-x-6  w-full z-10 relative  rounded-md nav-light drop-shadow-xl p-4">
              {design.colorPalette.map(({ hex }, i) => (
                <li key={i} className={`flex flex-col items-center gap-y-2 `}>
                  <div
                    style={{
                      backgroundColor: `${hex}`,
                    }}
                    className={`h-10 w-full md:h-20 shadow-lg rounded ${
                      isDarkMode ? "light-shadow" : "dark-shadow"
                    }`}
                  ></div>
                  <p className={`uppercase content--sub text-center`}>{hex}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>

      <div className="relative h-auto w-full max-w-6xl mx-auto">
        <h2 className="heading--main w-min mx-auto py-14">User Flow</h2>
        {/* user flow */}
        <section className="section-wrapper pb-20">
          <ul className="w-full gap-y-10 flex flex-col after-line--center py-6 lg:gap-y-20 lg:py-20">
            {design.userFlowSteps.map(({ images = [], about, title }, i) => (
              <motion.li
                key={i}
                className="flex flex-col items-start relative z-10 rounded-md w-full group "
              >
                <section
                  className={
                    "relative z-10 p-4 lg:p-8 block w-11/12 max-w-lg rounded-md group-even:ml-auto group-odd:mr-auto lg:flex lg:w-full lg:max-w-4xl lg:gap-x-6 lg:group-even:flex-row-reverse lg:group-odd:flex-row nav-light " +
                    (isDarkMode ? "light-shadow" : "drop-shadow-2xl")
                  }
                >
                  <div className="mb-6 w-full flex flex-col py-2 gap-y-4  group-even:text-right group-odd:text-left">
                    <strong className="heading--sub">{title}</strong>
                    <p className="content--sub max-w-xl">{about}</p>
                  </div>
                  {images.length > 0 && (
                    <ImageCarousel
                      title={title}
                      images={images}
                      isDarkMode={isDarkMode}
                      miniMode={true}
                    />
                  )}
                </section>
              </motion.li>
            ))}
          </ul>
        </section>
      </div>
      <section className="section-wrapper pb-10">
        {/* external resources */}
        <div className="relative h-auto w-full max-w-7xl mx-auto">
          <h2 className="heading--secondary mb-10 md:mx-auto md:w-max md:mb-20">
            External Resources
          </h2>
          <ul
            className={
              design.externalResources.length >= 3
                ? "relative z-10 grid place-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full"
                : "relative z-10 flex flex-wrap items-center justify-start md:justify-center gap-6 md:gap-16 w-full"
            }
          >
            {design.externalResources.map(
              ({ poster, courtesy, photographer }, i) => (
                <li
                  key={i}
                  className="flex flex-col w-full max-w-xs even:ml-auto odd:mr-auto md:even:ml-0 md:odd:mr-0 items-center group hover:even:rotate-1 hover:odd:-rotate-1 md:even:rotate-1 md:odd:-rotate-1 md:hover:odd:rotate-0 md:hover:even:rotate-0 md:hover:scale-110 transition-all"
                >
                  <div className="bg-light w-full h-48 md:h-60 aspect-square overflow-hidden p-2.5 filter shadow-xl group-hover:shadow-2xl group-hover:drop-shadow-2xl transition-all">
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
                  <div className="my-4 flex flex-col w-full items-center gap-y-1 group-hover:even:-rotate-1 group-hover:odd:rotate-1 md:group-hover:even:rotate-0 md:group-hover:odd:rotate-0">
                    <p className="content--secondary text-center">
                      <small>Asset Credit</small>
                    </p>
                    <div className="w-max mx-auto">
                      <PageLink
                        isExternal={true}
                        label={photographer}
                        href={courtesy}
                      />
                    </div>
                  </div>
                </li>
              )
            )}
          </ul>
        </div>
      </section>

      <div className="relative h-auto w-full max-w-4xl mx-auto">
        {/* conclusion */}
        <section className="section-wrapper pb-20">
          <div className="flex flex-col md:flex-row gap-4 mt-10 md:gap-x-14">
            <h2 className="heading--secondary mb-6 shrink-0 grow">
              Conclusion
            </h2>
            <div className="flex flex-col items-start w-full">
              <p className="content--secondary text-justify w-11/12 max-w-md">
                This project is a work of imagination and bears resemblance with
                no product. If you want to use this design in your project,
                please ask me for permission. If you wish to see this design as
                a project, let me know the same.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
