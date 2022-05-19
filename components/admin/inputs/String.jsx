import Textarea from "react-textarea-autosize";

export const StringInput = ({
  value = "",
  setValue,
  split = false,
  placeholder = "",
}) => {
  return (
    <Textarea
      placeholder={placeholder}
      className={`w-full border-opacity-75 focus:border-opacity-100 p-3 border-2 rounded-md content--secondary bg-transparent scrollbar-thin ${
        split ? "resize-none overflow-hidden" : "min-h-[5rem] resize-y "
      }`}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};
