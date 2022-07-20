// built in imports
import dynamic from "next/dynamic";

// external imports
import { motion } from "framer-motion";
import { IoChevronDownSharp } from "react-icons/io5";

// internal imports
import { STEP_TYPE, titleCase } from "../../utils";

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
const DifficultyStatus = dynamic(() =>
  import("../detail/DifficultyStatus").then((m) => m.DifficultyStatus)
);

export const PageComponents = ({
  segment,
  index,
  setActiveChapter,
  activeIndex,
  toggleReadStatus,
  readReceipts,
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

  const show = activeIndex == index;
  const isRead = readReceipts[index];

  function toggleChapterExpansion() {
    // if active chapter is current chapter -> set active chapter index to NaN
    if (show) {
      setActiveChapter(NaN);
    } else {
      setActiveChapter(index);
    }
  }

  return (
    <motion.section
      variants={variants.section}
      animate={show ? "show" : "hide"}
      className={`w-full block transition-all relative z-20 pb-8 last-of-type:pb-2 border-b-[1px] last-of-type:border-b-0`}
    >
      <ul className="text-xs flex w-full items-center gap-1">
        <li className="flex w-full items-start justify-between gap-2">
          <div className="flex flex-col grow">
            <p className="flex gap-x-2 items-center">
              <strong className="heading--sub">
                {index + 1}
                &nbsp;&mdash;&nbsp;
              </strong>
              <span className={`text-left heading--main`}>
                {titleCase(segment.heading)}
              </span>
            </p>
            <p className="text-xs flex gap-x-2 items-center">
              <span className="text-transparent heading--sub">
                {index + 1}
                &nbsp;&mdash;&nbsp;
              </span>
              <small
                className={`font-bold ${
                  isRead ? "text-secondary" : "text-current opacity-50"
                }`}
              >
                {isRead ? "Completed" : "Not completed"}
              </small>
            </p>
          </div>
        </li>
        <li>
          <button
            onClick={toggleChapterExpansion}
            className={`text-xl  hover:scale-105 transition-all`}
          >
            <IoChevronDownSharp
              className={
                (show
                  ? "rotate-180 text-primary"
                  : "rotate-0 hover:text-primary") +
                " transition-all origin-center"
              }
            />
          </button>
        </li>
      </ul>

      {show && (
        <motion.section
          className="overflow-hidden w-full mt-6 py-4"
          variants={variants.wrapper}
        >
          <motion.article variants={variants.body} className="w-full">
            {segment.steps?.map(({ key, value }, i) => (
              <section key={i}>
                {key === STEP_TYPE.heading && (
                  <h3 className="heading--secondary my-8 capitalize">
                    {value}
                  </h3>
                )}
                {key === STEP_TYPE.markdown && (
                  <div className="w-full text-justify markdown-editor-wrapper">
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

          <h3 className="heading--sub mt-10">Read status</h3>
          <ul className="flex flex-col items-start justify-start gap-4 mt-6">
            <li>
              <DifficultyStatus
                radioMode={true}
                cb={() => toggleReadStatus(index)}
                heading="complete"
                checked={isRead}
                text="Click to mark chapter's read status as unread"
              />
            </li>
            <li>
              <DifficultyStatus
                radioMode={true}
                cb={() => toggleReadStatus(index)}
                heading="incomplete"
                checked={!isRead}
                text="Click to mark chapter's read status as read"
              />
            </li>
          </ul>
        </motion.section>
      )}
    </motion.section>
  );
};
