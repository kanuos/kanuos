import Link from "next/link";
import Image from "next/image";
import { useContext } from "react";
// import : external
import { motion } from "framer-motion";
import Markdown from "react-markdown";

// import : internal
import { PUBLIC_URLS } from "../../utils";
import { ThemeContext } from "../../contexts/ThemeContext";
import dynamic from "next/dynamic";
import { PageLink } from "../portfolio/PageLink";
import { ImageCarousel } from "./ImageCarousel";
import { DetailHeader } from "../detail/Header";

const JoinLine = dynamic(() =>
  import("../public/DescHeader").then((m) => m.JoinLine)
);

export const DesignDetailBody = ({ design, adminMode = false }) => {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <div
      className={
        "overflow-hidden relative h-full w-full min-h-screen " +
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

      <div className="relative h-full w-full max-w-4xl mx-auto">
        {/* role */}
        <section className="section-wrapper">
          <h2 className="heading--secondary mt-10 mb-4">My Role</h2>
          <div className="markdown-editor-wrapper text-justify">
            <Markdown>{design.role}</Markdown>
          </div>
        </section>

        {/* thumbnail */}
        <figure className="h-[75vh] xl:h-screen w-screen relative flex flex-col items-center justify-evenly">
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

        <h2 className="heading--main w-min mx-auto py-20 text-center leading-relaxed">
          Style Guide
        </h2>
        {/* typography */}
        <section className="section-wrapper pb-20">
          <h2 className="heading--secondary mb-10">Typography</h2>
          <ul className="flex flex-col items-start justify-around gap-y-6 w-full py-4 after-line">
            {design.typography.map(({ family, desc }, i) => (
              <li
                key={i}
                className="relative z-10 flex flex-col justify-center rounded-md w-full md:w-3/5 md:even:ml-auto md:odd:mr-auto gap-4 p-6 md:odd:items-start md:even:items-end group nav-light drop-shadow-xl"
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
          <h2 className="heading--secondary mb-10">Color palette</h2>
          <div className="w-full py-4 after-line">
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

        <h2 className="heading--main w-min mx-auto py-14">User Flow</h2>
        {/* user flow */}
        <section className="section-wrapper pb-20">
          <ul className="w-full gap-y-10 flex flex-col pr-2 after-line--center">
            {design.userFlowSteps.map(({ images, about, title }, i) => (
              <motion.li
                key={i}
                className="flex flex-col items-start flex-grow relative z-10 rounded-md w-4/5 even:ml-auto odd:mr-auto group"
              >
                <section className="relative z-10 bg-light drop-shadow-xl p-4 block w-full rounded-md">
                  <div className="mb-6 w-full flex flex-col py-2 gap-y-4 group-even:text-right group-odd:text-left">
                    <strong className="heading--sub">{title}</strong>
                    <p className="content--sub">{about}</p>
                  </div>
                  <ImageCarousel
                    title={title}
                    images={images}
                    miniMode={true}
                  />
                </section>
              </motion.li>
            ))}
          </ul>
        </section>

        <h2 className="heading--main w-min mx-auto py-14">Screens</h2>
        <section className="section-wrapper pb-20">
          <ImageCarousel
            images={[
              ...new Set(
                design.userFlowSteps.map((el) => el.images).flatMap((el) => el)
              ),
            ]}
          />
        </section>
        {/* external resources */}
        <section className="section-wrapper pb-10">
          <h2 className="heading--secondary mb-10">External Resources</h2>
          <ul className="w-full block rounded-md drop-shadow-xl">
            <div className="relative z-10 grid place-items-center grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-6 w-full">
              {design.externalResources.map(
                ({ poster, courtesy, photographer }, i) => (
                  <li
                    key={i}
                    className="flex flex-col w-full items-center group hover:even:rotate-2 hover:odd:-rotate-2 md:even:rotate-2 md:odd:-rotate-2 md:hover:rotate-0 transition-all"
                  >
                    <div className="bg-light w-full h-48 overflow-hidden p-2.5 filter shadow-xl group-hover:shadow-2xl group-hover:drop-shadow-2xl transition-all">
                      <figure className="relative w-full h-full">
                        <Image
                          loader={({ src, width }) => `${src}?w=${width}&q=100`}
                          layout="fill"
                          alt={`Pic courtesy ${photographer}`}
                          src={poster}
                          objectFit="cover"
                          className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all"
                        />
                      </figure>
                    </div>
                    <div className="my-4 flex flex-col w-full items-center gap-y-1">
                      <p className="content--secondary text-center">
                        <small>Asset Credit</small>
                      </p>
                      <PageLink
                        isExternal={true}
                        label={photographer}
                        href={courtesy}
                      />
                    </div>
                  </li>
                )
              )}
            </div>
          </ul>
        </section>

        {/* conclusion */}
        <section className="section-wrapper pb-20">
          <h2 className="heading--secondary mb-6">Conclusion</h2>
          <p className="content--secondary">
            This project is a work of imagination and bears resemblance with no
            product. If you want to use this design in your project, please ask
            me for permission. If you wish to see this design as a project, let
            me know the same.
          </p>
          <div className="flex flex-col items-start gap-y-4 pt-6 my-10">
            <PageLink label="Source code" href="" />
            <PageLink label="Live demo" href="" />
          </div>
        </section>
      </div>
    </div>
  );
};
