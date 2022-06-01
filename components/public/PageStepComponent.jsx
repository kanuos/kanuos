import { useEffect, useState } from "react";
import { isValidURL } from "../../utils";

import Markdown from "react-markdown";
import Image from "next/image";

import { highlightAll } from "prismjs";
import "prismjs/components/prism-markup-templating";
import "prismjs/components/prism-python";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-django";

export const MarkdownStep = ({ text }) => {
  return (
    <article className="markdown-editor-wrapper">
      <Markdown>{text}</Markdown>
    </article>
  );
};

export const CodeStep = ({ code, file, language }) => {
  useEffect(() => {
    highlightAll();
  }, []);
  return (
    <section className="flex flex-col items-stretch w-full my-6 md:my-10">
      {Boolean(file) && <p className="content--sub">{file}</p>}
      <pre className="block overflow-x-scroll rounded-md scrollbar-thumb-light scrollbar-track-dark scrollbar-thin border-4 border-double border-dark cursor-move">
        <code
          className={`language-${language} whitespace-pre-line overflow-x-auto block w-max pr-4 `}
        >
          {code.trim()}
        </code>
      </pre>
      <p className="content--sub text-center">
        <small>Scroll left-right</small>
      </p>
    </section>
  );
};

export const ImageStep = ({ url, projectMode = false }) => {
  const [valid, setValid] = useState(false);

  useEffect(() => {
    setValid(() => isValidURL(url));
  }, [url]);

  if (!valid) return <></>;

  return (
    <figure
      className={`h-auto min-h-[60vh] w-full my-6 block relative overflow-hidden`}
    >
      <Image
        loader={({ src, width }) => `${src}?w=${width}&q=100`}
        layout="fill"
        alt="Image thumbnail"
        src={url}
        className="w-full h-full block object-cover"
      />
    </figure>
  );
};
