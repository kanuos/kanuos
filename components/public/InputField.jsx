// import : built-in
import { useEffect, useState } from "react";

// import : external
import Textarea from "react-textarea-autosize";
import {
  MdOutlineErrorOutline,
  MdCheckCircle,
  MdSend,
  MdOutlineMailOutline,
  MdOutlineFace,
  MdOutlineMessage,
  MdOutlinePassword,
  MdOutlineQuestionAnswer,
  MdOutlineLock,
  MdOutlineCheckCircleOutline,
  MdOutlineEdit,
} from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";

export const InputField = ({
  name,
  value = "",
  inputMode = true,
  getData,
  constraints,
  setEditMode,
  index,
  total,
}) => {
  const [field, setField] = useState(value);
  const [isInputMode, setIsInputMode] = useState(inputMode);
  const [canSubmit, setCanSubmit] = useState(false);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    const temp = Object.values(constraints)
      .map(({ check }) => check(field))
      .every(Boolean);
    setCanSubmit((_) => temp);
  }, [field, constraints]);

  useEffect(() => {
    if (isInputMode) {
      setEditMode(true);
      return;
    }
    setEditMode(false);
  }, [isInputMode, setEditMode]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!canSubmit) return;
    setField((prev) => prev.trim().toLowerCase());
    setIsInputMode(false);
    getData({ [name]: field });
  }

  const variants = {
    btn: {
      show: { scale: 1 },
      hide: { scale: 0 },
    },
    tasks: {
      show: { scale: 1 },
      hide: { scale: 0 },
    },
    taskItem: {
      show: { x: 0, opacity: 1, transition: { type: "spring" } },
      hide: { x: "-100%", opacity: 0, transition: { type: "spring" } },
    },
  };

  function iconText(type) {
    switch (type) {
      case "name":
        return <MdOutlineFace />;
      case "email":
        return <MdOutlineMailOutline />;
      case "password":
        return <MdOutlinePassword />;
      case "question":
        return <MdOutlineLock />;
      case "answer":
        return <MdOutlineQuestionAnswer />;
      case "message":
        return <MdOutlineMessage />;
      default:
        return <MdOutlineCheckCircleOutline />;
    }
  }

  if (!isInputMode) {
    return (
      <article
        className="w-fit p-4 shadow-2xl rounded-md relative 
            max-w-lg md:min-w-[20rem] group flex items-start"
      >
        <div className="flex flex-col items-start w-full gap-y-1">
          <p className="text-xs opacity-75">
            <small>
              Step {index} of {total}
            </small>
          </p>
          <div className="flex items-center justify-start gap-x-1 text-xs">
            <span className="inline-block">{iconText(name)}</span>
            <small className="font-semibold tracking-wider capitalize">
              your {name}
            </small>
          </div>
          <p
            className={
              "mt-1 px-4 tracking-wider flex items-start " +
              (name === "message" && " whitespace-pre-line ") +
              (name === "name" && " capitalize ") +
              (name === "email" && " lowercase ")
            }
          >
            <small>{field}</small>
          </p>
        </div>
        <button
          className="inline-block px-0.5 invisible group-hover:visible hover:text-primary transition-all"
          onClick={() => setIsInputMode(true)}
        >
          <MdOutlineEdit />
        </button>
      </article>
    );
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="relative h-auto w-full">
        {name === "message" && (
          <p className="text-xs text-right absolute right-2 -top-6">
            <small className="opacity-75 inline-flex items-center">
              <span className="pr-2">Currently typed :</span>
              <strong className="font-semibold">{field.length} chars</strong>
            </small>
          </p>
        )}
        <div className="flex w-full items-stretch justify-start border-2 border-current rounded-md p-1">
          <Textarea
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            value={field}
            spellCheck={false}
            placeholder={`Please type in ${name}`}
            className="p-1.5 resize-none w-full h-full outline-none border-none relative z-10 text-sm focus:placeholder:invisible select-text bg-transparent scrollbar-none"
            onChange={(e) => setField((_) => e.target.value)}
          />

          <motion.button
            variants={variants.btn}
            initial="hide"
            animate={canSubmit ? "show" : "hide"}
            whileHover={{ scale: 1.25 }}
            type="submit"
            className="text-xl transition-all"
          >
            <MdSend />
          </motion.button>
        </div>
      </form>
      <AnimatePresence>
        <motion.ul
          variants={variants.tasks}
          initial="hide"
          animate={
            focused || canSubmit || field.trim().length > 0 ? "show" : "hide"
          }
          className="flex flex-col items-start gap-y-2 mt-4"
        >
          {Object.values(constraints).map(({ message, check }) => {
            const isValid = check(field);
            return (
              <motion.li
                variants={variants.taskItem}
                animate="show"
                key={message}
                className={
                  "text-xs flex items-center justify-start gap-x-1 " +
                  (isValid ? "text-secondary line-through" : "text-primary")
                }
              >
                {isValid ? <MdCheckCircle /> : <MdOutlineErrorOutline />}
                <small className="font-semibold tracking-wide">{message}</small>
              </motion.li>
            );
          })}
        </motion.ul>
      </AnimatePresence>
    </>
  );
};
