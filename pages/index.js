// Home/Landing
import dynamic from "next/dynamic";
import { useState, memo, useContext, useCallback, useMemo } from "react";

// import : internal
import { getAllDesigns } from "../database/designs";
import { getAllProjects } from "../database/projects";
import { getAllBlogs } from "../database/blogs";

import PublicLayout from "../components/Layouts/PublicLayout";
import { ThemeContext } from "../contexts/ThemeContext";
import { PUBLIC_URLS } from "../utils";

const Page404 = dynamic(() =>
  import("../components/public/404").then((m) => m.Page404)
);
const StyledHeader = dynamic(() =>
  import("../components/portfolio/StyledHeader").then((m) => m.StyledHeader)
);
const Tag = dynamic(() =>
  import("../components/public/Tag").then((m) => m.Tag)
);
const TagDetailList = memo(
  dynamic(() =>
    import("../components/public/TagDetailList").then((m) => m.TagDetailList)
  )
);

const HomePage = ({ allContent }) => {
  const { allTags, allBlogs, allDesigns, allProjects } = JSON.parse(allContent);
  const { isDarkMode } = useContext(ThemeContext);
  const [selectedTag, setSelectedTag] = useState(null);

  const memoizedBlogs = useMemo(() => {
    if (!selectedTag) {
      return [];
    }
    return allBlogs.filter(
      (blog) =>
        blog.tags.filter(({ _id }) => _id === selectedTag._id).length > 0
    );
  }, [selectedTag, allBlogs]);

  const memoizedDesigns = useMemo(() => {
    if (!selectedTag) {
      return [];
    }
    return allDesigns.filter(
      (design) =>
        design.tags.filter(({ _id }) => _id === selectedTag._id).length > 0
    );
  }, [selectedTag, allDesigns]);

  const memoizedProjects = useMemo(() => {
    if (!selectedTag) {
      return [];
    }
    return allProjects.filter(
      (project) =>
        project.tags.filter(({ _id }) => _id === selectedTag._id).length > 0
    );
  }, [selectedTag, allProjects]);

  const handleInitialState = useCallback(function () {
    setSelectedTag(null);
  }, []);

  if (!Boolean(allTags.length)) {
    return (
      <PublicLayout metaTitle="Welcome to Sounak's website">
        <Page404
          heading="Hi there!"
          subHeading="Site is being maintained"
          error={false}
          text={`It appears that you're one of the early viewers of my site. The public contents are being maintained for the time being hence they are not available right now. Make sure to come back soon. Sorry for the inconvenience.`}
          btnLabel="Check out my portfolio"
          styledMsg="Sounak Mukherjee"
          btnURL={PUBLIC_URLS.portfolio.url}
        />
      </PublicLayout>
    );
  }

  return (
    <PublicLayout metaTitle="Welcome to Sounak's website">
      {selectedTag ? (
        <TagDetailList
          tag={selectedTag.tag}
          project={memoizedProjects}
          blog={memoizedBlogs}
          design={memoizedDesigns}
          close={handleInitialState}
        />
      ) : (
        <StyledHeader
          styledText={"search by tags"}
          isDarkMode={isDarkMode}
          showScroll={false}
        >
          <h1 className="heading--primary pt-4">Hello world!</h1>
          <span className="text-sm md:text-base font-bold my-2">
            I&apos;m Sounak. Welcome to my tech journal
          </span>
          <p className="content--main">
            I create entries for blogs, designs and projects. For ease of use, I
            categorize my contents into appropriate tags.
          </p>
          <section className="w-full my-10 flex items-stretch flex-col h-full">
            <div className="flex flex-col items-start w-full">
              <h2 className="heading--sub font-bold">
                Total tags : {allTags.length}
              </h2>
            </div>
            <ul className="flex flex-wrap items-center mt-6 justify-start gap-4 gap-y-3 w-full">
              {allTags.map((tag) => (
                <li key={tag._id}>
                  <Tag
                    tag={tag}
                    cb={() =>
                      setSelectedTag(() => ({ _id: tag._id, tag: tag.tag }))
                    }
                  />
                </li>
              ))}
            </ul>
          </section>
        </StyledHeader>
      )}
    </PublicLayout>
  );
};

export default HomePage;

export async function getStaticProps() {
  try {
    const existingTags = [];
    let [allBlogs, allDesigns, allProjects] = await Promise.allSettled([
      Promise.resolve(getAllBlogs()),
      Promise.resolve(getAllDesigns()),
      Promise.resolve(getAllProjects()),
    ]);

    allBlogs = allBlogs.value;
    allDesigns = allDesigns.value;
    allProjects = allProjects.value;

    const allTags = [...allBlogs, ...allDesigns, ...allProjects]
      .flatMap((el) => el.tags)
      .filter((el) => {
        if (!existingTags.includes(el._id.toString())) {
          existingTags.push(el._id.toString());
          return el;
        }
      });

    return {
      props: {
        allContent: JSON.stringify({
          allTags,
          allBlogs,
          allDesigns,
          allProjects,
        }),
      },
      revalidate: 1,
    };
  } catch (error) {}
}
