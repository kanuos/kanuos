import { motion } from "framer-motion";
import { BsArrowDown } from "react-icons/bs";
import { staticMetadata } from "../../utils/portfolio_static";

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
        delayChildren: 0.25,
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
};

const PortfolioHeader = () => {
  return (
    <motion.header
      variants={variants.wrapper}
      whileInView="final"
      initial="initial"
      className="relative h-screen w-full px-10 flex flex-col items-center justify-center"
    >
      <motion.div
        initial="initial"
        whileInView="final"
        variants={variants.wrapper}
        className="flex flex-col items-start justify-start"
      >
        <motion.p
          variants={variants.children}
          className="text-xs font-semibold md:text-sm"
        >
          I am {staticMetadata.name}
        </motion.p>
        <motion.h1
          variants={variants.children}
          whileHover={{
            scale: [1, 1.05, 1],
            transition: { type: "spring", stiffness: 600 },
          }}
          className="text-8xl md:text-9xl font-black mt-1 mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent select-none"
        >
          Hello,
        </motion.h1>
        <motion.small
          variants={variants.children}
          className="font-semibold text-xs w-2/3 md:w-1/2 md:text-sm"
        >
          {staticMetadata.miniBio}
        </motion.small>
      </motion.div>

      <motion.p
        variants={variants.children}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 inline-flex items-center justify-center flex-col text-xs"
      >
        <motion.span
          variants={variants.children}
          className=" inline-block animate-bounce text-primary text-xl"
        >
          <BsArrowDown />
        </motion.span>
        <motion.small
          variants={variants.children}
          className="uppercase tracking-tight font-semibold inline-block"
        >
          scroll
        </motion.small>
      </motion.p>
    </motion.header>
  );
};

export default PortfolioHeader;
