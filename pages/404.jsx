// Default error page
import { useContext } from "react";
import { useRouter } from "next/router";
// import : internal
import { HeadComponent } from "../components/Head";
import { PUBLIC_URLS } from "../utils";
import { PortfolioLink } from "../components/portfolio/PortfolioLink";
import { ThemeContext } from "../contexts/ThemeContext";

const PortfolioPage = () => {
  const router = useRouter();
  const { isDarkMode } = useContext(ThemeContext);
  return (
    <>
      <HeadComponent title="Oops! Page Not Found" />
      <main
        className={`h-auto min-h-screen overflow-hidden flex flex-col items-center select-none justify-center gap-2 p-10 w-full ${
          isDarkMode ? "bg-dark" : "bg-[#0079D8]"
        } text-light`}
      >
        <div className="w-full max-w-3xl mx-auto flex flex-col items-start gap-y-6">
          <h1 className="text-9xl -ml-2 mb-10">:(</h1>
          <p className="w-full max-w-lg font-semibold md:text-lg">Error-404</p>
          <p className="w-full max-w-lg break-words md:text-lg">
            It seems that the page you are looking for doesn&apos;t exist or is
            temporarily unavailable.
          </p>
          <p className="w-full max-w-lg font-semibold md:text-lg">
            Sorry for the inconvenience.
          </p>

          <ul className="flex mt-10 items-center justify-start gap-x-4">
            <li>
              <PortfolioLink
                shadow={false}
                label="Go Back"
                btnMode
                cb={() => router.back()}
              />
            </li>
            <li>
              <PortfolioLink
                shadow={false}
                label="Homepage"
                href={PUBLIC_URLS.home.url}
              />
            </li>
          </ul>
        </div>
      </main>
    </>
  );
};

export default PortfolioPage;
