import { useState } from "react";
import Textarea from "react-textarea-autosize";
import Markdown from "react-markdown";

export const MarkdownInput = ({
  value = "",
  setValue,
  split = false,
  placeholder = "",
  name = "",
}) => {
  const [previewMode, setPreviewMode] = useState(false);

  return (
    <section
      className={`${
        split ? "" : "col-span-full"
      } w-full flex flex-col items-start gap-2`}
    >
      <label htmlFor={name} className="content--sub capitalize font-semibold">
        {name}
      </label>

      <article className="w-full relative">
        <button
          type="button"
          onClick={() => setPreviewMode((prev) => !prev)}
          className="absolute right-2 -top-6 text-xs text-right opacity-25 font-semibold hover:opacity-100 hover:text-primary transition-all"
        >
          <small>Toggle to {previewMode ? "Input" : "Preview"} Mode</small>
        </button>
        {previewMode ? (
          <div className="markdown-editor-wrapper w-full border-opacity-75 focus:border-opacity-100 p-3 border-2 rounded-md bg-transparent">
            <Markdown>{value}</Markdown>
          </div>
        ) : (
          <Textarea
            id={name}
            placeholder={placeholder}
            className={`w-full border-opacity-75 focus:border-opacity-100 p-3 border-2 rounded-md content--secondary bg-transparent scrollbar-none ${
              split ? "resize-none overflow-hidden" : "min-h-[5rem] resize-y "
            }`}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        )}
      </article>
    </section>
  );
};
