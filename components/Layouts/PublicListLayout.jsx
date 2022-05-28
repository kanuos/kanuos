import { Fragment, useCallback, useState } from "react";
import { Footer } from "../public/Footer";
import { PublicHeader } from "../public/Header";
import PublicLayout from "./PublicLayout";

export const PublicListLayout = ({ pageTitle, pageDesc, data, children }) => {
  const [searchText, setSearchText] = useState("");

  const getSearchText = useCallback((text) => {
    setSearchText(() => text);
  }, []);

  // TODO: move settext and callback to blogList, projectList, designList pages
  return (
    <Fragment>
      <PublicLayout metaTitle={pageTitle} metaDesc={pageDesc}>
        <div className="p-8 lg:px-0 max-w-2xl mx-auto select-text">
          <PublicHeader
            data={data}
            searchText={searchText}
            handleSearch={getSearchText}
          />
        </div>
        <div className="px-8 w-full min-h-[50vh] grow mx-auto flex flex-col items-stretch">
          {searchText}
          {children}
          <div className="mt-auto">
            <Footer />
          </div>
        </div>
      </PublicLayout>
    </Fragment>
  );
};
