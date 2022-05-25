import { Fragment } from "react";
import { Footer } from "../public/Footer";
import { PublicHeader } from "../public/Header";
import PublicLayout from "./PublicLayout";

export const PublicListLayout = ({ pageTitle, pageDesc, data, children }) => {
  return (
    <Fragment>
      <PublicLayout metaTitle={pageTitle} metaDesc={pageDesc}>
        <div className="p-8 lg:px-0 max-w-2xl mx-auto select-text">
          <PublicHeader data={data} />
        </div>
        <div className="p-8 w-full min-h-[53vh] mx-auto flex flex-col items-stretch">
          {children}
          <div className="mt-auto">
            <Footer />
          </div>
        </div>
      </PublicLayout>
    </Fragment>
  );
};
