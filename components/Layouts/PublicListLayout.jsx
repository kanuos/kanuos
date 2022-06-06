import { Fragment } from "react";
import { Footer } from "../public/Footer";
import { PublicHeader } from "../public/Header";
import PublicLayout from "./PublicLayout";

export const PublicListLayout = ({
  pageTitle,
  pageDesc,
  data,
  children,
  searchText,
  setSearchText,
}) => {
  return (
    <Fragment>
      <PublicLayout metaTitle={pageTitle} metaDesc={pageDesc}>
        <div className="px-8 pt-8 lg:px-0 max-w-2xl mx-auto select-text">
          <PublicHeader
            data={data}
            searchText={searchText}
            handleSearch={(x) => setSearchText(x)}
            searchMode={data.searchMode}
          />
        </div>
        <div className="px-8 w-full min-h-[60vh] grow mx-auto flex flex-col justify-start items-stretch">
          {children}
          <div className="mt-auto">
            <Footer />
          </div>
        </div>
      </PublicLayout>
    </Fragment>
  );
};
