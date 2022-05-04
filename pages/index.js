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
import { staticMetadata } from "../utils/portfolio_static";
import { ThemeContext } from "../contexts/ThemeContext";
import { CTA } from "../components/portfolio/CTA";
import { PUBLIC_URLS } from "../utils";

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
      console.log({ error });
    } finally {
      setSelectedTag("");
    }
  }

  function handleInitialState() {
    setData(null);
    setSelectedTag("");
    setStatus(STATUSES.initial);
  }

  return (
    <>
      <PublicLayout metaTitle="Welcome to Sounak's website">
        <StyledHeader styledText="search by tags" isDarkMode={isDarkMode}>
          <h1 className="text-5xl md:text-7xl font-black mt-2 mb-2 w-min">
            Hello world!
          </h1>
          <span className="text-sm md:text-base font-semibold mb-6">
            I&apos;m Sounak. Welcome to my tech journal
          </span>
          <p className="w-3/4 text-sm opacity-60">
            You can search blogs, designs and projects by tags. For ease of
            navigation, I tag them accordingly. Enjoy!
          </p>
          <div className="mt-10">
            <CTA
              isDarkMode={isDarkMode}
              href={PUBLIC_URLS.portfolio.url}
              label="My Portfolio"
            />
          </div>
        </StyledHeader>
        <div className="-mt-10 text-center text-xs w-full uppercase tracking-widest animate-bounce">
          <small>scroll</small>
        </div>
        <div className="w-full p-10">
          {status === STATUSES.initial && Boolean(allTags.length) && (
            <>
              <div className="flex flex-col items-start max-w-4xl px-10 mx-auto w-full">
                <h2 className=" font-semibold capitalize">available tags</h2>
                <p className="text-xs">
                  <small>Total tags : {allTags.length}</small>
                </p>
              </div>
              <ul className="flex flex-wrap items-center my-10 justify-start gap-4 gap-y-3 max-w-4xl px-10 mx-auto w-full">
                {allTags.map((tag) => (
                  <li key={tag._id}>
                    <Tag tag={tag} cb={() => setSelectedTag(tag._id)} />
                  </li>
                ))}
              </ul>
            </>
          )}

          {status === STATUSES.loading && <LoadSpinner />}

          {status === STATUSES.complete && data && (
            <TagDetailList {...data} close={handleInitialState} />
          )}
        </div>
      </PublicLayout>
    </>
  );
};

export default HomePage;

export async function getStaticProps() {
  try {
    const p1 = new Promise((res) => res(getAllTags()));
    const [allTags] = await Promise.allSettled([p1]);
    return {
      props: { allTags: JSON.stringify(allTags.value) },
      revalidate: 10,
    };
  } catch (error) {}
}
