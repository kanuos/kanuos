// Default error page
import { useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

// import : external
import { IoHomeOutline } from "react-icons/io5";

// import : internal
import { HeadComponent } from "../components/Head";
import { NavBar } from "../components/public/Nav";
import { ThemeContext } from "../contexts/ThemeContext";
import { PUBLIC_URLS } from "../utils";

const PortfolioPage = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const router = useRouter();

  return (
    <>
      <HeadComponent title="Oops! Page Not Found" />
      <NavBar />
      <main
        className={
          "h-screen flex flex-col items-center select-none justify-center gap-2 p-10 w-full " +
          (isDarkMode ? "main-dark" : "main-light")
        }
      >
        <h1 className="font-special text-primary text-5xl capitalize">
          Error 404
        </h1>
        <img
          src="/error.png"
          alt="Error page image"
          className="h-28 w-28 object-cover"
        />
        <p className="p-4 rounded-md bg-light text-dark filter drop-shadow-xl">
          <span className="text-sm">Page not found at :</span>
          <strong>{router.asPath}</strong>
        </p>
        <Link href={PUBLIC_URLS.home.url}>
          <a className="my-10 w-max mx-auto flex gap-1 items-center justify-center text-center uppercase text-xs p-2 rounded-md transition-all border hover:border-current border-transparent">
            <IoHomeOutline />
            <small className="text-center tracking-wide">go to home</small>
          </a>
        </Link>
      </main>
    </>
  );
};

export default PortfolioPage;
