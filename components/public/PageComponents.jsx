// built in imports
import { useState, useEffect } from "react";

// external imports
import { motion } from "framer-motion";
import {
  AiFillDownCircle,
  AiFillCheckCircle,
  AiOutlineLoading3Quarters,
} from "react-icons/ai";

// internal imports
import { MarkdownStep, ImageStep, CodeStep } from "./PageStepComponent";
import { CTA } from "../portfolio/CTA";
import { STEP_TYPE } from "../../utils";

export const PageComponents = ({
  segment,
  index,
  setActiveChapter,
  active,
  completed,
  toggleCompletionStatus,
}) => {
  const variants = {
    section: {
      show: {
        height: "auto",
        transition: {
          when: "beforeChildren",
          delayChildren: 0.5,
        },
      },
      hide: {
        height: "min-content",
        transition: {
          when: "afterChildren",
          type: "tween",
          staggerChildren: 0.5,
          staggerDirection: -1,
        },
      },
    },
    wrapper: {
      show: {
        opacity: 1,
        scale: 1,
        height: "auto",
        transition: {
          type: "tween",
          origin: "bottom",
          delay: 0.25,
          staggerChildren: 0.5,
          when: "beforeChildren",
        },
      },
      hide: {
        opacity: 0,
        scale: 0,
        height: 0,
        transition: {
          type: "tween",
          when: "afterChildren",
          delay: 0.25,
          staggerChildren: 0.5,
        },
      },
    },
    body: {
      show: {
        y: 0,
        opacity: 1,
        pointerEvents: "all",
        transition: {
          origin: "bottom",
          delay: 0.5,
        },
      },
      hide: {
        y: "100%",
        opacity: 0,
        pointerEvents: "none",
        transition: {
          type: "tween",
          duration: 0.25,
          delay: 0.25,
          staggerChildren: 0.5,
          when: "afterChildren",
        },
      },
    },
  };

  const [show, setShow] = useState(active === index - 1);
  const [isComplete, setIsComplete] = useState(completed);

  function toggleReadStatus() {
    setIsComplete((prev) => !prev);
    setShow((prev) => !prev);
  }

  useEffect(() => {
    if (!show) return;
    setActiveChapter(index - 1);
  }, [show]);

  useEffect(() => {
    if (isComplete === completed) return;
    toggleCompletionStatus({ i: index - 1, stat: isComplete });
  }, [isComplete]);

  return (
    <motion.section
      variants={variants.section}
      animate={show ? "show" : "hide"}
      className={"w-full block transition-all relative z-20 "}
    >
      <ul
        className={
          "text-xs flex flex-col w-full items-start gap-1 p-6 md:px-10 " +
          (show ? "border-b border-current mb-6" : "")
        }
      >
        <li>
          <small className="font-semibold opacity-60">Chapter {index}</small>
        </li>
        <li className="flex w-full items-center justify-between mb-2">
          <span className={`font-semibold peer text-lg md:text-xl`}>
            {segment.heading}
          </span>
          <motion.button
            whileHover={{
              scale: 1.1,
              rotate: show && !isComplete ? 180 : 0,
            }}
            animate={show && !isComplete ? { rotate: 180 } : { rotate: 0 }}
            onClick={() => setShow((prev) => !prev)}
            className="aspect-square text-xl"
          >
            {isComplete ? (
              <AiFillCheckCircle className="text-secondary" />
            ) : (
              <AiFillDownCircle className="hover:text-primary" />
            )}
          </motion.button>
        </li>
      </ul>

      <motion.section
        className={
          "px-6 md:px-10 overflow-hidden w-full " +
          (show ? "pt-4 pb-16" : "pb-4")
        }
        animate={show ? "show" : "hide"}
        exit="hide"
        variants={variants.wrapper}
      >
        <motion.article
          animate={show ? "show" : "hide"}
          variants={variants.body}
          exit="hide"
        >
          {segment.steps?.map(({ key, value }, i) => (
            <section key={i}>
              {key === STEP_TYPE.markdown && (
                <div className="md:w-5/6">
                  <MarkdownStep text={value} />
                </div>
              )}
              {key === STEP_TYPE.code && (
                <div className="md:w-5/6">
                  <CodeStep
                    code={value.code}
                    file={value.file}
                    language={value.language}
                  />
                </div>
              )}
              {key === STEP_TYPE.image && (
                <ImageStep url={value} projectMode={true} />
              )}
            </section>
          ))}
        </motion.article>
      </motion.section>
      <div
        className={`grid place-content-center ${
          isComplete ? "bg-secondary py-8" : show ? "bg-primary py-8" : "hidden"
        }`}
      >
        <CTA
          label={
            isComplete ? (
              <div className="flex items-center justify-center gap-x-1 group">
                <AiFillCheckCircle className="block group-hover:hidden" />
                <span className="block group-hover:hidden">
                  Chapter complete!
                </span>
                <span className="hidden group-hover:block">Mark as unread</span>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-x-1">
                <AiOutlineLoading3Quarters className="animate-spin" />
                <span>Mark chapter as complete</span>
              </div>
            )
          }
          isActive={isComplete}
          btnMode={true}
          cb={toggleReadStatus}
        />
      </div>
    </motion.section>
  );
};
