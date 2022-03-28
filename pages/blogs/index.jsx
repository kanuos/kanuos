// BLOG LIST PAGE

import { useContext } from "react";
// import : internal
import { HeadComponent } from "../../components/Head";
import { PublicHeader } from "../../components/public/Header";
import { PUBLIC_LIST_TYPES } from "../../utils";
import { BlogThumbnail } from "../../components/content/BlogThumbnail";
import { getAllBlogs } from "../../database/blogs";

import { ThemeContext } from "../../contexts/ThemeContext";
import dynamic from "next/dynamic";
import { Footer } from "../../components/public/Footer";

// dynamic imports
const NavBar = dynamic(() =>
  import("../../components/public/Nav").then((m) => m.NavBar)
);
const ListLoader = dynamic(() =>
  import("../../components/public/ListLoader").then((m) => m.ListLoader)
);
const ThemeToggler = dynamic(() =>
  import("../../components/public/ThemeToggler").then((m) => m.ThemeToggler)
);

const BlogList = ({ blogList }) => {
  blogList = JSON.parse(blogList);
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <>
      <HeadComponent
        title="Sounak Mukherjee's Blogs"
        content="Check out my blogs where I solve various problems, learn new tech etc"
      />
      <NavBar />
      <ThemeToggler />

      <div
        className={
          "h-full  min-h-screen scrollbar-thin w-full overflow-hidden " +
          (isDarkMode ? "main-dark" : "main-light")
        }
      >
        <div className="px-12 py-20 max-w-3xl mx-auto select-text">
          <PublicHeader
            data={{ ...PUBLIC_LIST_TYPES.blogs, count: blogList.length }}
          />
          {blogList.length > 0 ? (
            <>
              <main className="flex flex-col my-20 gap-20">
                {blogList.map((blog, index) => (
                  <BlogThumbnail key={blog._id} data={blog} index={index + 1} />
                ))}
              </main>
              <ListLoader />
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

export async function getStaticProps() {
  let blogList;
  try {
    blogList = await getAllBlogs(false);
  } catch (error) {
    console.log(error);
    blogList = [];
  } finally {
    return {
      props: {
        blogList: JSON.stringify(blogList),
      },
      revalidate: 5,
    };
  }
}
