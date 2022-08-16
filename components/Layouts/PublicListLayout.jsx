import dynamic from "next/dynamic";

const Page404 = dynamic(() => import("../public/404").then((m) => m.Page404));

import { Fragment } from "react";
import { PublicHeader } from "../public/Header";
import PublicLayout from "./PublicLayout";

export const PublicListLayout = ({
  pageTitle,
  pageDesc,
  data,
  children,
  searchText,
  setSearchText,
  isDarkMode,
}) => {
  return (
    <Fragment>
      {data.searchMode ? (
        <PublicLayout metaTitle={pageTitle} metaDesc={pageDesc}>
          <div className="px-8 pt-20 lg:px-0 max-w-3xl mx-auto select-text">
            <PublicHeader
              data={data}
              searchText={searchText}
              handleSearch={(x) => setSearchText(x)}
              searchMode={data.searchMode}
            />
          </div>
          <div className="p-8 w-full h-auto pb-8 grow mx-auto flex flex-col justify-start items-stretch">
            {children}
          </div>
        </PublicLayout>
      ) : (
        <PublicLayout metaTitle={pageTitle} metaDesc={pageDesc}>
          <Page404
            heading={data.type}
            isDarkMode={isDarkMode}
            subHeading={`No public ${data.type} found at this time.`}
            styledMsg={`${data.type} not found!`}
          />
        </PublicLayout>
      )}
    </Fragment>
  );
};
