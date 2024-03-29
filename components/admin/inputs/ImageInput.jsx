import { useState, useEffect } from "react";
import Image from "next/image";

import Textarea from "react-textarea-autosize";
import { isValidURL } from "../../../utils";
import { CTA } from "../../portfolio/CTA";

export const ImageInput = ({
  value = "",
  setValue,
  placeholder = "",
  name = "",
  isDarkMode = false,
  specialField = false,
}) => {
  const [typedURL, setTypedURL] = useState(value);
  const [previewMode, setPreviewMode] = useState(false);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (!typedURL) return;
    setIsValid(() => isValidURL(typedURL));
  }, [typedURL]);

  return (
    <section className={`col-span-full w-full flex flex-col items-start gap-2`}>
      <label htmlFor={name} className="content--sub capitalize font-bold">
        {name} {specialField ? <span className="text-primary">*</span> : <></>}
      </label>

      <article className="w-full relative">
        {isValid && Boolean(typedURL.trim()) && (
          <button
            type="button"
            onClick={() => setPreviewMode((prev) => !prev)}
            className="absolute right-2 -top-6 text-xs text-right opacity-25 font-bold hover:opacity-100 hover:text-primary transition-all"
          >
            <small>Toggle to {previewMode ? "URL" : "Preview"} Mode</small>
          </button>
        )}
        {previewMode && isValid ? (
          <section className="flex flex-col items-stretch justify-between gap-y-6">
            <div className="relative min-h-[50vh] w-full">
              <Image
                alt=""
                src={typedURL}
                loader={({ src, width }) => `${src}?w=${width}&q=100`}
                layout="fill"
                className="object-cover h-full w-full"
                onError={() => {
                  setIsValid(false);
                }}
              />
            </div>
            {!isValid && (
              <p className="content--sub font-bold text-primary text-center">
                Invalid image URL
              </p>
            )}
            {isValid && value !== typedURL && (
              <div className="w-max">
                <CTA
                  btnMode={true}
                  cb={() => {
                    setValue(typedURL);
                    setPreviewMode(true);
                  }}
                  isDarkMode={isDarkMode}
                  label="Add Image"
                />
              </div>
            )}
          </section>
        ) : (
          <Textarea
            id={name}
            placeholder={placeholder}
            className={`w-full border-opacity-75 focus:border-opacity-100 p-3 border-2 rounded-md content--secondary bg-transparent scrollbar-none min-h-[5rem] resize-y`}
            value={typedURL}
            onChange={(e) => setTypedURL(e.target.value)}
          />
        )}
      </article>
    </section>
  );
};
