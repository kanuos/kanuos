import Link from "next/link";
import { useRouter } from "next/router";

export const Pagination = ({ count, baseURL }) => {
  const router = useRouter();

  return (
    <section className="mx-auto mt-40 grid place-items-center">
      <ul className="flex items-center justify-center flex-wrap gap-2">
        {new Array(count).fill("1").map((_, i) => {
          const isActive = parseInt(router.query.number) === i + 1;
          return (
            <li key={i}>
              <Link href={`${baseURL}/${i + 1}`}>
                <a
                  title={
                    isActive
                      ? "Currently on this page"
                      : "Go to Page " + (i + 1).toString()
                  }
                  className={`py-2.5 px-4 inline-block rounded-md font-semibold text-xs filter drop-shadow-lg ${
                    isActive
                      ? "bg-dark text-light"
                      : "bg-light text-dark hover:text-primary hover:-translate-y-1 transition-all"
                  }`}
                >
                  {i + 1}
                </a>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
