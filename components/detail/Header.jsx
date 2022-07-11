import Link from "next/link";
import { PUBLIC_URLS } from "../../utils";
import { Tag } from "../public/Tag";

export const DetailHeader = ({ title, desc, date, category, tags = [] }) => {
  const d = new Date(date);
  const dateStr = Intl.DateTimeFormat(undefined, {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate() + 1));

  return (
    <section className="grid grid-cols-4 lg:grid-cols-6 grid-flow-row px-8 max-w-4xl mx-auto md:mt-6">
      <p className="text-xs">
        <small className="font-bold uppercase opacity-50">{category}</small>
      </p>
      <h1 className="heading--primary leading-none capitalize col-span-full">
        {title}
      </h1>

      <span className="h-16 bg-primary w-0.5 m-1 col-start-1 col-end-4 md:h-20"></span>
      <section className="col-start-1 col-end-4 md:col-end-2 content--sub flex flex-col items-start">
        <small>
          <Link href={PUBLIC_URLS.portfolio.url}>
            <a className="font-bold before:transition-all text-current relative block before:w-full before:bg-gradient-to-r before:from-primary before:to-secondary before:bottom-0 before:h-0.5 overflow-hidden before:absolute before:-translate-x-full hover:before:translate-x-0 opacity-75 hover:opacity-100 transition-opacity">
              Sounak Mukherjee
            </a>
          </Link>
        </small>
        <small>{dateStr}</small>
      </section>

      <p className="content--secondary text-justify font-bold col-start-2 col-end-5 my-10 md:mt-0 md:row-start-4 lg:col-start-3 lg:col-end-6">
        {desc}
      </p>
      {tags.length > 0 && (
        <ul className="flex flex-wrap items-center justify-start mt-2 gap-4 w-full col-start-2 col-end-5 my-10 lg:col-start-3 lg:col-end-6">
          {tags?.map((t, i) => (
            <li key={i} className="w-max">
              <Tag tag={t} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};
