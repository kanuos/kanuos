// Default error page
import { useContext } from "react";
import { useRouter } from 'next/router'
// import : internal
import { HeadComponent } from "../components/Head";
import { JoinLine } from '../components/public/DescHeader'
import { ThemeContext } from "../contexts/ThemeContext";
import { PUBLIC_URLS } from "../utils";
import { VideoBG } from "../components/public/VideoBG";
import { PortfolioLink } from "../components/portfolio/PortfolioLink";

const PortfolioPage = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const router = useRouter();

  return (
    <>
      <HeadComponent title="Oops! Page Not Found" />
      <main
        className={
          "h-auto min-h-screen overflow-hidden flex flex-col items-center select-none justify-center gap-2 p-10 w-full " +
          (isDarkMode ? "main-dark" : "main-light")
        }
      >
        <VideoBG />
        <div className="w-full max-w-3xl mx-auto flex flex-col items-start gap-y-2">
          <h1 className="font-black text-6xl -ml-2">
            Oops!!
          </h1>
          <JoinLine />
          <p className="w-full max-w-lg break-words md:text-lg">
            It seems that the page you are looking for doesn&apos;t exist or is temporarily unavailable.
          </p>
        
          <ul className="flex mt-10 items-center justify-start gap-x-4">
            <li>
              <PortfolioLink 
                shadow={false} 
                label='go back' 
                btnMode 
                cb={() => router.back()}/>
            </li>
            <li>
              <PortfolioLink 
                shadow={false} 
                label='go to homepage' 
                href={PUBLIC_URLS.home.url}/>
            </li>
          </ul>
          
        </div>

       </main>
    </>
  );
};

export default PortfolioPage;
