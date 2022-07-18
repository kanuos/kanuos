import Image from "next/image";

import { InfoGroup } from "../public/InfoGroup";
import { MarkdownStep } from "../public/PageStepComponent";

export const DetailHeader = ({
  caption,
  title,
  thumbnail = null,
  desc,
  items = [],
  aboutMe = false,
}) => {
  return (
    <>
      <header>
        <section className="p-8 max-w-4xl mx-auto grid grid-cols-10 h-auto">
          <p className="text-xs text-primary w-max">{caption}</p>
          <h1
            className={`font-title font-black text-4xl md:text-5xl uppercase col-span-full mt-1 ${
              aboutMe ? "" : "mb-28"
            }`}
          >
            {title}
          </h1>

          {items.length > 0 && <InfoGroup items={items} />}
        </section>
        {thumbnail && (
          <figure className="relative h-[75vh] lg:h-[80vh] w-full max-w-6xl mx-auto lg:rounded-md overflow-hidden md:my-6">
            <Image
              layout="fill"
              className="object-cover"
              loader={({ src, width }) => `${src}?w=${width}&q=100`}
              src={thumbnail}
              alt={`${title} poster`}
            />
          </figure>
        )}
        <div
          className={`px-10 pb-16 ${
            aboutMe ? "pt-0" : "pt-16"
          } max-w-4xl mx-auto`}
        >
          <section className="max-w-2xl mx-auto h-auto">
            <MarkdownStep text={desc} firstLetter={true} />
          </section>
        </div>
      </header>
    </>
  );
};
