import { motion } from "framer-motion";

export const LoadSpinner = ({ text = "Loading" }) => {
  return (
    <div className="my-10 grid place-items-center w-max p-4 select-none">
      <p className="flex flex-col w-max overflow-hidden items-stretch justify-center gap-1">
        <motion.span
          animate={{
            backgroundColor: ["#FF0066", "#00BFB3"],
            x: ["-50%", "100%"],
            width: ["0%", "100%"],
            transition: {
              type: "tween",
              repeat: Infinity,
              duration: 2,
            },
          }}
          className="h-0.5"
        ></motion.span>
        <span className="heading--secondary uppercase tracking-widest">
          {text}
        </span>
      </p>
      <p className="content--sub font-bold animate-pulse">
        <small>Please wait</small>
      </p>
    </div>
  );
};
