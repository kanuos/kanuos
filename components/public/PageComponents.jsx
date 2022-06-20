// built in imports
import dynamic from "next/dynamic";

// external imports
import { motion } from "framer-motion";
import { AiOutlinePlus, AiOutlineMinus, AiOutlineBlock } from "react-icons/ai";

// internal imports
import { STEP_TYPE } from "../../utils";

// dynamic imports
const MarkdownStep = dynamic(() =>
  import("./PageStepComponent").then((m) => m.MarkdownStep)
);
const ImageStep = dynamic(() =>
  import("./PageStepComponent").then((m) => m.ImageStep)
);
const CodeStep = dynamic(() =>
  import("./PageStepComponent").then((m) => m.CodeStep)
);

export const PageComponents = ({
  segment,
  index,
  setActiveChapter,
  active,
}) => {
  const variants = {
    section: {
      show: {
        height: "auto",
        transition: {
          when: "beforeChildren",
          type: "spring",
        },
      },
      hide: {
        height: "min-content",
        transition: {
          type: "spring",
        },
      },
    },
    wrapper: {
      show: {
        opacity: 1,
        height: "auto",
        transition: {
          type: "spring",
          origin: "bottom",
          staggerChildren: 0.25,
          when: "beforeChildren",
        },
      },
      hide: {
        opacity: 0,
        height: 0,
        transition: {
          type: "spring",
        },
      },
    },
    body: {
      show: {
        opacity: 1,
        pointerEvents: "all",
        transition: {
          origin: "bottom",
          type: "spring",
          when: "beforeChildren",
        },
      },
      hide: {
        opacity: 0,
        pointerEvents: "none",
        transition: {
          type: "spring",
        },
      },
    },
  };

  const show = active[index];

  function toggleDisplay() {
    setActiveChapter(index);
  }

  return (
    <motion.section
      variants={variants.section}
      animate={show ? "show" : "hide"}
      className={`w-full block transition-all relative z-20 py-2.5 ${
        show ? "opacity-100" : "opacity-50 hover:opacity-100"
      }`}
    >
      <ul
        className={
          "text-xs flex flex-col w-full items-start gap-1 p-6 " +
          (show ? "border-b border-current mb-6" : "")
        }
      >
        <li className="flex w-full items-center justify-between gap-2">
          <p className="font-semibold text-xl">{index + 1}.</p>
          <span
            className={`font-semibold peer text-lg capitalize grow text-left`}
          >
            {segment.heading}
          </span>
          <button
            onClick={toggleDisplay}
            className={`text-xl ${
              show ? "hover:text-primary" : "hover:text-secondary"
            }`}
          >
            {!show ? <AiOutlinePlus /> : <AiOutlineMinus />}
          </button>
        </li>
      </ul>

      <motion.section
        className="px-6 md:px-10 overflow-hidden w-full "
        animate={show ? "show" : "hide"}
        exit="hide"
        variants={variants.wrapper}
      >
        <motion.article
          animate={show ? "show" : "hide"}
          variants={variants.body}
          exit="hide"
          className="w-full"
        >
          {segment.steps?.map(({ key, value }, i) => (
            <section key={i}>
              {key === STEP_TYPE.heading && (
                <h2 className="heading--secondary my-8 capitalize flex items-center">
                  <AiOutlineBlock className="text-primary" />
                  {value}
                </h2>
              )}
              {key === STEP_TYPE.markdown && (
                <div className="w-full text-justify">
                  <MarkdownStep text={value} />
                </div>
              )}
              {key === STEP_TYPE.markdown && (
                <div className="w-full text-justify">
                  <MarkdownStep text={value} />
                </div>
              )}
              {key === STEP_TYPE.code && (
                <div className="w-full text-justify">
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
    </motion.section>
  );
};
