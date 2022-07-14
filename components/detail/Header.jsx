import Image from "next/image";
import Link from "next/link";
import { PUBLIC_URLS } from "../../utils";

import {
  AiOutlineUser,
  AiOutlineCalendar,
  AiOutlineTags,
} from "react-icons/ai";

export const DetailHeader = ({
  title,
  desc,
  date,
  category,
  tags = [],
  thumbnail = null,
}) => {
  const d = new Date(date);
  const dateStr = Intl.DateTimeFormat(undefined, {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate() + 1));

  return (
    <>
      {/* thumbnail */}

      {thumbnail && (
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
      </section>
    </>
  );
};
