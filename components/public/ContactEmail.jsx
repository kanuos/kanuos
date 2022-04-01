import { PORTFOLIO_LINKS, SOCIAL } from "../../utils";
import { SectionHeader } from "../portfolio/SectionHeader";
import { BiEnvelope } from "react-icons/bi";
import { motion } from "framer-motion";

export const ContactEmail = ({ isDarkMode }) => {
  const wrapper = {
    show: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "linear",
        staggerChildren: 0.25,
      },
    },
    hide: {
      scale: 0,
      opacity: 0,
    },
  };

  const block = {
    show: {
      scaleY: 1,
      x: 0,
      transition: {
        type: "spring",
      },
    },
    hide: {
      scaleY: 0,
      x: -100,
    },
  };

  return (
    <motion.article
      whileInView="show"
      variants={wrapper}
      id={PORTFOLIO_LINKS["contact me"].url}
      className="w-full h-auto flex flex-col items-start mt-6"
    >
      <SectionHeader heading="Let's work together" fromLeft={true} />
      <motion.h4
        whileInView="show"
        variants={block}
        className="text-xs md:text-sm font-semibold text-primary mb-4"
      >
        Connect via Email
      </motion.h4>
      <motion.p
        whileInView="show"
        variants={block}
        className="text-xs mb-4 w-full max-w-xl font-semibold"
      >
        Please fill in your work email address for a duplex communication. Click
        the button below to open up your e-mailing tool.
      </motion.p>
      <motion.p className="text-xs mb-8 w-full max-w-xl font-semibold">
        Your email address and the contents of your email are confidential.
      </motion.p>
      <motion.a
        whileInView="show"
        variants={block}
        href={SOCIAL.mailto}
        target="_blank"
        rel="noopener noreferrer"
        className="my-2 capitalize text-xs rounded flex items-center justify-center relative overflow-hidden cursor-pointer select-none"
      >
        <div
          className={
            "py-2 px-4 z-10 peer flex items-center gap-1 transition-all hover:shadow-xl border-2 border-current font-semibold " +
            (!isDarkMode
              ? "text-dark hover:text-light hover:border-dark"
              : "text-light hover:text-dark hover:border-light")
          }
        >
          <BiEnvelope className="text-lg" />
          <span className="text-xs">send email</span>
        </div>
        <span
          className={
            "py-2 px-4 block transition-all hover:shadow-xl border-2 absolute top-0 left-0 h-full w-full translate-y-full peer-hover:translate-y-0 z-0 duration-300 " +
            (isDarkMode ? "bg-light" : "bg-dark")
          }
        ></span>
      </motion.a>
    </motion.article>
  );
};
