// design LIST PAGE

// import : internal
import { PublicHeader } from "../../../components/public/Header";
import { ITEMS_PER_PAGE, PUBLIC_LIST_TYPES } from "../../../utils";
import PublicLayout from "../../../components/Layouts/PublicLayout";
import { DesignThumbnail } from "../../../components/content/DesignThumbnail";
import { getAllDesigns } from "../../../database/designs";

import dynamic from "next/dynamic";

const Pagination = dynamic(() =>
  import("../../../components/public/Pagination").then((m) => m.Pagination)
);

const DesignList = ({ designList, totalCount, pageStartNumber, pageCount }) => {
  designList = JSON.parse(designList);
  totalCount = JSON.parse(totalCount);
  pageStartNumber = JSON.parse(pageStartNumber);
  pageCount = JSON.parse(pageCount);

  return (
    <PublicLayout
      metaTitle="Sounak Mukherjee's designs"
      metaDesc="Check out the UI-UX designs and prototypes I designed for various products"
    >
      <div className="px-10 pt-20 lg:px-0 max-w-2xl mx-auto select-text">
        <PublicHeader
          data={{ ...PUBLIC_LIST_TYPES.designs, count: totalCount }}
        />
      </div>
      <div className="px-10 pb-20 w-full mx-auto max-w-7xl">
        {designList.length > 0 ? (
          <>
            <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center gap-20 md:gap-x-10 p-4 w-full mb-20 max-w-6xl mx-auto">
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
    </PublicLayout>
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
