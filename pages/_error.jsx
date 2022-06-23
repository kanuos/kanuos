// Default error page
import { useContext } from "react";
import { useRouter } from "next/router";
// import : internal
import { PUBLIC_URLS } from "../utils";
import PublicLayout from "../components/Layouts/PublicLayout";
import { StyledHeader } from "../components/portfolio/StyledHeader";
import { CTA } from "../components/portfolio/CTA";
import { ThemeContext } from "../contexts/ThemeContext";
import { BsEmojiDizzy } from "react-icons/bs";

const ErrorPage = () => {
  const router = useRouter();

  const { isDarkMode } = useContext(ThemeContext);

  return (
    <PublicLayout
      metaTitle="Error 404"
      content="Page couldn't be found. Sounak Mukherjee's website"
    >
      <StyledHeader
        styledText="page not found"
        isDarkMode={isDarkMode}
        showScroll={false}
      >
        <>
          <button
            onClick={() => router.back()}
            className="text-xs md:text-sm font-semibold opacity-60 hover:opacity-100 hover:underline"
          >
            &lt;&nbsp;Go back
          </button>
          <div className="flex items-center justify-start gap-x-px">
            <BsEmojiDizzy className="heading--primary" />
            <h1 className="heading--primary">ops</h1>
          </div>
          <p className="content--main text-justify mb-6 mt-2">
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

export default ErrorPage;
