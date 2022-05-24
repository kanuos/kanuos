import { useState } from "react";
import { CONTENT_TYPE } from "../../utils/admin";

export const SelectContentType = ({
  getContentType,
  type = "",
  isDarkMode,
}) => {
  return (
    <div className="h-full w-full flex items-start justify-center">
      <div className="flex flex-col items-start justify-around gap-4 w-full my-6">
        {Object.entries(CONTENT_TYPE).map(([k, { name }]) => (
          <label
            key={k}
            className={`inline-flex flex-row-reverse items-center justify-end gap-x-1 opacity-75 hover:opacity-100 cursor-pointer transition-opacity peer-focus:opacity-100 border-2 rounded-md ${
              name === type
                ? isDarkMode
                  ? "bg-secondary border-secondary"
                  : "bg-primary border-primary"
                : ""
            } bg-opacity-10 p-4 w-full`}
          >
            <span className="text-sm capitalize font-semibold">{name}</span>
            <input
              checked={type === name}
              type="radio"
              onChange={() => getContentType(name)}
              name="type"
              value={name}
              className={`${
                isDarkMode ? "accent-secondary" : "accent-primary"
              } cursor-pointer outline-none focus:outline-none peer`}
            />
          </label>
        ))}
      </div>
    </div>
  );
};
