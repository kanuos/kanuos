// BLOG LIST PAGE

import { useContext } from "react";
// import : internal
import { HeadComponent } from "../../../components/Head";
import { PublicHeader } from "../../../components/public/Header";
import { ITEMS_PER_PAGE, PUBLIC_LIST_TYPES } from "../../../utils";
import { BlogThumbnail } from "../../../components/content/BlogThumbnail";
import { getAllBlogs } from "../../../database/blogs";

import { ThemeContext } from "../../../contexts/ThemeContext";
import dynamic from "next/dynamic";

// dynamic imports
const NavBar = dynamic(() =>
  import("../../../components/public/Nav").then((m) => m.NavBar)
);
const Footer = dynamic(() =>
  import("../../../components/public/Footer").then((m) => m.Footer)
);
const Pagination = dynamic(() =>
  import("../../../components/public/Pagination").then((m) => m.Pagination)
);
const ThemeToggler = dynamic(() =>
  import("../../../components/public/ThemeToggler").then((m) => m.ThemeToggler)
);

const BlogList = ({ blogList, totalCount, pageStartNumber, pageCount }) => {
  blogList = JSON.parse(blogList);
  totalCount = JSON.parse(totalCount);
  pageStartNumber = JSON.parse(pageStartNumber);
  pageCount = JSON.parse(pageCount);

  const { isDarkMode } = useContext(ThemeContext);

  return (
    <>
      <HeadComponent
        title="Sounak Mukherjee's Blogs"
        content="Check out my blogs where I solve various problems, learn new tech etc"
      />
      <NavBar />
      <ThemeToggler />
      <strong></strong>
      <div
        className={
          "h-full  min-h-screen scrollbar-thin w-full overflow-hidden " +
          (isDarkMode ? "main-dark" : "main-light")
        }
      >
        <div className="px-12 lg:px-0 py-20 max-w-3xl mx-auto select-text">
          <PublicHeader
            data={{ ...PUBLIC_LIST_TYPES.blogs, count: totalCount }}
          />
          {blogList.length > 0 ? (
            <>
              <main className="flex flex-col my-20 gap-20 items-stretch w-full gap-y-20 mx-auto">
                {blogList.map((blog, index) => (
                  <BlogThumbnail
                    key={blog._id}
                    data={blog}
                    index={index + parseInt(pageStartNumber) + 1}
                  />
                ))}
              </main>
              {blogList.length < totalCount && (
                <Pagination count={pageCount} baseURL="/blogs/page" />
              )}
            </>
          ) : (
            <main className="h-[30vh] flex flex-col items-center justify-center gap-2">
              <p className="p-4 rounded-md bg-light text-dark filter drop-shadow-xl">
                <span className="text-sm">No blogs found!</span>
              </p>
            </main>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BlogList;

export async function getStaticProps({ params }) {
  let blogList, totalCount, pageCount;
  try {
    const allBlogs = await getAllBlogs(false);
    totalCount = allBlogs.length;

    const pageData = [];

    let start = 0;
    while (start < allBlogs.length) {
      pageData.push(allBlogs.slice(start, start + ITEMS_PER_PAGE.blog));
      start += ITEMS_PER_PAGE.blog;
    }

    pageCount = pageData.length;

    blogList = pageData[parseInt(params.number) - 1];
  } catch (error) {
    console.log(error);
    blogList = [];
    totalCount = 0;
    pageCount = 0;
  } finally {
    return {
      props: {
        blogList: JSON.stringify(blogList),
        totalCount: JSON.stringify(totalCount),
        pageStartNumber: JSON.stringify(
          (parseInt(params.number) - 1) * ITEMS_PER_PAGE.blog
        ),
        pageCount: JSON.stringify(pageCount),
      },
      revalidate: 5,
    };
  }
}

export async function getStaticPaths() {
  const allBlogs = await getAllBlogs(false);
  const pageData = [];

  let start = 0;
  while (start < allBlogs.length) {
    pageData.push(allBlogs.slice(start, start + ITEMS_PER_PAGE.blog));
    start += ITEMS_PER_PAGE.blog;
  }

  const paths = pageData.map((_, i) => ({
    params: { number: (i + 1).toString() },
  }));
  return {
    paths,
    fallback: false,
  };
}
