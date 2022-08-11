// design LIST PAGE
import dynamic from "next/dynamic";
import { useState, useEffect, useContext } from "react";
// import : internal
import { PUBLIC_LIST_TYPES } from "../../utils";
import { getAllDesigns } from "../../database/designs";
import { PublicListLayout } from "../../components/Layouts/PublicListLayout";
import { ThemeContext } from "../../contexts/ThemeContext";

const DesignThumbnail = dynamic(() =>
  import("../../components/content/DesignThumbnail").then(
    (m) => m.DesignThumbnail
  )
);

const DesignList = ({ designList, totalCount }) => {
  designList = JSON.parse(designList) || [];
  totalCount = JSON.parse(totalCount) || 0;

  const { isDarkMode } = useContext(ThemeContext);

  const [searchText, setSearchText] = useState("");
  const [count, setCount] = useState(totalCount);

  useEffect(() => {
    setCount(
      () =>
        designList.filter((el) =>
          el.title.toLowerCase().includes(searchText.toLowerCase())
        ).length
    );
  }, [searchText, designList]);
  return (
    <PublicListLayout
      pageTitle="Sounak Mukherjee's designs"
      pageDesc="Check out the UI-UX designs and prototypes I designed for various products"
      data={{
        ...PUBLIC_LIST_TYPES.designs,
        count,
        searchMode: totalCount > 0,
      }}
      searchText={searchText}
      setSearchText={(x) => setSearchText(x)}
      isDarkMode={isDarkMode}
    >
      <main
        className={`grid grid-cols-1 ${
          count > 1 ? "md:grid-cols-2 lg:grid-cols-3" : ""
        } place-items-center gap-20 w-full mb-20 max-w-6xl mx-auto justify-center items-center`}
      >
        {count > 0 ? (
          <>
            {designList
              .filter((el) =>
                el.title.toLowerCase().includes(searchText.toLowerCase())
              )
              .map((design, index) => (
                <DesignThumbnail
                  key={design._id}
                  data={design}
                  index={index + 1}
                />
              ))}
          </>
        ) : (
          <p className="content--secondary text-center">No results found</p>
        )}
      </main>
    </PublicListLayout>
  );
};

export default DesignList;

export async function getStaticProps() {
  let designList = [],
    totalCount = 0;
  try {
    designList = await getAllDesigns(false);
    totalCount = designList.length;
  } catch (error) {
    designList = [];
    totalCount = 0;
  } finally {
    return {
      props: {
        designList: JSON.stringify(designList),
        totalCount: JSON.stringify(totalCount),
      },
      revalidate: 1,
    };
  }
}
