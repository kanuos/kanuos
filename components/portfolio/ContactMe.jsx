import { motion } from "framer-motion";
import ContactModal from "../public/ContactModal";
import { SectionHeader } from "./SectionHeader";
import {
  IoMailOutline,
  IoNavigateCircleOutline,
  IoArrowForward,
} from "react-icons/io5";
import { PORTFOLIO_LINKS } from "../../utils";

const variants = {
  wrapper: {
    show: {
      opacity: 1,
      transition: {
        type: "linear",
        when: "beforeChildren",
        staggerChildren: 0.5,
        delayChildren: 0.5,
      },
    },
    hide: {
      opacity: 0,
      transition: {
        type: "linear",
        when: "afterChildren",
      },
    },
  },
  children: {
    show: {
      scaleY: 1,
      transition: {
        type: "linear",
        when: "beforeChildren",
        staggerChildren: 0.5,
        delayChildren: 0.5,
      },
    },
    hide: {
      scaleY: 0,
      transition: {
        type: "linear",
        when: "afterChildren",
      },
    },
  },
};

const ContactMe = ({ email, social, isDarkMode }) => {
  return (
    <motion.section
      id={PORTFOLIO_LINKS["contact me"].name}
      whileInView="show"
      initial="hide"
      viewport={{ once: true }}
      transition={{ delay: 0.25, delayChildren: 0.25, staggerChildren: 0.25 }}
      variants={variants.wrapper}
      className="h-auto min-h-screen w-full max-w-3xl mx-auto flex flex-col items-start relative md:px-10"
    >
      <SectionHeader
        shadow="say hello"
        heading="let's work together"
        paddingBottom={false}
        content="Currently I am looking for a position as a full-stack developer, front-end developer, API developer"
      />
      <motion.div
        variants={variants.wrapper}
        className="w-full md:max-w-lg ml-auto relative my-16"
      >
        <motion.ul
          whileInView="show"
          initial="hide"
          variants={variants.wrapper}
          transition={{
            delay: 0.25,
            delayChildren: 0.25,
            staggerChildren: 0.25,
          }}
          className={
            "flex flex-col items-start justify-start border-t border-opacity-50 mt-1 w-full " +
            (isDarkMode ? "border-light" : "border-dark")
          }
        >
          <motion.li
            variants={variants.wrapper}
            className={
              "text-sm hover:opacity-100 hover:text-primary transition-all cursor-pointer border-b w-full px-10 md:px-0 py-6 flex items-center justify-between border-collapse border-opacity-50 " +
              (isDarkMode ? "border-light" : "border-dark")
            }
          >
            <a href={email} className="flex items-center justify-start gap-x-2">
              <IoMailOutline className="text-lg" />
              <small className="font-black uppercase">
                send an email {email}
              </small>
            </a>
            <IoArrowForward className="text-lg" />
          </motion.li>
          <motion.li
            variants={variants.wrapper}
            className={
              "text-sm hover:opacity-100 hover:text-primary transition-all cursor-pointer border-b w-full px-10 md:px-0 py-6 border-collapse border-opacity-50 " +
              (isDarkMode ? "border-light" : "border-dark")
            }
          >
            <ContactModal isDarkMode={isDarkMode}>
              <div className="flex justify-between w-full items-center">
                <div className="flex items-center justify-start gap-x-2">
                  <IoNavigateCircleOutline className="text-lg" />
                  <small className="font-black uppercase">send a message</small>
                </div>
                <IoArrowForward className="text-lg" />
              </div>
            </ContactModal>
          </motion.li>
        </motion.ul>
      </motion.div>

      <motion.ul
        whileInView="show"
        initial="hide"
        transition={{ delay: 0.25, delayChildren: 0.25, staggerChildren: 0.25 }}
        variants={variants.children}
        className="mt-auto pb-10 flex flex-col items-start gap-y-1 px-10"
      >
        <motion.li
          variants={variants.children}
          className="text-xs uppercase font-black opacity-50"
        >
          <small>Follow me</small>
        </motion.li>
        <motion.ul
          whileInView="show"
          initial="hide"
          transition={{
            delay: 0.25,
            delayChildren: 0.25,
            staggerChildren: 0.25,
          }}
          variants={variants.children}
          className="flex flex-wrap items-center justify-start gap-2 mt-1 w-full"
        >
          {Object.entries(social).map(([key, value]) => (
            <motion.li
              variants={variants.children}
              key={key}
              className="text-sm font-semibold hover:opacity-100 hover:text-primary opacity-75 transition-all cursor-pointer capitalize"
            >
              <a href={value} target="_blank" rel="noopener noreferrer">
                <small>{key}</small>
              </a>
            </motion.li>
          ))}
        </motion.ul>
      </motion.ul>
    </motion.section>
  );
};

export default ContactMe;
