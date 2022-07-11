// BLOG LIST PAGE
import { useState, useEffect } from "react";
// import : internal
import { PUBLIC_LIST_TYPES } from "../../utils";
import { BlogThumbnail } from "../../components/content/BlogThumbnail";
import { getAllBlogs } from "../../database/blogs";
import { PublicListLayout } from "../../components/Layouts/PublicListLayout";

const BlogList = ({ blogList, totalCount }) => {
  blogList = JSON.parse(blogList);
  totalCount = JSON.parse(totalCount);

  const [searchText, setSearchText] = useState("");
  const [count, setCount] = useState(totalCount);

  useEffect(() => {
    setCount(
      () =>
        blogList.filter((el) =>
          el.title.toLowerCase().includes(searchText.toLowerCase())
        ).length
    );
  }, [searchText, blogList]);

  return (
    <PublicListLayout
      pageTitle="Sounak Mukherjee's blogs"
      pageDesc="Technical blogs on web development, coding solutions, concepts and ideas and theories"
      data={{
        ...PUBLIC_LIST_TYPES.blogs,
        count,
        searchMode: totalCount > 0,
      }}
      searchText={searchText}
      setSearchText={(x) => setSearchText(x)}
    >
      <main className="flex flex-col mb-20 lg:mb-40 gap-20 items-stretch w-full max-w-4xl mx-auto">
        {count > 0 ? (
          <>
            {blogList
              .filter((el) =>
                el.title.toLowerCase().includes(searchText.toLowerCase())
              )
              .map((blog, index) => (
                <BlogThumbnail key={blog._id} data={blog} index={index + 1} />
              ))}
          </>
        ) : (
          <>
            {totalCount > 0 ? (
              <p className="content--sub font-bold text-center">
                No blog with{" "}
                <span className="text-primary font-bold text-lg">
                  {searchText}
                </span>{" "}
                keyword found!{" "}
              </p>
            ) : (
              <></>
            )}
          </>
        )}
      </main>
    </PublicListLayout>
  );
};

export default BlogList;

export async function getStaticProps() {
  let blogList = [],
    totalCount = 0;
  try {
    blogList = await getAllBlogs(false);
    totalCount = blogList.length;
  } catch (error) {
    totalCount = 0;
    pageCount = 0;
  } finally {
    return {
      props: {
        blogList: JSON.stringify(blogList),
        totalCount: JSON.stringify(totalCount),
      },
      revalidate: 1,
    };
  }
}
