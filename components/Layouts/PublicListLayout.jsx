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
      {data.searchMode ? (
        <PublicLayout metaTitle={pageTitle} metaDesc={pageDesc}>
          <div className="px-8 pt-10 md:py-8 lg:px-0 max-w-2xl mx-auto select-text">
            <PublicHeader
              data={data}
              searchText={searchText}
              handleSearch={(x) => setSearchText(x)}
              searchMode={data.searchMode}
            />
          </div>
          <div className="px-8 w-full min-h-[85vh] pb-8 grow mx-auto flex flex-col justify-start items-stretch">
            {children}
          </div>
          <div className="mt-auto">
            <Footer />
          </div>
        </PublicLayout>
      ) : (
        <PublicLayout metaTitle={pageTitle} metaDesc={pageDesc}>
          <div className="h-screen w-full grid place-items-center">
            <div className="flex flex-col items-center justify-center gap-4 px-8">
              <h1 className="heading--primary">No {data.type} found!</h1>
              <p className="content--secondary text-center w-11/12 mx-auto">
                Please come back after some time. Hope to see you soon
              </p>
            </div>
          </div>
        </PublicLayout>
      )}
    </Fragment>
  );
};
