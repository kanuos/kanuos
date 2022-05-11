// BLOG LIST PAGE

// import : internal
import { PublicHeader } from "../../../components/public/Header";
import { ITEMS_PER_PAGE, PUBLIC_LIST_TYPES } from "../../../utils";
import { BlogThumbnail } from "../../../components/content/BlogThumbnail";
import { getAllBlogs } from "../../../database/blogs";

import dynamic from "next/dynamic";
import PublicLayout from "../../../components/Layouts/PublicLayout";

// dynamic imports

const Footer = dynamic(() =>
  import("../../../components/public/Footer").then((m) => m.Footer)
);
const Pagination = dynamic(() =>
  import("../../../components/public/Pagination").then((m) => m.Pagination)
);

const BlogList = ({ blogList, totalCount, pageStartNumber, pageCount }) => {
  blogList = JSON.parse(blogList);
  totalCount = JSON.parse(totalCount);
  pageStartNumber = JSON.parse(pageStartNumber);
  pageCount = JSON.parse(pageCount);

  return (
    <PublicLayout
      metaTitle="Sounak Mukherjee's blogs"
      metaDesc="Check out the UI-UX blogs and prototypes I bloged for various products"
    >
      <div className="px-8 pt-20 lg:px-0 max-w-2xl mx-auto select-text">
        <PublicHeader
          data={{ ...PUBLIC_LIST_TYPES.blogs, count: totalCount }}
        />
      </div>
      <div className="px-8 pb-20 w-full mx-auto max-w-4xl">
        {blogList.length > 0 ? (
          <>
            <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center gap-20 md:gap-x-10 p-4 w-full mb-20 max-w-6xl mx-auto">
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
      <Footer />
    </PublicLayout>
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
