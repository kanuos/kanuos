// design LIST PAGE

import { useContext } from "react";
// import : internal
import { HeadComponent } from "../../../components/Head";
import { PublicHeader } from "../../../components/public/Header";
import { ITEMS_PER_PAGE, PUBLIC_LIST_TYPES } from "../../../utils";
import { DesignThumbnail } from "../../../components/content/DesignThumbnail";
import { getAllDesigns } from "../../../database/designs";

import { ThemeContext } from "../../../contexts/ThemeContext";
import dynamic from "next/dynamic";

// dynamic imports
const NavBar = dynamic(() =>
  import("../../../components/public/Nav").then((m) => m.NavBar)
);
const Footer = dynamic(() =>
  import("../../../components/public/Footer").then((m) => m.Footer)
);
const Pagination = dynamic(() =>
  import("../../../components/public/Pagination").then((m) => m.Pagination)
);
const ThemeToggler = dynamic(() =>
  import("../../../components/public/ThemeToggler").then((m) => m.ThemeToggler)
);

/*

// Design LIST PAGE
import { useContext } from "react";
// import : internal
import { HeadComponent } from "../../components/Head";
import { PublicHeader } from "../../components/public/Header";
import { PUBLIC_LIST_TYPES } from "../../utils";
import { DesignThumbnail } from "../../components/content/DesignThumbnail";
import { getAllDesigns } from "../../database/designs";
import { ThemeContext } from "../../contexts/ThemeContext";
import dynamic from "next/dynamic";
import { Footer } from "../../components/public/Footer";

// dynamic imports
const NavBar = dynamic(() =>
  import("../../components/public/Nav").then((m) => m.NavBar)
);
const Pagination = dynamic(() =>
  import("../../components/public/Pagination").then((m) => m.Pagination)
);
const ThemeToggler = dynamic(() =>
  import("../../components/public/ThemeToggler").then((m) => m.ThemeToggler)
);

const DesignList = ({ designList }) => {
  designList = JSON.parse(designList);
  const { isDarkMode } = useContext(ThemeContext);
  return (
    <>
      <HeadComponent
        title="Sounak Mukherjee's Ui/UX Designs"
        content="Check out the UI-UX designs and prototypes I designed for various products"
      />
      <NavBar />
      <ThemeToggler />
      <div
        className={
          "h-full  min-h-screen scrollbar-thin w-full overflow-hidden " +
          (isDarkMode ? "main-dark" : "main-light")
        }
      >
        <div className="px-12 py-20 w-full flex flex-col items-center justify-start mx-auto select-text h-full">
          <PublicHeader
            data={{ ...PUBLIC_LIST_TYPES.designs, count: designList.length }}
          />
          {designList.length > 0 ? (
            <>
              <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center gap-10 p-4 w-full mb-20 max-w-6xl mx-auto">
                {designList.map((design, i) => (
                  <DesignThumbnail key={design._id} data={design} index={i} />
                ))}
              </main>
            </>
          ) : (
            <main className="h-[30vh] flex flex-col items-center justify-center gap-2">
              <p className="p-4 rounded-md bg-light text-dark filter drop-shadow-xl">
                <span className="text-sm">No designs found!</span>
              </p>
            </main>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DesignList;

export async function getStaticProps() {
  let designList;
  try {
    designList = await getAllDesigns(false);
  } catch (error) {
    console.log(error);
    designList = [];
  } finally {
    return {
      props: {
        designList: JSON.stringify(designList),
      },
      revalidate: 10,
    };
  }
}


*/

const DesignList = ({ designList, totalCount, pageStartNumber, pageCount }) => {
  designList = JSON.parse(designList);
  totalCount = JSON.parse(totalCount);
  pageStartNumber = JSON.parse(pageStartNumber);
  pageCount = JSON.parse(pageCount);

  const { isDarkMode } = useContext(ThemeContext);

  return (
    <>
      <HeadComponent
        title="Sounak Mukherjee's designs"
        content="Check out the UI-UX designs and prototypes I designed for various products"
      />
      <NavBar />
      <ThemeToggler />
      <strong></strong>
      <div
        className={
          "h-full  min-h-screen scrollbar-thin w-full overflow-hidden " +
          (isDarkMode ? "main-dark" : "main-light")
        }
      >
        <div className="px-12 lg:px-0 py-20 select-text">
          <div className="max-w-3xl mx-auto px-4">
            <PublicHeader
              data={{ ...PUBLIC_LIST_TYPES.designs, count: totalCount }}
            />
          </div>
          {designList.length > 0 ? (
            <>
              <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center gap-20 md:gap-10 p-4 w-full mb-20 max-w-6xl mx-auto">
                {designList.map((design, index) => (
                  <DesignThumbnail
                    key={design._id}
                    data={design}
                    index={index + parseInt(pageStartNumber) + 1}
                  />
                ))}
              </main>
              {designList.length < totalCount && (
                <Pagination count={pageCount} baseURL="/designs/page" />
              )}
            </>
          ) : (
            <main className="h-[30vh] flex flex-col items-center justify-center gap-2">
              <p className="p-4 rounded-md bg-light text-dark filter drop-shadow-xl">
                <span className="text-sm">No designs found!</span>
              </p>
            </main>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DesignList;

export async function getStaticProps({ params }) {
  let designList, totalCount, pageCount;
  try {
    const allDesigns = await getAllDesigns(false);
    totalCount = allDesigns.length;

    const pageData = [];

    let start = 0;
    while (start < allDesigns.length) {
      pageData.push(allDesigns.slice(start, start + ITEMS_PER_PAGE.design));
      start += ITEMS_PER_PAGE.design;
    }

    pageCount = pageData.length;

    designList = pageData[parseInt(params.number) - 1];
  } catch (error) {
    console.log(error);
    designList = [];
    totalCount = 0;
    pageCount = 0;
  } finally {
    return {
      props: {
        designList: JSON.stringify(designList),
        totalCount: JSON.stringify(totalCount),
        pageStartNumber: JSON.stringify(
          (parseInt(params.number) - 1) * ITEMS_PER_PAGE.design
        ),
        pageCount: JSON.stringify(pageCount),
      },
      revalidate: 5,
    };
  }
}

export async function getStaticPaths() {
  const allDesigns = await getAllDesigns(false);
  const pageData = [];

  let start = 0;
  while (start < allDesigns.length) {
    pageData.push(allDesigns.slice(start, start + ITEMS_PER_PAGE.design));
    start += ITEMS_PER_PAGE.design;
  }

  const paths = pageData.map((_, i) => ({
    params: { number: (i + 1).toString() },
  }));
  return {
    paths,
    fallback: false,
  };
}
