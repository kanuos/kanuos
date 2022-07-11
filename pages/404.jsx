// Default error page
import { useContext } from "react";
// import : internal
import { PUBLIC_URLS } from "../utils";
import PublicLayout from "../components/Layouts/PublicLayout";
import { StyledHeader } from "../components/portfolio/StyledHeader";
import { CTA } from "../components/portfolio/CTA";
import { ThemeContext } from "../contexts/ThemeContext";
import { BsEmojiDizzy } from "react-icons/bs";

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
        <>
          <div className="flex items-center justify-start gap-x-px">
            <BsEmojiDizzy className="text-6xl" />
            <h1 className="heading--primary">ops</h1>
          </div>
          <p className="content--primary text-justify pt-2">
            It seems that the page you are looking for doesn&apos;t exist or is
            temporarily unavailable.
            <br />
            Sorry for the inconvenience.
          </p>
          <div className="mt-6">
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

export default ErrorPage;
