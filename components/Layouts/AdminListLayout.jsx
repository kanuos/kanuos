import React from "react";
import { ADMIN_NEW_CONTENT, PUBLIC_LIST_TYPES } from "../../utils/index";

import PublicLayout from "../Layouts/PublicLayout";
import { PublicHeader } from "../public/Header";
import { Page404 } from "../public/404";

export const AdminListLayout = ({
  list = [],
  type,
  children,
  searchText,
  getSearchText,
  totalSize,
}) => {
  return (
    <PublicLayout
      navType="admin"
      metaTitle={`ADMIN : All ${type}`}
      metaDesc={PUBLIC_LIST_TYPES[type]?.desc || ""}
    >
      {totalSize > 0 ? (
        <div className="px-8 pt-10 lg:px-0 mx-auto select-text">
          <div className="w-full max-w-3xl mx-auto">
            <PublicHeader
              adminMode={true}
              data={{
                ...PUBLIC_LIST_TYPES[type],
                count: list.length,
              }}
              searchMode={Boolean(totalSize)}
              searchText={searchText}
              handleSearch={getSearchText}
            />
          </div>
          {list.length > 0 ? (
            <main
              className={
                type === PUBLIC_LIST_TYPES.designs.type
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center gap-20 p-4 w-full mb-20 max-w-6xl mx-auto justify-center items-center"
                  : "flex flex-col mb-20 gap-16 items-stretch w-full max-w-4xl mx-auto"
              }
            >
              {children}
            </main>
          ) : (
            <main className="grid place-items-center gap-20 p-4 w-full mb-20 mx-auto">
              <p>
                No {type} with{" "}
                <strong className="font-bold text-primary">{searchText}</strong>{" "}
                found!
              </p>
            </main>
          )}
        </div>
      ) : (
        <Page404
          heading={type}
          styledMsg={`No ${type} found`}
          subHeading="Admin Mode"
          text={`No public or private ${type} found. Start writing`}
          btnLabel="Add new content"
          btnURL={ADMIN_NEW_CONTENT}
        />
      )}
    </PublicLayout>
  );
};

// P :
// B : grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center gap-20 md:gap-x-10 p-4 w-full mb-20 max-w-6xl mx-auto
