// Default error page
import { useContext } from "react";
// import : internal
import { PUBLIC_URLS } from "../utils";
import PublicLayout from "../components/Layouts/PublicLayout";
import { StyledHeader } from "../components/portfolio/StyledHeader";
import { CTA } from "../components/portfolio/CTA";
import { ThemeContext } from "../contexts/ThemeContext";

const ErrorPage = () => {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <PublicLayout
      metaTitle="Error 404"
      metaDesc="Page couldn't be found. Sounak Mukherjee's website"
      errorPage={true}
    >
      <StyledHeader
        styledText="page not found"
        isDarkMode={isDarkMode}
        showScroll={false}
      >
        <div className="flex items-center justify-start gap-x-px pt-6">
          <h1 className="heading--primary">oops</h1>
        </div>
        <p className="content--secondary font-bold w-full pt-2">
          Page not found
        </p>
        <p className="content--secondary opacity-80 w-full pt-2 max-w-md">
          It seems that the page you are looking for doesn&apos;t exist or is
          temporarily unavailable or it has been moved.
        </p>
        <div className="mt-20">
          <CTA
            tiny={true}
            label="Go to Home"
            href={PUBLIC_URLS.home.url}
            isDarkMode={isDarkMode}
          />
        </div>
      </StyledHeader>
    </PublicLayout>
  );
};

export default ErrorPage;
