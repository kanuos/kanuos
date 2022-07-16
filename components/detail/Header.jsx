import Image from "next/image";
import { titleCase } from "../../utils";

import { InfoGroup } from "../public/InfoGroup";
import { MarkdownStep } from "../public/PageStepComponent";

export const DetailHeader = ({
  caption,
  title,
  thumbnail = null,
  desc,
  items = [],
}) => {
  return (
    <>
      <header>
        <section className="p-8 max-w-4xl mx-auto grid grid-cols-10 h-auto">
          <p className="text-xs text-primary w-max">{caption}</p>
          <h1 className="font-title font-black text-4xl md:text-5xl uppercase col-span-full mt-1 mb-16">
            {title}
          </h1>

          <InfoGroup items={items} />
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
        <div className="px-10 py-16 max-w-4xl mx-auto">
          <section className="max-w-2xl mr-auto h-auto">
            <MarkdownStep text={titleCase(desc)} firstLetter={true} />
          </section>
        </div>
      </header>
      {/* thumbnail */}

      {/* {thumbnail && (
        <figure className="h-[50vh] md:h-[75vh] overflow-hidden w-full relative">
          <Image
            layout="fill"
            src={thumbnail}
            className="h-full w-full block object-cover"
            alt={`Design thumbnail of ${title}`}
            loader={({ src, width }) => `${src}?w=${width}&q=100`}
          />
        </figure>
      )}
      <section className="flex flex-col px-8 max-w-4xl mx-auto mt-8 relative">
        <p className="text-xs">
          <small className="font-bold uppercase">{category}</small>
        </p>
        <h1 className="heading--primary leading-relaxed capitalize col-span-full">
          {title}
        </h1>

        <ul className="flex flex-col md:flex-row items-start md:items-center justify-start gap-4 my-4 w-full py-4 text-xs">
          <li className="flex items-center justify-start gap-1 shrink-0">
            <AiOutlineUser className="text-base text-primary grow shrink-0 block" />
            <Link href={PUBLIC_URLS.portfolio.url}>
              <a className="font-medium">Sounak Mukherjee</a>
            </Link>
          </li>
          <li className="flex items-center justify-start gap-1 shrink-0">
            <AiOutlineCalendar className="text-base text-primary grow shrink-0 block" />
            <span className="font-medium">{dateStr}</span>
          </li>
          <li className="flex items-start md:items-center justify-start gap-1">
            <AiOutlineTags className="text-base text-primary grow shrink-0 block" />
            <span className="font-medium capitalize">
              {tags.map((el) => el.tag).join(", ")}
            </span>
          </li>
        </ul>

        <p className="content--main mt-10 text-justify mx-auto">
          <span className="font-bold text-sm">
            {desc} Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Reprehenderit illum nobis debitis iusto. Doloribus rerum, quisquam
            molestiae beatae tempora dolores? Exercitationem quibusdam natus
            maiores velit suscipit nobis. Minima, perferendis dolore?
          </span>
        </p>
      </section> */}
    </>
  );
};

/*
[
              {
                heading: "role",
                content: ["web design", "UI-UX development", "API development"],
              },
              {
                heading: "category",
                content: project.project.category,
              },
              {
                heading: "year",
                content: new Date(project.project.date).getUTCFullYear(),
              },
            ]
*/
