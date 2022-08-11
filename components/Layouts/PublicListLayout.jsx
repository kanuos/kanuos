import { Fragment } from "react";
import { PUBLIC_URLS } from "../../utils";
import { CTA } from "../portfolio/CTA";
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
          <div className="h-screen w-full grid place-items-center">
            <div className="flex flex-col items-start justify-center gap-4 px-8 w-full max-w-3xl">
              <div className="relative">
                <h2 className="heading--primary">{data.type}</h2>
                <small
                  className={`font-bold rounded-sm absolute left-0 -top-6 bg-primary  py-0.5 px-2 animate-bounce ${
                    isDarkMode ? "text-light" : "text-primary bg-opacity-10"
                  }`}
                >
                  404
                </small>
              </div>
              <h2 className="heading--secondary">
                No public {data.type} found at this time.
              </h2>
              <p className="content--main">
                Please come back after some time. Hope to see you soon
              </p>
              <div className="w-max mt-10">
                <CTA
                  label="Go to home"
                  tiny={true}
                  isDarkMode={isDarkMode}
                  href={PUBLIC_URLS.home.url}
                />
              </div>
            </div>
          </div>
        </PublicLayout>
      )}
    </Fragment>
  );
};
