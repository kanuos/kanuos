import { MdCheckBoxOutlineBlank, MdOutlineCheckBox } from "react-icons/md";

export const DifficultyStatus = ({
  checked = false,
  heading,
  text,
  radioMode = false,
  cb = null,
}) => {
  return (
    <div
      onClick={cb}
      className={`flex items-start justify-start gap-x-2 ${
        checked ? "opacity-100" : "opacity-50"
      } ${
        radioMode
          ? "cursor-pointer group"
          : "cusror-default select-none pointer-events-none"
      }`}
    >
      {checked ? (
        <MdOutlineCheckBox
          className={`text-xl shrink-0 group-hover:text-primary`}
        />
      ) : (
        <MdCheckBoxOutlineBlank
          className={`text-xl shrink-0 group-hover:text-secondary`}
        />
      )}
      <div className="flex flex-col gap-y-2">
        <strong className={`heading--sub capitalize`}>{heading}</strong>
        <p className="content--sub">{text}</p>
      </div>
    </div>
  );
};
