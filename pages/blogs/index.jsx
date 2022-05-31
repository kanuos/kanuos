// BLOG LIST PAGE

// import : internal
import { PUBLIC_LIST_TYPES } from "../../utils";
import { BlogThumbnail } from "../../components/content/BlogThumbnail";
import { getAllBlogs } from "../../database/blogs";
import { PublicListLayout } from "../../components/Layouts/PublicListLayout";

const BlogList = ({ blogList, totalCount }) => {
  blogList = JSON.parse(blogList);
  totalCount = JSON.parse(totalCount);

  return (
    <PublicListLayout
      pageTitle="Sounak Mukherjee's blogs"
      pageDesc="Check out the technical blogs and articles I blogged to journal my technical journey"
      data={{
        ...PUBLIC_LIST_TYPES.blogs,
        count: totalCount,
        searchMode: totalCount > 0,
      }}
    >
      {totalCount > 0 && (
        <main className="flex flex-col my-20 lg:mb-40 gap-20 items-stretch w-full max-w-4xl mx-auto">
          {blogList.map((blog, index) => (
            <BlogThumbnail key={blog._id} data={blog} index={index + 1} />
          ))}
        </main>
      )}
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
    console.log(error);
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
