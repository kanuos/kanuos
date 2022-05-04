import { useEffect, useState } from "react";
import { isValidURL, STEP_TYPE } from "../../utils";

import Markdown from "react-markdown";

import Image from "next/image";

import { highlightAll } from "prismjs";
import "prismjs/components/prism-markup-templating";
import "prismjs/components/prism-python";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-django";

export const Step = ({ step }) => {
  const { key, value } = step;
  switch (key.toLowerCase()) {
    case STEP_TYPE.code:
      return (
        <CodeStep
          code={value.code}
          file={value.file}
          language={value.language}
        />
      );

    case STEP_TYPE.markdown:
      return <MarkdownStep text={value} />;

    case STEP_TYPE.image:
      return <ImageStep url={value?.trim()} />;

    case STEP_TYPE.link:
      return <AnchorStep href={value?.href} label={value?.label} />;

    default:
      return <></>;
  }
};

export const MarkdownStep = ({ text }) => {
  return (
    <article className="markdown-editor">
      <Markdown>{text}</Markdown>
    </article>
  );
};

const CodeStep = ({ code, file, language }) => {
  useEffect(() => {
    highlightAll();
  }, []);
  return (
    <section className="flex flex-col items-stretch">
      {Boolean(file) && <p className="text-sm opacity-50 block">{file}</p>}
      <pre className="scrollbar-thin rounded-md">
        <code
          className={`language-${language} whitespace-pre-line overflow-x-auto block w-max pr-4 `}
        >
          {code.trim()}
        </code>
      </pre>
    </section>
  );
};

const ImageStep = ({ url }) => {
  const [valid, setValid] = useState(false);

  useEffect(() => {
    setValid(() => isValidURL(url));
  }, [url]);

  if (!valid) return <></>;

  return (
    <figure className="w-full h-full min-h-[75vh] relative block rounded-md overflow-hidden my-2">
      <Image
        loader={({ src, width }) => `${src}?w=${width}&q=100`}
        layout="fill"
        objectFit="cover"
        alt="Image thumbnail"
        src={url}
        className="w-full h-full block drop-shadow-2xl"
      />
    </figure>
  );
};
