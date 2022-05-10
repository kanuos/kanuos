import { useState } from "react";
import Image from "next/image";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { motion } from "framer-motion";

export const ImageCarousel = ({ title = "", images = [] }) => {
  const navCls = `opacity-60 scale-125 hover:scale-150 hover:text-primary transition-all`;
  const [currentImage, setCurrentImage] = useState(0);

  function navigateNext() {
    if (currentImage === images.length - 1) {
      setCurrentImage(0);
      return;
    }
    setCurrentImage((prev) => prev + 1);
  }

  function navigatePrev() {
    if (currentImage === 0) {
      setCurrentImage(images.length - 1);
      return;
    }
    setCurrentImage((prev) => prev - 1);
  }

  return (
    <div className="relative w-full p-4">
      {images.length > 1 && (
        <ul className="absolute top-1/2 -translate-y-1/2 left-0 w-full flex items-center justify-between">
          <li>
            <button onClick={navigatePrev} className={navCls}>
              <IoChevronBack />
            </button>
          </li>
          <li>
            <button onClick={navigateNext} className={navCls}>
              <IoChevronForward />
            </button>
          </li>
        </ul>
      )}
      <div className="flex justify-start w-full items-start">
        {images.map((image, i) => (
          <motion.figure
            key={i}
            transition={{
              type: "linear",
              duration: 1,
            }}
            animate={
              currentImage === i
                ? {
                    opacity: 1,
                    scale: 1,
                    x: 0,
                  }
                : {
                    opacity: 0.5,
                    scale: 0.5,
                    x: currentImage > i ? -200 : 200,
                  }
            }
            className={`h-full w-full mb-2 z-10 snap-center ${
              currentImage === i
                ? "flex flex-col items-center justify-center"
                : "hidden"
            }`}
          >
            <div className="relative h-full min-h-[75vh] w-full rounded-md overflow-hidden">
              <Image
                loader={({ src, width }) => `${src}?w=${width}&q=100`}
                layout="fill"
                objectFit="contain"
                priority
                src={image}
                alt={title}
                className="h-full w-full object-scale-down block"
              />
            </div>
          </motion.figure>
        ))}
      </div>
      {images.length > 1 && (
        <ul className="flex items-center justify-center gap-1 mt-4">
          {images.map((_, i) => (
            <li key={i}>
              <button
                onClick={() => setCurrentImage(() => i)}
                className={
                  "h-2 w-2 rounded-full bg-secondary transition-all " +
                  (currentImage === i ? "opacity-100" : "opacity-25")
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
