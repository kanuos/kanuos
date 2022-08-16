// Default error page
import { useContext } from "react";
// import : internal
import PublicLayout from "../components/Layouts/PublicLayout";
import { ThemeContext } from "../contexts/ThemeContext";
import { Page404 } from "../components/public/404";

const ErrorPage = () => {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <PublicLayout
      metaTitle="Error 404"
      metaDesc="Page couldn't be found. Sounak Mukherjee's website"
      errorPage={true}
    >
      <Page404
        isDarkMode={isDarkMode}
        heading="oops!"
        subHeading="Page Not Found"
        text={`It seems that the page you are looking for doesn't exist or is
          temporarily unavailable. Sorry for the inconvenience`}
        styledMsg="Error 404"
      />
    </PublicLayout>
  );
};

export default ErrorPage;
