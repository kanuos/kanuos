import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

export const ImageCarousel = ({
  title = "",
  images = [],
  miniMode = false,
  isDarkMode,
}) => {
  const [currentImage, setCurrentImage] = useState(0);

  function navigateNext() {
    if (currentImage === images.length - 1) {
      return;
    }
    setCurrentImage((prev) => prev + 1);
  }

  function navigatePrev() {
    if (currentImage === 0) {
      return;
    }
    setCurrentImage((prev) => prev - 1);
  }

  function getClass(condition) {
    if (condition) {
      return `opacity-100 transition-all rounded-full block bg-secondary bg-opacity-20 cursor-pointer font-semibold p-4 box-border hover:bg-opacity-30 relative`;
    }
    return `opacity-50 cursor-not-allowed rounded-full block p-4 box-border relative`;
  }
  return (
    <div className="relative w-full p-4">
      {images.length > 1 && (
        <div className="absolute z-20 top-1/2 -translate-y-1/2 left-0 w-full flex items-center justify-between">
          <button
            className={
              getClass(currentImage > 0) +
              ` after:content-["‹"] after:absolute after:top-1/2 after:left-1/2 after:text-2xl after:-translate-y-1/2 after:-translate-x-1/2 after:text-current after:pointer-events-none`
            }
            onClick={navigatePrev}
          ></button>
          <button
            className={
              getClass(currentImage < images.length - 1) +
              ` after:content-["›"] after:absolute after:top-1/2 after:left-1/2 after:text-2xl after:-translate-y-1/2 after:-translate-x-1/2 after:text-current after:pointer-events-none`
            }
            onClick={navigateNext}
          ></button>
        </div>
      )}
      <div className="flex justify-start w-full items-start">
        {images.map((image, i) => (
          <motion.figure
            key={i}
            transition={{
              type: "spring",
              duration: 0.2,
            }}
            animate={
              currentImage === i
                ? {
                    opacity: 1,
                    x: 0,
                  }
                : {
                    opacity: 0,
                    x: currentImage > i ? -200 : 200,
                  }
            }
            className={`h-full w-full mb-2 z-10 snap-center p-2 
            ${
              currentImage === i
                ? "flex flex-col items-center justify-center"
                : "hidden"
            }`}
          >
            <div
              className={`relative h-full w-full rounded-md overflow-hidden p-2
              
              ${miniMode ? "min-h-[45vh]" : "min-h-[75vh]"}`}
            >
              <Image
                loader={({ src, width }) => `${src}?w=${width}&q=100`}
                layout="fill"
                objectFit="contain"
                priority
                src={image}
                alt={title}
                className={`h-full w-full object-scale-down block`}
              />
            </div>
          </motion.figure>
        ))}
      </div>
      {images.length > 1 && images.length < 6 && (
        <ul className="flex items-center justify-center gap-1 mt-4">
          {images.map((_, i) => (
            <li key={i}>
              <button
                onClick={() => setCurrentImage(() => i)}
                className={
                  "h-2 w-2 rounded-full bg-secondary transition-all " +
                  (currentImage === i ? "opacity-100" : "opacity-40")
                }
              >
                <span className="hidden">button</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
