import Textarea from "react-textarea-autosize";

export const StringInput = ({
  value = "",
  setValue,
  split = false,
  placeholder = "",
  name = "",
}) => {
  return (
    <section
      className={`${
        split ? "" : "col-span-full"
      } w-full flex flex-col items-start gap-2`}
    >
      <label htmlFor={name} className="content--sub capitalize font-semibold">
        {name}
      </label>

      <Textarea
        id={name}
        placeholder={placeholder}
        className={`w-full focus:shadow-xl focus:scale-x-105 will-change-transform transition-all p-3 border-2 rounded-md content--secondary bg-transparent scrollbar-none outline-none focus:outline-none ${
          Boolean(value.trim())
            ? "focus:border-secondary border-current"
            : "focus:border-primary"
        } ${split ? "resize-none overflow-hidden" : "min-h-[5rem] resize-y "}`}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </section>
  );
};
