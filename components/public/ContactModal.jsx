import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { ContactInstantMessage } from "./ContactInstantMessage";

const ContactModal = ({ isDarkMode, children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex flex-col items-start gap-y-2 justify-around w-full max-w-3xl">
      <div className="w-full">
        {children ? (
          <button className="w-full block" onClick={() => setIsModalOpen(true)}>
            {children}
          </button>
        ) : (
          <button
            onClick={() => setIsModalOpen(true)}
            className="my-6 capitalize text-xs rounded flex items-center justify-center relative overflow-hidden cursor-pointer select-none opacity-75 hover:opacity-100 transition-all"
          >
            <div
              className={
                "py-2 px-4 flex items-center gap-1 z-10 peer transition-all hover:shadow-xl border-2 border-current font-semibold "
              }
            >
              <span className="text-xs">send an instant message</span>
            </div>
            <span
              className={
                "py-2 px-4 block transition-all hover:shadow-xl border-2 absolute top-0 left-0 h-full w-full -translate-y-full peer-hover:translate-y-0 z-0 duration-300 "
              }
            ></span>
          </button>
        )}

        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
                transition: {
                  type: "linear",
                  staggerChildren: 0.25,
                  when: "beforeChildren",
                },
              }}
              exit={{
                opacity: 0,
                scale: 0,
                y: "100vh",
                transition: { type: "linear", when: "afterChildren" },
              }}
              initial={{
                opacity: 0,
                scale: 0,
                y: "100vh",
                transition: { type: "spring" },
              }}
              className={
                "fixed top-0 left-0 h-screen w-screen overflow-y-auto scrollbar-thin z-50 p-16 " +
                (isDarkMode ? "bg-dark text-light" : "bg-light text-dark")
              }
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="fixed top-4 right-6 text-5xl hover:rotate-180 hover:text-primary transition-all origin-center"
              >
                &times;
              </button>
              <ContactInstantMessage
                key={isModalOpen}
                close={() => setIsModalOpen(false)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ContactModal;
