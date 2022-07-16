import { motion } from "framer-motion";
import Image from "next/image";

import { titleCase } from "../../utils";

export const Screens = ({ steps = [] }) => {
  return (
    <div className="relative w-full">
      <ul className={`w-full  gap-x-4 py-6 mx-auto flex flex-col`}>
        {steps.map(({ images }, k) => {
          images = images.filter(Boolean);
          const hasMultipleImages = images.length > 1;
          return (
            <motion.li
              key={k}
              className={`block drop-shadow-2xl w-full mx-auto`}
            >
              {hasMultipleImages ? (
                <div className="w-full h-auto odd:bg-dark__light even:bg-light py-10 lg:py-40">
                  <figure
                    className={`relative h-auto w-full grid gap-10 max-w-5xl mx-auto px-8  ${
                      images.length == 2 ? "grid-cols-2" : "grid-cols-3"
                    }
                  `}
                  >
                    {images.map((img, i) => (
                      <Image
                        layout="responsive"
                        height="0%"
                        width="100%"
                        priority={true}
                        alt={`image #${i + 1}`}
                        src={img}
                        objectFit="contain"
                        loader={({ src, width }) => `${src}?w=${width}&q=100`}
                        className="userflow-img"
                      />
                    ))}
                  </figure>
                </div>
              ) : (
                <div className="w-full h-auto odd:bg-dark__light even:bg-light py-10 lg:py-40">
                  <figure
                    className={`relative block h-auto w-full max-w-5xl mx-auto px-8`}
                  >
                    <Image
                      layout="responsive"
                      height="0%"
                      width="100%"
                      priority={true}
                      alt={`image #${k + 1}`}
                      src={images[0]}
                      objectFit="contain"
                      loader={({ src, width }) => `${src}?w=${width}&q=100`}
                      className="userflow-img"
                    />
                  </figure>
                </div>
              )}
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
};

export const UserFlow = ({ steps = [], isDarkMode }) => {
  return (
    <div className="relative w-full pt-20 mb-20 after-line--center">
      <ul className={`w-full flex flex-col`}>
        {steps.map(({ about, title }, i) => (
          <motion.li
            key={i}
            className={`my-6 last:mb-0 max-w-3xl mx-auto w-full h-auto z-10 group grid grid-rows-6 grid-cols-6 ${
              isDarkMode ? "nav-dark" : "nav-light"
            }`}
          >
            <div
              className={`group-last:border-0 border-2 border-secondary group-odd:col-start-4 group-odd:col-end-7 group-even:col-start-1 group-even:col-end-4 group-even:border-r-0 group-odd:border-l-0 row-start-4 row-end-7 z-10 h-full w-full animate-pulse ${
                isDarkMode ? "nav-dark" : "nav-light"
              } group-odd:rounded-r-md group-even:rounded-l-md`}
            ></div>
            <section
              className={`row-start-1 w-full z-20 p-6 rounded-md ${
                isDarkMode ? "nav-dark--light" : "nav-light"
              } drop-shadow-2xl ${
                steps.length === 1
                  ? "col-span-full row-end-7"
                  : "row-end-6 group-odd:col-start-1 group-even:col-start-2  group-odd:col-end-6 group-even:col-end-7"
              }`}
            >
              {steps.length > 1 && (
                <p className="text-xs">
                  <small className="py-1 bg-opacity-10 rounded-sm font-bold text-primary">
                    {(i + 1).toString().padStart(2, "0")}&nbsp;&mdash;&nbsp;
                    {steps.length.toString().padStart(2, "0")}
                  </small>
                </p>
              )}
              <h3 className="heading--sub mb-4">{titleCase(title)}</h3>
              <p className="content--sub">{about}</p>
            </section>
          </motion.li>
        ))}
      </ul>
    </div>
  );
};
