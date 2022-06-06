// design LIST PAGE

import { useState, useEffect } from "react";
// import : internal
import { PUBLIC_LIST_TYPES } from "../../utils";
import { DesignThumbnail } from "../../components/content/DesignThumbnail";
import { getAllDesigns } from "../../database/designs";
import { PublicListLayout } from "../../components/Layouts/PublicListLayout";

const DesignList = ({ designList, totalCount }) => {
  designList = JSON.parse(designList) || [];
  totalCount = JSON.parse(totalCount) || 0;
  const [searchText, setSearchText] = useState("");
  const [count, setCount] = useState(totalCount);

  useEffect(() => {
    setCount(
      () =>
        designList.filter((el) =>
          el.title.toLowerCase().includes(searchText.toLowerCase())
        ).length
    );
  }, [searchText]);
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
    >
      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center gap-20 md:gap-x-10 p-4 w-full mb-20 max-w-6xl mx-auto">
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
          <>
            {totalCount > 0 ? (
              <p className="content--sub font-semibold">
                No design with{" "}
                <span className="text-primary text-lg">{searchText}</span>{" "}
                keyword found!{" "}
              </p>
            ) : (
              <></>
            )}
          </>
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
