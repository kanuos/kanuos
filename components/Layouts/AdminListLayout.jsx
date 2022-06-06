import React from "react";
import { IoAddCircle } from "react-icons/io5";
import Link from "next/link";
import { ADMIN_NEW_CONTENT, PUBLIC_LIST_TYPES } from "../../utils/index";

import PublicLayout from "../Layouts/PublicLayout";
import { PublicHeader } from "../public/Header";

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
      <div className="px-8 pt-20 lg:px-0 max-w-2xl mx-auto select-text">
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
      <div className="p-8 w-full mx-auto">
        <main
          className={
            type === PUBLIC_LIST_TYPES.designs.type
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center gap-16 md:gap-x-10 p-4 w-full mb-20 max-w-6xl mx-auto justify-center items-center"
              : "flex flex-col mb-20 gap-16 items-stretch w-full max-w-4xl mx-auto"
          }
        >
          {list.length > 0 ? (
            <>{children}</>
          ) : (
            <>
              {" "}
              {Boolean(totalSize) ? (
                <p className="content--sub font-semibold">
                  No {type} with{" "}
                  <span className="text-primary text-lg">{searchText}</span>{" "}
                  keyword found!{" "}
                </p>
              ) : (
                <></>
              )}
            </>
          )}
        </main>
      </div>
      <div className="h-screen fixed top-0 right-0 w-max flex flex-col pb-6 pr-4 z-10 justify-end">
        <Link href={ADMIN_NEW_CONTENT}>
          <a className="text-5xl hover:text-secondary hover:rotate-90 transition-all">
            <IoAddCircle />
          </a>
        </Link>
      </div>
    </PublicLayout>
  );
};

// P :
// B : grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center gap-20 md:gap-x-10 p-4 w-full mb-20 max-w-6xl mx-auto
