import React from "react";
import { CTA } from "../portfolio/CTA";
import { PUBLIC_URLS } from "../../utils/index";
import { StyledHeader } from "../portfolio/StyledHeader";

export const Page404 = ({
  heading,
  subHeading,
  text = "Please come back after some time. Hope to see you soon",
  btnURL = PUBLIC_URLS.home.url,
  btnLabel = "Go to Home",
  isDarkMode,
  error = true,
  styledMsg,
}) => {
  return (
    <StyledHeader
      showScroll={false}
      styledText={styledMsg}
      isDarkMode={isDarkMode}
    >
      <main className="h-screen w-full grid place-items-center">
        <div className="h-full w-full grid place-items-center">
          <div className="flex flex-col items-start justify-center gap-4 px-8 w-full max-w-3xl">
            <div className="relative">
              <h2 className="heading--primary">{heading}</h2>
              {error && (
                <small
                  className={`font-bold rounded-sm absolute left-0 -top-6 bg-primary  py-0.5 px-2 animate-bounce ${
                    isDarkMode ? "text-light" : "text-primary bg-opacity-10"
                  }`}
                >
                  404
                </small>
              )}
            </div>
            <h2 className="heading--secondary">{subHeading}</h2>
            <p className="content--main">{text}</p>
            <div className="w-max mt-10">
              <CTA
                label={btnLabel}
                tiny={true}
                isDarkMode={isDarkMode}
                href={btnURL}
              />
            </div>
          </div>
        </div>
      </main>
    </StyledHeader>
  );
};
