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


// dynamic imports
const NavBar = dynamic(() => import("../../components/public/Nav").then(m => m.NavBar));
const ListLoader = dynamic(() => import("../../components/public/ListLoader").then(m => m.ListLoader));
const ThemeToggler = dynamic(() => import("../../components/public/ThemeToggler").then(m => m.ThemeToggler));





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
              <main className="grid grid-cols-1 sm:grid-cols-6 lg:grid-cols-9 grid-flow-row gap-20 p-4 w-full mb-20 max-w-5xl mx-auto">
                {designList.map((design, i) => (
                  <DesignThumbnail
                    key={design._id}
                    data={design}
                    index = {i}
                  />
                ))}
              </main>
              <ListLoader />
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
