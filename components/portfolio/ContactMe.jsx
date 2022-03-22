import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { IoChatboxOutline  } from 'react-icons/io5'

import { ContactEmail } from "../public/ContactEmail";
import { ContactInstantMessage } from "../public/ContactInstantMessage";

export const ContactMe = ({ isDarkMode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section
      id="contact"
      className="h-screen p-10 grid place-items-center relative"
    >
      <div className="flex flex-col items-start gap-y-2 justify-around w-11/12 max-w-3xl">
        <div className="w-full max-w-lg">
          <ContactEmail isDarkMode={isDarkMode}/>
          <button
            onClick={() => setIsModalOpen(true)}
            className="my-6 capitalize text-xs rounded flex items-center justify-center relative overflow-hidden cursor-pointer select-none"
          >
            <div className={"py-1.5 px-6 flex items-center gap-1 z-10 peer transition-all hover:shadow-xl border-2 border-current font-semibold " + (!isDarkMode ? 'text-dark hover:text-light hover:border-dark' : 'text-light hover:text-dark hover:border-light')}>
              <IoChatboxOutline />
              send an instant message
            </div>
            <span className={"py-1.5 px-6 block transition-all hover:shadow-xl border-2 absolute top-0 left-0 h-full w-full -translate-y-full peer-hover:translate-y-0 z-0 duration-300 " + (isDarkMode ? 'bg-light' : 'bg-dark')}></span>
          </button>
          <AnimatePresence>
            <motion.div
              animate={
                isModalOpen
                  ? {
                      opacity: 1,
                      scale: 1,
                      rotate: 0,
                      transition: { type: "spring", staggerChildren: 0.25 },
                    }
                  : {
                      opacity: 0,
                      scale: 0,
                      rotate: 6,
                      transition: { type: "spring" },
                    }
              }
              exit={{
                opacity: 0,
                scale: 0,
                rotate: -6,
                transition: { type: "spring" },
              }}
              className={
                "fixed top-0 left-0 w-full h-screen overflow-y-auto scrollbar-thin z-40 p-16 " +
                (isDarkMode ? "nav-dark" : "nav-light")
              }
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="fixed top-4 z-50 right-4 text-5xl hover:rotate-180 hover:text-primary font-thin transition-all origin-center"
              >
                &times;
              </button>
              <div className="h-full block w-full">
                <ContactInstantMessage key={isModalOpen} />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};