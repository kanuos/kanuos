// Home/Landing

import axios from "axios";
import { useState, useEffect, useContext } from "react";

// import : internal
import { getAllTags } from "../database/tags";
import { API_ROUTES } from "../utils/admin";
import dynamic from "next/dynamic";
import { Tag } from "../components/public/Tag";
import { StyledHeader } from "../components/portfolio/StyledHeader";
import PublicLayout from "../components/Layouts/PublicLayout";
import { ThemeContext } from "../contexts/ThemeContext";
import { CTA } from "../components/portfolio/CTA";
import { PUBLIC_URLS } from "../utils";
import { Footer } from "../components/public/Footer";

const STATUSES = {
  initial: "initial",
  loading: "loading",
  complete: "complete",
};

const LoadSpinner = dynamic(() =>
  import("../components/public/Loader").then((m) => m.LoadSpinner)
);
const TagDetailList = dynamic(() =>
  import("../components/public/TagDetailList").then((m) => m.TagDetailList)
);

const HomePage = ({ allTags }) => {
  const { isDarkMode } = useContext(ThemeContext);
  allTags = JSON.parse(allTags);
  const [selectedTag, setSelectedTag] = useState("");
  const [status, setStatus] = useState(STATUSES.initial);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!selectedTag) return;
    getTagRelatedData(selectedTag);
  }, [selectedTag]);

  async function getTagRelatedData(tag) {
    try {
      setStatus(STATUSES.loading);
      const { data, error } = (
        await axios({
          url: API_ROUTES.tags + "/" + tag,
          method: "GET",
        })
      ).data;

      if (error) throw data;

      let { blog, design, project, tag: t } = data[0];

      blog = blog.filter((b) => b.isPublic);
      design = design.filter((d) => d.isPublic);
      project = project.filter((p) => p.isPublic);

      setData({ blog, design, project, tag: t });
      setStatus(STATUSES.complete);
    } catch (error) {
      setStatus(STATUSES.initial);
    } finally {
      setSelectedTag("");
    }
  }

  function handleInitialState() {
    setData(null);
    setSelectedTag("");
    setStatus(STATUSES.initial);
  }

  const SEARCH_ID = "available-tags";
  const tagAvailability = Boolean(allTags.length);

  return (
    <PublicLayout metaTitle="Welcome to Sounak's website">
      <StyledHeader
        styledText={tagAvailability ? "search by tags" : "sounak mukherjee"}
        isDarkMode={isDarkMode}
        showScroll={allTags.length > 0}
      >
        <h1 className="heading--primary">Hello world!</h1>
        <span className="text-sm md:text-base font-bold my-2">
          I&apos;m Sounak. Welcome to my tech journal
        </span>
        <p className="content--main">
          You can search blogs, designs and projects by tags. For ease of
          navigation, I tag them accordingly. Enjoy!
        </p>
        <div className="mt-10">
          <CTA
            isDarkMode={isDarkMode}
            href={
              tagAvailability
                ? `${PUBLIC_URLS.home.url}#${SEARCH_ID}`
                : PUBLIC_URLS.portfolio.url
            }
            label={
              tagAvailability
                ? "Available list of tags"
                : "Check out my portfolio"
            }
          />
        </div>
      </StyledHeader>
      {tagAvailability && (
        <>
          <div id={SEARCH_ID} className="w-full p-8 mb-40">
            {status === STATUSES.initial && (
              <section className="w-full max-w-3xl mx-auto">
                <div className="flex flex-col items-start w-full">
                  <h2 className="heading--sub font-bold">
                    Total tags : {allTags.length}
                  </h2>
                </div>
                <ul className="flex flex-wrap items-center my-10 justify-start gap-4 gap-y-3 w-full">
                  {allTags.map((tag) => (
                    <li key={tag._id}>
                      <Tag tag={tag} cb={() => setSelectedTag(tag._id)} />
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {status === STATUSES.loading && (
              <section className="w-full max-w-3xl mx-auto grid place-items-center">
                <LoadSpinner />
              </section>
            )}

            {status === STATUSES.complete && data && (
              <TagDetailList {...data} close={handleInitialState} />
            )}
          </div>
          <Footer />
        </>
      )}
    </PublicLayout>
  );
};

export default HomePage;

export async function getStaticProps() {
  try {
    const p1 = new Promise((res) => res(getAllTags()));
    const [allTags] = await Promise.allSettled([p1]);
    return {
      props: { allTags: JSON.stringify(allTags.value) },
      revalidate: 1,
    };
  } catch (error) {}
}
