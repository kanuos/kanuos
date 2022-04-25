// Default error page
import { useContext } from "react";
import { useRouter } from "next/router";
// import : internal
import { PUBLIC_URLS } from "../utils";
import PublicLayout from "../components/Layouts/PublicLayout";
import { StyledHeader } from "../components/portfolio/StyledHeader";
import { CTA } from "../components/portfolio/CTA";
import { ThemeContext } from "../contexts/ThemeContext";

const PortfolioPage = () => {
  const router = useRouter();

  const { isDarkMode } = useContext(ThemeContext);

  return (
    <PublicLayout
      metaTitle="Error 404"
      content="Page couldn't be found. Sounak Mukherjee's website"
    >
      <StyledHeader styledText="page not found" isDarkMode={isDarkMode}>
        <>
          <button
            onClick={() => router.back()}
            className="text-xs md:text-sm font-semibold opacity-60 hover:opacity-100 hover:underline"
          >
            &lt;&nbsp;Go back
          </button>
          <h1 className="text-5xl md:text-7xl font-black mt-2 mb-6">Oops :(</h1>
          <p className="w-3/4 text-xs md:text-sm font-semibold opacity-60 max-w-lg">
            It seems that the page you are looking for doesn&apos;t exist or is
            temporarily unavailable.
            <br />
            Sorry for the inconvenience.
          </p>
          <div className="mt-10">
            <CTA
              label="Go to Home"
              href={PUBLIC_URLS.home.url}
              isDarkMode={isDarkMode}
            />
          </div>
        </>
      </StyledHeader>
    </PublicLayout>
  );
};

export default PortfolioPage;
