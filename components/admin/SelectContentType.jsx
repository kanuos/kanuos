import { useState } from "react";
import { CONTENT_TYPE } from "../../utils/admin";
import { CTA } from "../portfolio/CTA";

export const SelectContentType = ({
  getContentType,
  init = "",
  isDarkMode,
}) => {
  const [type, setType] = useState(init);
  return (
    <div className="h-full w-full flex items-start justify-center max-w-prose mx-auto">
      <section className="flex flex-col items-stretch w-full gap-y-2">
        <h1 className="heading--main capitalize mb-10">select content type</h1>
        <div className="flex flex-col items-start justify-around gap-4 my-10 w-full">
          {Object.entries(CONTENT_TYPE).map(([k, { name }]) => (
            <label
              key={k}
              className={`inline-flex flex-row-reverse items-center justify-end gap-x-1 opacity-75 hover:opacity-100 cursor-pointer transition-opacity peer-focus:opacity-100 ${
                isDarkMode ? "bg-secondary" : "bg-primary"
              } bg-opacity-10 p-4 w-full`}
            >
              <span className="text-sm capitalize font-semibold">{name}</span>
              <input
                checked={type === name}
                type="radio"
                onChange={() => setType(name)}
                name="type"
                value={name}
                className={`${
                  isDarkMode ? "accent-secondary" : "accent-primary"
                } cursor-pointer outline-none focus:outline-none peer`}
              />
            </label>
          ))}
        </div>
        {Boolean(type) && (
          <div className="w-max capitalize">
            <CTA
              isDarkMode={isDarkMode}
              btnMode={true}
              cb={() => getContentType(type)}
              label={`Proceed with "${type}" →`}
            />
          </div>
        )}
      </section>
    </div>
  );
};
