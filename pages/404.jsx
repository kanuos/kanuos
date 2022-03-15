// Default error page
import { useContext } from "react";
import Link from "next/link";


// import : internal
import { HeadComponent } from "../components/Head";
import { JoinLine } from '../components/public/DescHeader'
import { ThemeContext } from "../contexts/ThemeContext";
import { PUBLIC_URLS } from "../utils";

const PortfolioPage = () => {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <>
      <HeadComponent title="Oops! Page Not Found" />
      <main
        className={
          "h-screen flex flex-col items-center select-none justify-center gap-2 p-10 w-full " +
          (isDarkMode ? "main-dark" : "main-light")
        }
      >
        <video loop playsInline muted autoPlay className="fixed z-0 inset-0 h-screen w-screen object-cover opacity-5 pointer-events-none">
          <source src="/pf.webm" type="video/webm"/>
          <source src="/pf.mp4" type="video/mp4"/>
        </video>
        <h1 className="font-special font-black text-9xl capitalize relative after:absolute before:absolute after:content-['404'] before:content-['404'] after:text-9xl before:text-9xl after:text-primary before:text-secondary after:-bottom-0.5 before:-top-0.5 before:-left-0.5 after:-right-0.5 after:z-0 before:z-0 tracking-tighter">
          <span className="relative z-10">404</span>
        </h1>
        <p className="text-xs text-center w-11/12 max-w-xl mx-auto break-words">
          This page doesn't exist or is temporarily unavailable.
        </p>
        <div className="mt-20 animate-bounce">
          <JoinLine />
        </div>
        <p className="text-xs group opacity-50 hover:opacity-100 transition-all">Let's go to <Link href={PUBLIC_URLS.home.url}>
          <a className="inline-block transition-all relative after:w-full after:absolute after:-bottom-1.5 after:h-0.5 after:bg-secondary after:left-0 after:scale-0 group-hover:after:scale-100 after:transition-all after:origin-center hover:after:bg-primary">
            HOME
          </a>
        </Link> and surf from there!
        </p>
      </main>
    </>
  );
};

export default PortfolioPage;
