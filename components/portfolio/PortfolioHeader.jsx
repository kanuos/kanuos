import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { staticMetadata } from "../../utils/portfolio_static";
import { ShadowText } from "./ShadowText";

const variants = {
  wrapper: {
    initial: {
      opacity: 0.5,
    },
    final: {
      opacity: 1,
      transition: {
        type: "linear",
        when: "beforeChildren",
        staggerChildren: 0.25,
      },
    },
  },
  shadow: {
    initial: {
      opacity: 0,
    },
    final: {
      opacity: 1,
      transition: {
        type: "linear",
      },
    },
  },
  children: {
    initial: {
      scaleY: 0,
      opacity: 0,
    },
    final: {
      scaleY: 1,
      opacity: 1,
      transition: {
        type: "linear",
        when: "beforeChildren",
        delay: 0.25,
        delayChildren: 0.25,
        staggerChildren: 0.25,
      },
    },
  },
  linear: {
    initial: {
      y: 100,
      scaleY: 0,
      opacity: 0,
    },
    final: {
      y: 0,
      scaleY: 1,
      opacity: 1,
      transition: {
        type: "linear",
        staggerChildren: 0.5,
      },
    },
  },
};

const PortfolioHeader = () => {
  const [greeting, setGreeting] = useState();

  useEffect(() => {
    const time = new Date().getHours();

    // 5pm onwards
    if (time > 17) {
      setGreeting(() => "evening");
      return;
    }
    // 12pm to 5pm
    if (time >= 12) {
      setGreeting(() => "afternoon");
      return;
    }
    // 4am to 12pm
    if (time >= 4) {
      setGreeting(() => "morning");
      return;
    }
    setGreeting(() => "night");
  }, [greeting]);

  return (
    <motion.header
      initial="initial"
      whileInView="final"
      viewport={{ once: true }}
      variants={variants.wrapper}
      className="relative h-[90vh] w-full px-10 grid grid-rows-6 max-w-3xl mx-auto"
    >
      <motion.div
        variants={variants.wrapper}
        className="h-4/6 flex flex-col items-start justify-center z-10 w-full max-w-xl mx-auto relative row-start-2 row-end-5"
      >
        <motion.div variants={variants.shadow}>
          <ShadowText text="full stack developer" />
        </motion.div>
        <motion.h1
          variants={variants.children}
          className="text-7xl md:text-8xl w-min tracking-tighter capitalize pb-2 select-none"
        >
          Good {greeting},
        </motion.h1>
        <motion.p
          variants={variants.children}
          className="text-sm font-semibold mt-4 mb-2 md:text-sm inline-flex gap-x-1"
        >
          <motion.span variants={variants.children} className="opacity-50">
            I am
          </motion.span>
          <motion.strong
            variants={variants.children}
            className="font-semibold text-primary"
          >
            {staticMetadata.name}
          </motion.strong>
        </motion.p>
        <motion.small
          variants={variants.children}
          className="text-xs w-1/2 md:text-sm opacity-50"
        >
          {staticMetadata.miniBio}
        </motion.small>
      </motion.div>

      <motion.div
        variants={variants.children}
        className="block z-10 w-full row-start-6"
      >
        <motion.p
          variants={variants.linear}
          className="w-full flex items-center justify-center flex-col text-xs z-10"
        >
          <motion.span
            variants={variants.linear}
            className=" block mb-1 bg-primary h-20 w-px animate-bounce delay-300"
          ></motion.span>
          <motion.small
            variants={variants.linear}
            className="uppercase tracking-tight font-semibold block"
          >
            scroll
          </motion.small>
        </motion.p>
      </motion.div>
    </motion.header>
  );
};

export default PortfolioHeader;
