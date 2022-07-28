import Image from "next/image";

import { InfoGroup } from "../public/InfoGroup";

export const DetailHeader = ({
  caption,
  title,
  thumbnail = null,
  items = [],
  aboutMe = false,
  figcaption,
}) => {
  return (
    <>
      <header>
        <section className="p-8 max-w-4xl mx-auto grid grid-cols-10 h-auto">
          <div className={(aboutMe ? "" : "mb-20") + " col-span-full"}>
            <p className="text-xs text-primary w-max">{caption}</p>
            <h1 className={`heading--primary w-full uppercase mt-1`}>
              {title}
            </h1>
          </div>

          {items.length > 0 && <InfoGroup items={items} />}
        </section>
        {thumbnail && (
          <>
            <figure className="relative h-[75vh] lg:h-[80vh] w-full max-w-6xl mx-auto lg:rounded-md overflow-hidden md:my-6">
              <Image
                layout="fill"
                className="object-cover"
                loader={({ src, width }) => `${src}?w=${width}&q=100`}
                src={thumbnail}
                alt={`${title} poster`}
              />
            </figure>
            {figcaption && (
              <figcaption className="text-xs opacity-75 capitalize text-center mt-2">
                <small>{figcaption}</small>
              </figcaption>
            )}
          </>
        )}
      </header>
    </>
  );
};
