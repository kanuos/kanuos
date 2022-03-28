// built-in imports
import Link from "next/link";

// external imports
import { IoCalendarClearOutline, IoPricetagOutline } from "react-icons/io5";

/**
 * @param name string
 * @param tags array of tags => [{ label : text, link : ''}]
 * @param date date of item created
 * @param back string back to list url
 * @param descType string header type : blogs or projects or designs
 */

export const DescHeader = (props) => {
  const { name, tags, date, back = "/", descType, adminMode } = props;
  return (
    <header className="flex flex-col items-start justify-start gap-1.5 pt-16 pb-10 w-full">
      <section className="h-auto w-full max-w-4xl mx-auto">
        {!adminMode && (
          <Link href={back}>
            <a className="text-xs font-semibold opacity-50 focus:opacity-100 hover:opacity-100 capitalize">
              <small>&lt; back to {descType}</small>
            </a>
          </Link>
        )}

        <h1 className={"text-4xl md:text-5xl font-black my-6 "}>{name}</h1>

        <ul className="flex flex-col items-start text-xs gap-y-0.5">
          <li className="inline-flex items-center justify-start gap-x-2 text-xs">
            <IoCalendarClearOutline className="text-sm" />
            <small className="capitalize font-semibold">Published on</small>
          </li>
          <li className="text-sm">
            <small className="font-semibold capitalize text-primary">
              {new Date(date).toDateString()}
            </small>
          </li>
        </ul>

        <JoinLine />

        {tags && (
          <ul className="flex flex-col items-start gap-y-0.5">
            <li className="inline-flex items-center justify-start gap-x-2 text-xs">
              <IoPricetagOutline className="text-sm" />
              <small className="capitalize font-semibold">Tags</small>
            </li>
            <li className="text-xs sm:text-sm w-full">
              <ul className="flex flex-wrap gap-x-4 gap-y-1 w-full items-start justify-start">
                {tags.map((tag) => (
                  <li key={tag._id}>
                    <small className="font-semibold block capitalize text-primary">
                      {tag.tag}
                    </small>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        )}
      </section>
    </header>
  );
};

export const JoinLine = () => (
  <span className="h-8 my-1 block w-0.5 bg-primary ml-0.5"></span>
);
