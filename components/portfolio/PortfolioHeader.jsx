import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { staticMetadata } from "../../utils/portfolio_static";
import { PortfolioLink } from "./PortfolioLink";
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
        delay: 0.25,
        staggerChildren: 0.5,
      },
    },
  },
  children: {
    initial: {
      scale: 0,
      rotate: 10,
    },
    final: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        when: "beforeChildren",
        delayChildren: 0.25,
        delay: 0.25,
        staggerChildren: 0.5,
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
      origin: "bottom",
      transition: {
        type: "linear",
        delay: 0.25,
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
      variants={variants.wrapper}
      whileInView="final"
      initial="initial"
      className="relative h-screen w-full px-10 flex flex-col items-center justify-center max-w-3xl mx-auto"
    >
      <ShadowText text="full stack developer" />

      <motion.div
        initial="initial"
        whileInView="final"
        variants={variants.wrapper}
        className="flex flex-col items-start justify-start z-10 w-full -translate-y-14 max-w-xl mx-auto"
      >
        <motion.h1
          variants={variants.children}
          className="text-6xl md:text-7xl w-min font-black capitalize bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent selection:bg-transparent selection:text-secondary pb-2"
        >
          Good {greeting},
        </motion.h1>
        <motion.p
          variants={variants.children}
          className="text-sm font-semibold md:text-sm inline-flex gap-x-1"
        >
          <span className="opacity-50">I am</span>
          <strong className="font-semibold">{staticMetadata.name}</strong>
        </motion.p>
        <motion.small
          variants={variants.children}
          className="text-xs w-1/2 md:text-sm my-10 opacity-50"
        >
          {staticMetadata.miniBio}
        </motion.small>
        <motion.div variants={variants.children}>
          <PortfolioLink href="/" label="Contact Me" />
        </motion.div>
      </motion.div>

      <motion.div
        variants={variants.linear}
        className="absolute bottom-6 left-0 block z-10 w-full"
      >
        <motion.p
          variants={variants.linear}
          className="w-full flex items-center justify-center flex-col-reverse text-xs z-10"
        >
          <motion.small
            variants={variants.linear}
            className="uppercase tracking-tight font-semibold block"
          >
            scroll
          </motion.small>
          <motion.span
            variants={variants.linear}
            className=" block mb-1 bg-primary h-20 w-px animate-bounce delay-300"
          ></motion.span>
        </motion.p>
      </motion.div>
    </motion.header>
  );
};

export default PortfolioHeader;
